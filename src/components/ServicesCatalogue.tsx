import { ArrowRight } from "@/components/ArrowRight";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { naturalIconSize, ServiceIcon, type ServiceIconName } from "@/components/ServiceIcon";

type CatalogueService = {
  title: string;
  description: string;
  icon: ServiceIconName;
  link?: { label: string; href: string };
  comingSoon?: boolean;
};

const services: CatalogueService[] = [
  {
    title: "Eko Learn",
    description: "Affordable school & group packages unlocking books, courses, quizzes and games.",
    icon: "book",
    link: { label: "Explore Eko Learn", href: "#eko-learn" },
  },
  {
    title: "Eko Tales",
    description: "A weekly publication of children's stories themed around the SDGs.",
    icon: "heart",
    link: { label: "Browse all tales", href: "#eko-tales" },
  },
  {
    title: "SDG Literacy Drive",
    description: "A social initiative educating the African child on the SDGs through literature.",
    icon: "documentText",
    link: { label: "Browse all drives", href: "#sdg-literacy-drive" },
  },
  {
    title: "Book a Tutor",
    description: "Certified tutors, bookable online, to teach SDG topics one-on-one.",
    icon: "person",
    comingSoon: true,
  },
];

export function ServicesCatalogue() {
  return (
    // Design: 90px from the hero to the cards; four 268.5px cards with 22px gaps fill the 1140px frame.
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1140px] pt-[90px] max-[700px]:w-[calc(100%-2rem)] max-[700px]:pt-12"
      aria-label="Services"
    >
      <RevealGroup className="grid grid-cols-4 gap-[22px] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {services.map((service) => {
          const muted = service.comingSoon;
          return (
            <RevealItem
              as="article"
              className={`group relative flex flex-col rounded-2xl border border-[#E8E3DB] p-6 shadow-[0_8px_20px_rgb(50_32_18_/_8%)] transition-shadow duration-300 ${
                muted ? "bg-[#FDFBF7]" : "bg-white hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"
              }`}
              whileHover={muted ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              key={service.title}
            >
              {muted && (
                <span className="absolute top-[21px] right-[17px] rounded-full border border-[#E8E0D2] bg-[#F7F2EA] px-[11px] py-1.5 font-['Lato'] text-[10px] leading-none font-bold tracking-[0.1em] text-[#6B646A]">
                  COMING SOON
                </span>
              )}
              <span
                className={`grid h-[52px] w-[52px] place-items-center rounded-xl ${
                  muted ? "bg-[#F4EEF8] text-[#9A7BB5]" : "bg-[#EFE6F5] text-[#5A0C91]"
                }`}
              >
                <ServiceIcon icon={service.icon} className={naturalIconSize[service.icon]} />
              </span>
              <h3
                className={`mt-3 font-['Baloo_2'] text-[18px] leading-tight font-bold ${
                  muted ? "text-[#6B5F73]" : "text-[#1F0A33]"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`mt-3.5 font-['Lato'] text-[14px] leading-[22.4px] ${
                  muted ? "text-[#8A8290]" : "text-[#4A4A4A]"
                }`}
              >
                {service.description}
              </p>
              {/* mt-auto pins the link / button to the card bottom so they line up across a row.
                  flex (not block) so the inline link doesn't sit on a 24px text line box. */}
              <div className="mt-auto flex pt-[15px]">
                {service.link ? (
                  <a
                    className="inline-flex items-center gap-1 font-['Lato'] text-[14px] leading-[17px] font-bold text-[#5A0C91]"
                    href={service.link.href}
                  >
                    {service.link.label}
                    <ArrowRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                ) : (
                  <button
                    className="h-8 w-full rounded-full border-[1.5px] border-[#C9A3DD] px-4 text-left font-['Lato'] text-[13px] text-[#9A7BB5] transition-colors hover:bg-[#F4EEF8]"
                    type="button"
                  >
                    Notify me
                  </button>
                )}
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
