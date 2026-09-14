import { createMemo, createSignal, For } from "solid-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RepoResourceType } from "@/lib/resources/model";
import { useResources } from "@/lib/resources/query";

import { ResourceCard } from "./resources/ResourceCard";

type ResourceFilter = RepoResourceType | "all";

export function Resources() {
  const resources = useResources();

  const [search, setSearch] = createSignal("");
  const [filter, setFilter] = createSignal<ResourceFilter>("all");

  const filteredResources = createMemo(() => {
    const query = search().toLowerCase();

    return (
      resources.data?.filter((resource) => {
        const matchesType = filter() === "all" || resource.type === filter();

        const matchesSearch =
          resource.name.toLowerCase().includes(query) ||
          resource.path.toLowerCase().includes(query);

        return matchesType && matchesSearch;
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
        <Button
          variant={filter() === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter() === "split" ? "default" : "outline"}
          onClick={() => setFilter("split")}
        >
          Splits
        </Button>
        <Button
          variant={filter() === "theme" ? "default" : "outline"}
          onClick={() => setFilter("theme")}
        >
          Themes
        </Button>
        <Button
          variant={filter() === "auto-splitter" ? "default" : "outline"}
          onClick={() => setFilter("auto-splitter")}
        >
          Auto Splitters
        </Button>
      </div>

      <For each={filteredResources()}>
        {(resource) => <ResourceCard resource={resource} />}
      </For>
    </div>
  );
}
