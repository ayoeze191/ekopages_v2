export const projectFilters = [
  "All projects",
  "Literacy drives",
  "School partnerships",
  "Community events",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, "All projects">;

export type ProjectSection = { heading?: string; text: string };

export type Project = {
  slug: string;
  title: string;
  /** Short descriptor shown under the title on the card. */
  summary: string;
  category: ProjectCategory;
  image: string;
  hero: string;
  body: ProjectSection[];
  gallery?: string[];
};

/** Eko Pages' real projects, with the copy and photos carried over from v1. */
export const projects: Project[] = [
  {
    slug: "sdg-literacy-drive",
    title: "SDG Literacy Drive",
    summary: "Putting SDG books into the school curriculum",
    category: "Literacy drives",
    image: "/projects/sdg-literacy-drive.png",
    hero: "/projects/sdg-literacy-drive-hero.png",
    body: [
      {
        text: "Determined to enhance the standard of education in Nigeria through exposure to books that would educate the African child on environmental sustainability, Eko Pages has called for the adaptation of Sustainable Development Goals (SDG) books into the school curriculum. The Chief Communications Officer of the outfit, Olayiwola Mariam, who disclosed this, said it is not just enough for children to read the books.",
      },
      {
        text: "She added that the government and stakeholders must also make sure that SDG literature texts are inculcated into both primary and secondary curriculum. She said there is the need to educate the younger generation on renewable energy and sustainable development goals in general through literature, adding that the adaptation of SDG books into the school curriculum would go a long way in shaping the future of the younger ones.",
      },
    ],
    // v1 shipped drive-1 and drive-3 as byte-identical copies of the hero shot.
    gallery: [
      "/projects/drive-2.png",
      "/projects/drive-4.png",
      "/projects/drive-5.png",
      "/projects/drive-6.png",
    ],
  },
  {
    slug: "sdg-art-exhibition",
    title: "The SDG Art Exhibition",
    summary: "Art that makes the 17 goals impossible to ignore",
    category: "Community events",
    image: "/projects/sdg-art-exhibition.jpg",
    hero: "/projects/sdg-art-exhibition.jpg",
    body: [
      {
        text: "Discover the power of art in driving positive change and creating a better world. The SDG Art Exhibition is a unique platform that celebrates the United Nations' Sustainable Development Goals (SDGs) through the captivating medium of art. Our exhibition showcases the exceptional talent of artists from around the globe, who use their creativity to raise awareness, inspire action, and advocate for a sustainable future.",
      },
      {
        text: "We believe that art has the ability to transcend barriers, ignite conversations, and challenge the status quo. Through thought-provoking paintings, sculptures, installations, and multimedia presentations, we invite you to explore the pressing issues addressed by the 17 SDGs. Each artwork serves as a visual narrative, shedding light on topics such as poverty eradication, gender equality, climate action, sustainable cities, and responsible consumption.",
      },
      {
        text: "Whether you are an art enthusiast, a sustainability advocate, or simply curious about the interconnectedness of art and global goals, the SDG Art Exhibition offers a captivating and enlightening experience for all.",
      },
      {
        text: "By embracing art and its ability to evoke change, we can all become agents of transformation and work towards a better future for generations to come.",
      },
    ],
  },
  {
    slug: "teach-her-teach-him",
    title: "The Teach Her Teach Him Project",
    summary: "Teaching every child about gender equality",
    category: "School partnerships",
    image: "/projects/teach-her-teach-him.png",
    hero: "/projects/teach-her-teach-him.png",
    body: [
      {
        text: "The #TeachHerTeachHim project was created to demonstrate the power of education to shape a more inclusive and equal society. Our project aims to challenge traditional gender roles by promoting the importance of teaching both male and female children about gender equality. We believe that by equipping children with the knowledge and understanding of gender roles, we can foster empathy, respect, and equal opportunities for all.",
      },
      {
        heading: "Why teach children about gender roles?",
        text: "Gender roles are deeply ingrained in society, influencing our behaviours, expectations, and perceptions from an early age. By educating children about gender roles, we can help them develop a broader understanding of the diverse experiences, talents, and aspirations of both genders. This knowledge not only empowers them to challenge stereotypes but also encourages them to embrace their own unique identities, interests, and abilities.",
      },
      {
        heading: "Breaking down stereotypes",
        text: "Stereotypes can limit a child's potential and perpetuate inequality. By teaching both boys and girls about gender roles, we aim to break down these stereotypes and create a more inclusive future. We want to empower girls to explore their interests in science, technology, engineering, and mathematics (STEM), while encouraging boys to pursue their passions in the arts, humanities, and caregiving fields. By challenging societal expectations, we can create a more level playing field, where everyone has the freedom to pursue their dreams, regardless of gender.",
      },
      {
        heading: "Fostering empathy and respect",
        text: "Understanding gender roles is not only about empowering individuals but also about fostering empathy and respect. By teaching children about different perspectives and experiences, we can cultivate a generation that values equality and supports one another. By dismantling rigid gender expectations, we encourage boys to express their emotions, seek help when needed, and participate in nurturing activities. Similarly, we teach girls that they can be strong, assertive, and leaders in any field they choose. Ultimately, this education creates a society that values and respects the unique qualities and contributions of all individuals.",
      },
      {
        heading: "Preparing for a diverse world",
        text: "In today's interconnected world, diversity and inclusion are crucial. By teaching children about gender roles, we prepare them for a diverse society where cooperation, understanding, and collaboration are essential. By promoting equality, we equip children with the skills they need to navigate relationships, work environments, and communities with empathy and respect. They learn to appreciate the richness that diversity brings and become active participants in creating a more harmonious and equitable world.",
      },
      {
        heading: "Join the Teach Her Teach Him Project",
        text: "If you share our vision of a society free from gender stereotypes, we invite you to join the Teach Her Teach Him Project. Together, we can make a difference in the lives of children, creating a future where everyone is valued and celebrated for who they are. Explore our resources, engage in our workshops, and spread the message of gender equality — empowering minds, shaping futures.",
      },
    ],
  },
];

export function getProject(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}
