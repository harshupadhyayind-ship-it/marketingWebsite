import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "client", title: "Client Name", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "result", title: "Key Result", type: "string" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Branding",
          "Web Design",
          "Next.js",
          "Paid Media",
          "Creative Direction",
          "SEO",
          "Analytics",
          "Content",
          "Social Media",
          "Shopify",
          "Launch",
          "Strategy",
          "Growth",
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "images.0" },
  },
});
