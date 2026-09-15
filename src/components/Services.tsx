import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ServiceIcon, type ServiceIconName } from "@/components/ServiceIcon";

type Service = {
  title: string;
  description: string;
  link: string;
  icon: ServiceIconName;
  comingSoon?: boolean;
};

const services: Service[] = [
  {
    title: "Eko Learn",
    description:
      "Affordable school & group packages unlocking books, courses and set SDGs.",
    link: "Explore Eko Learn",
    icon: "book",
  },
  {
    title: "Eko Tales",
    description:
      "A weekly publication of children's stories animated and set SDGs.",
    link: "Browse all tales",
    icon: "heart",
  },
  {
    title: "SDG Literacy Drive",
    description:
      "A social initiative educating the African child on the SDGs through literature.",
    link: "Browse all drives",
    icon: "document",
  },
  {
    title: "Book a Tutor",
    description:
      "Certified tutors, bookable online, to teach SDG topics one-on-one.",
    link: "Notify me",
    icon: "person",
    comingSoon: true,
  },
];

export function Services() {
  return (
    <section
      className="mx-auto mt-[100px] w-[calc(100%-3rem)] max-w-[1180px] pb-[68px] max-[700px]:mt-16 max-[700px]:w-[calc(100%-2rem)] max-[700px]:pb-0"
      id="services"
    >
      <Reveal className="flex items-end justify-between max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-5">
        <div>
          <h2 className="text-[32px] font-['Baloo_2'] leading-tight font-bold  text-[#1e0a39]">
            Explore our services
          </h2>
          <p className="mt-2.5 text-[16px] text-[#4A4A4A]">
            Everything a child needs to fall in love with sustainability, in one
            place.
          </p>
        </div>
        <Link
          className=" rounded-full font-['Lato'] border-[2px] border-[#620a9d] px-[25px] py-3 text-[15px] rounded-[999px] font-bold whitespace-nowrap text-[#620a9d] transition hover:-translate-y-0.5"
          href="/services"
        >
          See all services
        </Link>
      </Reveal>

      <RevealGroup className="mt-[30px] grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {services.map((service) => (
          <RevealItem
            as="article"
            className={`relative min-h-[218px] rounded-xl border border-[#e8e3db] bg-white p-5 shadow-[0_7px_16px_rgb(50_32_18_/_8%)] transition-shadow duration-300 ${service.comingSoon ? "text-[#686267]" : "text-[#1e0a39] hover:shadow-[0_16px_30px_rgb(50_32_18_/_12%)]"}`}
            whileHover={service.comingSoon ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            key={service.title}
          >
            {service.comingSoon && (
              <span className="absolute top-4 right-3 rounded-full bg-[#fbf8f1] px-3 py-1 text-[9px] font-medium text-[#77716b]">
                COMING SOON
              </span>
            )}
            <span
              className={`grid p-3.5 w-fit place-items-center rounded-[10px] ${service.comingSoon ? "bg-[#f5effa] text-[#9868be]" : "bg-[#f2eafa] text-[#620a9d]"}`}
            >
              <ServiceIcon icon={service.icon} />
            </span>
            <h3 className="mt-[14px] text-[18px] font-['Baloo_2'] font-bold">
              {service.title}
            </h3>
            <p className="mt-3 font-['Lato'] text-[14px] text-[#4A4A4A]  leading-[22.4px]">
              {service.description}
            </p>
            {service.comingSoon ? (
              <button
                className="mt-4 w-full rounded-full border border-[#c998e1] py-1.5 text-[11px] font-medium text-[#825399]"
                type="button"
              >
                {service.link}
              </button>
            ) : (
              <a
                className="absolute bottom-5 text-[14px] leading-[14px] font-['Lato'] font-bold text-[#620a9d]"
                href={`#${service.title.toLowerCase().replaceAll(" ", "-")}`}
              >
                {service.link} <span aria-hidden="true">→</span>
              </a>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
