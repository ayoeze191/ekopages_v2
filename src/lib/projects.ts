export const projectFilters = [
  "All projects",
  "Literacy drives",
  "School partnerships",
  "Community events",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, "All projects">;

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  /** Tailwind background class for the placeholder cover. */
  cover: string;
};

/**
 * The six projects from the Figma design. v1 has no projects API; its three
 * projects are hardcoded in ekopages/Ekopages/src/components/Project/Projects.jsx.
 * Categories are inferred from each partner so the hero filters have something to filter.
 */
export const projects: Project[] = [
  {
    slug: "sdg-literacy-drive",
    title: "SDG Literacy Drive",
    location: "Queen's College, Lagos",
    category: "Literacy drives",
    cover: "bg-[#B98E5E]",
  },
  {
    slug: "save-the-planet-workshop",
    title: "Save the Planet Workshop",
    location: "Kibera Primary, Nairobi",
    category: "School partnerships",
    cover: "bg-[#6E8E69]",
  },
  {
    slug: "clean-water-storytime",
    title: "Clean Water Storytime",
    location: "Accra Community Library",
    category: "Community events",
    cover: "bg-[#4F7FAB]",
  },
  {
    slug: "reading-under-the-baobab",
    title: "Reading Under the Baobab",
    location: "Dodoma Rural Schools",
    category: "Literacy drives",
    cover: "bg-[#B25B58]",
  },
  {
    slug: "solar-storybook-initiative",
    title: "Solar Storybook Initiative",
    location: "Kano State Schools",
    category: "School partnerships",
    cover: "bg-[#8B70A9]",
  },
  {
    slug: "girls-in-green-tech",
    title: "Girls in Green Tech",
    location: "Kigali Innovation Hub",
    category: "Community events",
    cover: "bg-[#60A396]",
  },
];
