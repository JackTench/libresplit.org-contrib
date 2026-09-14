import { createMemo, createSignal, For } from "solid-js";

import { Input } from "@/components/ui/input";
import type { RepoResourceType } from "@/lib/resources/model";
import { useResources } from "@/lib/resources/query";

type ResourceFilter = RepoResourceType | "all";

export function Resources() {
  const resources = useResources();

  const [search, setSearch] = createSignal("");
  const [filter, setFilter] = createSignal<ResourceFilter>("all");

  const filteredResources = createMemo(() => {
    const query = search().toLowerCase();

    return (
      resources.data?.filter((resource) => {
        const matchesSearch =
          resource.name.toLowerCase().includes(query) ||
          resource.path.toLowerCase().includes(query);

        return matchesSearch;
      }) ?? []
    );
  });

  return (
    <div>
      <div>
        <h1 class="text-3xl font-bold">Resources</h1>
        <p class="mt-2 text-muted-foreground">
          Browse splits, themes and auto splitters for LibreSplit.
        </p>
      </div>

      {/* Search Bar */}
      <div>
        <Input
          class="flex h-9 w-full rounded-md border border-input bg-background px-3"
          placeholder="Search resources..."
          value={search()}
          onInput={(event) => setSearch(event.currentTarget.value)}
        />
      </div>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("split")}>Splits</button>
        <button onClick={() => setFilter("theme")}>Themes</button>
        <button onClick={() => setFilter("auto-splitter")}>
          Auto Splitters
        </button>
      </div>

      <For each={filteredResources()}>
        {(resource) => <span>{resource.name}</span>}
      </For>
    </div>
  );
}
