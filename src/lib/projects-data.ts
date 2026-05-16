import projectsJson from "@/data/projects.json";

// Static type only — used for TypeScript
export type Project = (typeof projectsJson)[0];

// Server-side async fetch (for server components)
export async function fetchProjects(): Promise<Project[]> {
  try {
    const { getContent } = await import("./content");
    const data = (await getContent("projects")) as { items: Project[] } | null;
    return data?.items ?? projectsJson;
  } catch {
    return projectsJson;
  }
}

// Legacy static export for client components (falls back to JSON)
export const allProjects: Project[] = projectsJson;
