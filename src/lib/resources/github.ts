import type {
  GitHubTreeResponse,
  RepoResource,
  RepoResourceType,
} from "./model";

const OWNER = "LibreSplit";
const REPO = "LibreSplit-resources";
const BRANCH = "main";

export async function fetchResources(): Promise<RepoResource[]> {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch LibreSplit resources");
  }

  const data: GitHubTreeResponse = await response.json();

  return data.tree
    .filter((item) => item.type === "blob")
    .map((item) => {
      const [directory] = item.path.split("/");

      let type: RepoResourceType | undefined;

      switch (directory) {
        case "splits":
          type = "split";
          break;
        case "themes":
          type = "theme";
          break;
        case "auto-splitters":
          type = "auto-splitter";
          break;
      }

      if (!type) {
        return null;
      }

      const name = item.path.split("/").at(-1)!;

      return {
        name,
        path: item.path,
        type,
        extension: name.split(".").at(-1) ?? "",
        size: item.size,
        sha: item.sha,
        rawUrl: `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${item.path}`,
      };
    })
    .filter((resource): resource is RepoResource => resource !== null);
}
