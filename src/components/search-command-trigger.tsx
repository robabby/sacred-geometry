"use client";

import { Search } from "lucide-react";
import { SearchCommand } from "./search-command";

export function SearchCommandTrigger() {
  return (
    <>
      {/* Hidden SearchCommand that listens for ⌘K */}
      <SearchCommand />

      {/* Visual trigger button */}
      <button
        onClick={() => {
          // Trigger the keyboard event to open the command
          const event = new KeyboardEvent("keydown", {
            key: "k",
            metaKey: true,
            bubbles: true,
          });
          document.dispatchEvent(event);
        }}
        className="group flex w-full max-w-md items-center gap-3 rounded-lg border border-amber-500/30 bg-gradient-to-br from-blue-950/30 to-indigo-950/30 px-4 py-3 text-left transition-all hover:border-amber-500/50 hover:bg-gradient-to-br hover:from-blue-950/50 hover:to-indigo-950/50 sm:px-5 sm:py-3.5"
      >
        <Search className="h-5 w-5 text-amber-400 shrink-0" />
        <span className="text-sm text-blue-200/70 flex-1">
          Search geometries...
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-amber-500/30 bg-blue-900/30 px-2 py-1 text-xs text-amber-300/70">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    </>
  );
}
