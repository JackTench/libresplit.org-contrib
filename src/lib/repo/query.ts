import { createQuery } from "@tanstack/solid-query";

import { fetchResources } from "./github";

export function useResources() {
  return createQuery(() => ({
    queryKey: ["libresplit-resources"],
    queryFn: fetchResources,
    staleTime: 1000 * 60 * 10,
  }));
}
