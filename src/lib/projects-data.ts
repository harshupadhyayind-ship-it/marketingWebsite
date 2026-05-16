import projectsJson from "@/data/projects.json";

export const allProjects = projectsJson;

export type Project = (typeof allProjects)[0];
