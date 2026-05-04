import { sanityClient } from "./sanity";

/* ── Types ─────────────────────────────────────────── */

export interface CMSService {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  features: string[];
  image?: { asset: { _ref: string } };
}

export interface CMSProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  images?: { asset: { _ref: string } }[];
  tags: string[];
  client?: string;
  result?: string;
  category?: string;
  year?: string;
}

export interface CMSTestimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  photo?: { asset: { _ref: string } };
}

/* ── Queries ────────────────────────────────────────── */

export async function getServices(): Promise<CMSService[]> {
  return sanityClient.fetch(`
    *[_type == "service"] | order(_createdAt asc) {
      _id, title, slug, description, features, image
    }
  `);
}

export async function getServiceBySlug(slug: string): Promise<CMSService | null> {
  return sanityClient.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      _id, title, slug, description, features, image
    }`,
    { slug }
  );
}

export async function getProjects(): Promise<CMSProject[]> {
  return sanityClient.fetch(`
    *[_type == "project"] | order(_createdAt desc) {
      _id, title, slug, description, images, tags, client, result, category, year
    }
  `);
}

export async function getProjectBySlug(slug: string): Promise<CMSProject | null> {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, description, images, tags, client, result, category, year
    }`,
    { slug }
  );
}

export async function getTestimonials(): Promise<CMSTestimonial[]> {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(_createdAt asc) {
      _id, name, role, company, message, photo
    }
  `);
}
