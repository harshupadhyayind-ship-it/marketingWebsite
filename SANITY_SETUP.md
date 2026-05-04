# Sanity CMS Setup Guide

## 1. Create a Sanity Project

```bash
npm create sanity@latest -- --project <project-name> --dataset production --output-path ./sanity-studio
```

Or go to https://sanity.io/manage → New Project.

## 2. Copy your Project ID

From the Sanity dashboard, copy your **Project ID**.

## 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

## 4. Deploy Sanity Studio

Inside your sanity-studio folder:

```bash
cd sanity-studio
npx sanity deploy
```

Your editors will access the Studio at `https://your-project.sanity.studio`.

## 5. CMS Collections

### Services
| Field | Type | Required |
|-------|------|----------|
| title | string | ✓ |
| slug | slug (auto from title) | ✓ |
| description | text | |
| features | array of strings | |
| image | image | |

### Projects
| Field | Type | Required |
|-------|------|----------|
| title | string | ✓ |
| slug | slug (auto from title) | ✓ |
| client | string | |
| category | string | |
| year | string | |
| description | text | |
| result | string | |
| images | array of images | |
| tags | array (from list) | |

### Testimonials
| Field | Type | Required |
|-------|------|----------|
| name | string | ✓ |
| role | string | ✓ |
| company | string | |
| message | text | ✓ |
| photo | image | |

## 6. Connect CMS data to pages

The `src/lib/cms.ts` file has pre-built query functions:

```ts
import { getProjects, getServices, getTestimonials } from "@/lib/cms";

// In a server component:
const projects = await getProjects();
const services = await getServices();
const testimonials = await getTestimonials();
```

Replace the static data arrays in each page with these CMS calls.

## 7. Publish → Live in ~30 seconds

When you publish content in Sanity Studio, Vercel re-fetches the data automatically (ISR). For instant updates, add an on-demand revalidation webhook.
