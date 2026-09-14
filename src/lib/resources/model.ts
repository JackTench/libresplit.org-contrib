export type RepoResourceType = "split" | "theme" | "auto-splitter";

export interface RepoResource {
  name: string;
  path: string;
  type: RepoResourceType;
  extension: string;
  size: number | undefined;
  sha: string;
  rawUrl: string;
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTreeResponse {
  sha: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}
