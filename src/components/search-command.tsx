"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  getGeometryPath,
  getAllGeometries,
} from "@/lib/data";
import type { Geometry } from "@/lib/data/geometries.types";

// Helper function to highlight matching text
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-amber-400/30 text-amber-200 font-medium">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// Recent searches localStorage helpers
const RECENT_SEARCHES_KEY = 'sacred-geometry-recent-searches';
const MAX_RECENT_SEARCHES = 5;

function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) return;
  try {
    const recent = getRecentSearches();
    // Remove query if it exists (to avoid duplicates)
    const filtered = recent.filter(q => q.toLowerCase() !== query.toLowerCase());
    // Add to front and limit to MAX_RECENT_SEARCHES
    const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Silently fail
  }
}

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();

  // Load recent searches when modal opens
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with localStorage on open
      setRecentSearches(getRecentSearches());
    }
  }, [open]);

  // Initialize Fuse.js with all geometries
  const fuse = useMemo(() => {
    const allGeometries = getAllGeometries();
    return new Fuse(allGeometries, {
      keys: [
        { name: "name", weight: 0.4 },
        { name: "aliases", weight: 0.3 },
        { name: "description", weight: 0.15 },
        { name: "relatedBy.property", weight: 0.1 },
        { name: "relatedBy.element", weight: 0.05 },
      ],
      threshold: 0.4, // 0 = exact match, 1 = match anything
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, []);

  // ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Score a geometry based on how well it matches the query
  const scoreResult = (geometry: Geometry, query: string): number => {
    const lowerQuery = query.toLowerCase();
    const lowerName = geometry.name.toLowerCase();
    let score = 0;

    // Exact name match (highest priority)
    if (lowerName === lowerQuery) {
      score += 100;
    }
    // Name starts with query
    else if (lowerName.startsWith(lowerQuery)) {
      score += 80;
    }
    // Name contains query
    else if (lowerName.includes(lowerQuery)) {
      score += 60;
    }

    // Check aliases
    if (geometry.aliases) {
      for (const alias of geometry.aliases) {
        const lowerAlias = alias.toLowerCase();
        if (lowerAlias === lowerQuery) {
          score += 90;
        } else if (lowerAlias.startsWith(lowerQuery)) {
          score += 70;
        } else if (lowerAlias.includes(lowerQuery)) {
          score += 50;
        }
      }
    }

    // Description contains query
    if (geometry.description?.toLowerCase().includes(lowerQuery)) {
      score += 30;
    }

    // Properties contain query
    if (geometry.relatedBy?.property?.some(p => p.toLowerCase().includes(lowerQuery))) {
      score += 20;
    }

    return score;
  };

  // Search geometries using Fuse.js for fuzzy matching
  const searchQuery = typeof query === "string" ? query.trim() : "";
  const rawResults = searchQuery.length > 0 ? fuse.search(searchQuery) : [];

  // Combine Fuse.js fuzzy score with custom relevance scoring
  const results = rawResults
    .map(fuseResult => ({
      geometry: fuseResult.item,
      fuseScore: 1 - (fuseResult.score ?? 0), // Invert Fuse score: higher is better
      customScore: scoreResult(fuseResult.item, searchQuery)
    }))
    .map(item => ({
      ...item,
      // Blend scores: 40% fuzzy match quality, 60% semantic relevance
      combinedScore: (item.fuseScore * 40) + (item.customScore * 0.6)
    }))
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .map(item => item.geometry);

  // Group results by category
  const platonicResults = results.filter((g) => g.category === "platonic");
  const patternResults = results.filter((g) => g.category === "pattern");

  // Handle selection and navigation
  const handleSelect = (geometry: Geometry) => {
    // Save the search query to recent searches
    if (searchQuery.length > 0) {
      saveRecentSearch(searchQuery);
    }
    setOpen(false);
    setQuery(""); // Clear query on selection
    router.push(getGeometryPath(geometry));
  };

  // Handle clicking a recent search
  const handleRecentSearch = (recentQuery: string) => {
    setQuery(recentQuery);
  };

  // Clear recent searches
  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  // Reset query when dialog closes
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setQuery("");
    }
  };

  // Handle query change with type safety
  const handleQueryChange = (value: string) => {
    setQuery(value ?? "");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-hidden p-0 bg-gradient-to-br from-[#0a1628] via-[#1a2642] to-[#0f1b2e] border-amber-500/30 !top-[10vh] !translate-y-0 max-h-[80vh]">
        <DialogTitle className="sr-only">Search Geometries</DialogTitle>
        <Command shouldFilter={false} loop className="bg-transparent">
          <CommandInput
            placeholder="Search geometries..."
            value={query}
            onValueChange={handleQueryChange}
            className="text-blue-100 placeholder:text-blue-300/50"
          />
      <CommandList className="max-h-[400px]">
        {/* Recent Searches - show when no query */}
        {!searchQuery && recentSearches.length > 0 && (
          <CommandGroup heading="Recent Searches" className="[&_[cmdk-group-heading]]:text-amber-400 [&_[cmdk-group-heading]]:font-semibold">
            {recentSearches.map((recentQuery, index) => (
              <CommandItem
                key={index}
                value={recentQuery}
                onSelect={() => handleRecentSearch(recentQuery)}
                className="cursor-pointer data-[selected=true]:bg-amber-900/20 data-[selected=true]:border-l-2 data-[selected=true]:border-amber-500 hover:bg-blue-900/30"
              >
                <div className="flex items-center gap-2 w-full">
                  <svg className="h-4 w-4 text-amber-400/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="flex-1 text-sm text-blue-100">{recentQuery}</span>
                </div>
              </CommandItem>
            ))}
            <CommandItem
              onSelect={handleClearRecent}
              className="cursor-pointer text-amber-400/70 hover:text-amber-300 hover:bg-blue-900/30 border-t border-amber-500/20 mt-2 pt-2"
            >
              <span className="text-xs">Clear recent searches</span>
            </CommandItem>
          </CommandGroup>
        )}

        <CommandEmpty>
          <div className="py-6 px-4 text-center">
            <p className="text-blue-200/70 text-sm font-medium mb-3">No results found for &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-blue-300/50 text-xs mb-4">
              Try a different search term or browse all geometries:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["flower", "tetrahedron", "golden", "circle", "life"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1 text-xs rounded-full bg-blue-900/50 text-amber-300 border border-amber-500/30 hover:bg-amber-900/20 hover:border-amber-500/50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-4 text-xs">
              <Link href="/platonic-solids" className="text-amber-400/70 hover:text-amber-300">
                Browse Platonic Solids →
              </Link>
              <Link href="/sacred-patterns" className="text-amber-400/70 hover:text-amber-300">
                Browse Sacred Patterns →
              </Link>
            </div>
          </div>
        </CommandEmpty>

        {/* Platonic Solids Group */}
        {platonicResults.length > 0 && (
          <CommandGroup heading="Platonic Solids" className="[&_[cmdk-group-heading]]:text-amber-400 [&_[cmdk-group-heading]]:font-semibold">
            {platonicResults.map((geometry) => (
              <CommandItem
                key={geometry.id}
                value={`${geometry.name} ${geometry.aliases?.join(" ") ?? ""}`}
                onSelect={() => handleSelect(geometry)}
                className="cursor-pointer data-[selected=true]:bg-amber-900/20 data-[selected=true]:border-l-2 data-[selected=true]:border-amber-500 hover:bg-blue-900/30"
              >
                <div className="flex items-center gap-3 w-full">
                  {/* Geometry Image */}
                  {geometry.images?.heroImage && (
                    <div className="relative h-8 w-8 shrink-0">
                      <Image
                        src={geometry.images.heroImage}
                        alt={geometry.name}
                        width={32}
                        height={32}
                        className="object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                        }}
                      />
                    </div>
                  )}

                  {/* Geometry Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-sm truncate text-amber-100">
                      {highlightText(geometry.name, searchQuery)}
                    </span>
                    {geometry.description && (
                      <span className="text-blue-300/70 text-xs truncate">
                        {highlightText(geometry.description, searchQuery)}
                      </span>
                    )}
                  </div>

                  {/* Element Badge */}
                  {geometry.relatedBy?.element && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 capitalize text-xs bg-blue-900/50 text-amber-300 border-amber-500/30"
                    >
                      {geometry.relatedBy.element}
                    </Badge>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Sacred Patterns Group */}
        {patternResults.length > 0 && (
          <CommandGroup heading="Sacred Patterns" className="[&_[cmdk-group-heading]]:text-amber-400 [&_[cmdk-group-heading]]:font-semibold">
            {patternResults.map((geometry) => (
              <CommandItem
                key={geometry.id}
                value={`${geometry.name} ${geometry.aliases?.join(" ") ?? ""}`}
                onSelect={() => handleSelect(geometry)}
                className="cursor-pointer data-[selected=true]:bg-amber-900/20 data-[selected=true]:border-l-2 data-[selected=true]:border-amber-500 hover:bg-blue-900/30"
              >
                <div className="flex items-center gap-3 w-full">
                  {/* Geometry Image */}
                  {geometry.images?.heroImage && (
                    <div className="relative h-8 w-8 shrink-0">
                      <Image
                        src={geometry.images.heroImage}
                        alt={geometry.name}
                        width={32}
                        height={32}
                        className="object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(85%) sepia(66%) saturate(466%) hue-rotate(358deg) brightness(98%) contrast(91%)",
                        }}
                      />
                    </div>
                  )}

                  {/* Geometry Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-sm truncate text-amber-100">
                      {highlightText(geometry.name, searchQuery)}
                    </span>
                    {geometry.description && (
                      <span className="text-blue-300/70 text-xs truncate">
                        {highlightText(geometry.description, searchQuery)}
                      </span>
                    )}
                  </div>

                  {/* Element Badge (if applicable) */}
                  {geometry.relatedBy?.element && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 capitalize text-xs bg-blue-900/50 text-amber-300 border-amber-500/30"
                    >
                      {geometry.relatedBy.element}
                    </Badge>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
