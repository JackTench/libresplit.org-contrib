import { createMemo, createSignal, For } from "solid-js";

import { Input } from "@/components/ui/input";
import { useResources } from "@/lib/resources/query";

export function Resources() {
  const resources = useResources();

  const [search, setSearch] = createSignal("");

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

      <div>
        <Input
          class="flex h-9 w-full rounded-md border border-input bg-background px-3"
          placeholder="Search resources..."
          value={search()}
          onInput={(event) => setSearch(event.currentTarget.value)}
        />
      </div>

      <For each={filteredResources()}>
        {(resource) => <span>{resource.name}</span>}
      </For>
    </div>
  );
}
