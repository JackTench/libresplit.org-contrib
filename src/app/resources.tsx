import { createSignal } from "solid-js";

import { Input } from "@/components/ui/input";

export function Resources() {
  const [search, setSearch] = createSignal("");

  return (
    <div>
      <div>
        <h1 class="text-3xl font-bold">Resources</h1>
        <p class="mt-2 text-muted-foreground">
          Browse splits, themes and auto splitters for LibreSplit.
        </p>
      </div>

      <div>
        <Input
          class="flex h-9 w-full rounded-md border border-input bg-background px-3"
          placeholder="Search resources..."
          value={search()}
          onInput={(event) => setSearch(event.currentTarget.value)}
        />
      </div>
    </div>
  );
}
