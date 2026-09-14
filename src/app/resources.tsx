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
    <div class="mx-auto max-w-6xl px-6 py-12">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">Resources</h1>
        <p class="mt-2 text-muted-foreground">
          Browse splits, themes and auto splitters for LibreSplit.
        </p>
      </div>

      {/* Search Bar */}
      <div class="mb-6 flex gap-4">
        <Input
          class="flex h-9 w-full rounded-md border border-input bg-background px-3"
          placeholder="Search resources..."
          value={search()}
          onInput={(event) => setSearch(event.currentTarget.value)}
        />
      </div>

      {/* Filter Buttons */}
      <div class="mb-8 flex gap-2">
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

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <For each={filteredResources()}>
          {(resource) => <ResourceCard resource={resource} />}
        </For>
      </div>
    </div>
  );
}
