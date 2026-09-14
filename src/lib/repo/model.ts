export type RepoResourceType = "split" | "theme" | "auto-splitter";

export type RepoResource = {
  name: string;
  path: string;
  type: RepoResourceType;
  extension: string;
  size?: number;
  sha: string;
  rawUrl: string;
};

export type GitHubTreeItem = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
};

export type GitHubTreeResponse = {
  sha: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
};
