"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  searchGeometries,
  getGeometryPath,
} from "@/lib/data";
import type { Geometry } from "@/lib/data/geometries.types";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

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

  // Search geometries based on query
  const searchQuery = typeof query === "string" ? query.trim() : "";
  const results = searchQuery.length > 0 ? searchGeometries(searchQuery) : [];

  // Group results by category
  const platonicResults = results.filter((g) => g.category === "platonic");
  const patternResults = results.filter((g) => g.category === "pattern");

  // Handle selection and navigation
  const handleSelect = (geometry: Geometry) => {
    setOpen(false);
    setQuery(""); // Clear query on selection
    router.push(getGeometryPath(geometry));
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
      <DialogContent className="overflow-hidden p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search geometries..."
            value={query}
            onValueChange={handleQueryChange}
          />
      <CommandList>
        <CommandEmpty>
          <div className="py-6 text-center">
            <p className="text-muted-foreground text-sm">No results found.</p>
            <p className="text-muted-foreground mt-2 text-xs">
              Try searching for &ldquo;flower&rdquo;, &ldquo;tetrahedron&rdquo;, or &ldquo;golden ratio&rdquo;
            </p>
          </div>
        </CommandEmpty>

        {/* Platonic Solids Group */}
        {platonicResults.length > 0 && (
          <CommandGroup heading="Platonic Solids">
            {platonicResults.map((geometry) => (
              <CommandItem
                key={geometry.id}
                value={`${geometry.name} ${geometry.aliases?.join(" ") ?? ""}`}
                onSelect={() => handleSelect(geometry)}
                className="cursor-pointer"
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
                    <span className="font-medium text-sm truncate">
                      {geometry.name}
                    </span>
                    {geometry.description && (
                      <span className="text-muted-foreground text-xs truncate">
                        {geometry.description}
                      </span>
                    )}
                  </div>

                  {/* Element Badge */}
                  {geometry.relatedBy?.element && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 capitalize text-xs"
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
          <CommandGroup heading="Sacred Patterns">
            {patternResults.map((geometry) => (
              <CommandItem
                key={geometry.id}
                value={`${geometry.name} ${geometry.aliases?.join(" ") ?? ""}`}
                onSelect={() => handleSelect(geometry)}
                className="cursor-pointer"
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
                    <span className="font-medium text-sm truncate">
                      {geometry.name}
                    </span>
                    {geometry.description && (
                      <span className="text-muted-foreground text-xs truncate">
                        {geometry.description}
                      </span>
                    )}
                  </div>

                  {/* Element Badge (if applicable) */}
                  {geometry.relatedBy?.element && (
                    <Badge
                      variant="secondary"
                      className="shrink-0 capitalize text-xs"
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
