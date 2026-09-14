import type { RepoResource } from "./model";

const OWNER = "LibreSpluit";
const REPO = "LibreSplit-resources";
const BRANCH = "main";

export async function fetchResources(): Promise<RepoResource[]> {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch LibreSplit resources");
  }
}
