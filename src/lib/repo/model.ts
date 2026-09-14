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
