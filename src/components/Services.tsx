import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Service = {
  title: string;
  description: string;
  link: string;
  icon: "book" | "heart" | "document" | "person";
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

const icons: Record<
  Service["icon"],
  { viewBox: string; paths: React.ReactNode }
> = {
  book: {
    viewBox: "0 0 24 24",
    paths: (
      <>
        <path d="M4 5.5C4 4.83696 4.26339 4.20107 4.73223 3.73223C5.20107 3.26339 5.83696 3 6.5 3H20V17.5C20 18.163 19.7366 18.7989 19.2678 19.2678C18.7989 19.7366 18.163 20 17.5 20H4V5.5Z" />
        <path d="M4 17.5C4 16.837 4.26339 16.2011 4.73223 15.7322C5.20107 15.2634 5.83696 15 6.5 15H20" />
      </>
    ),
  },
  heart: {
    viewBox: "0 0 19 18",
    paths: (
      <path d="M11.0629 16.8387C11.0629 16.8387 4.06292 12.4887 1.56292 8.63868C-0.137078 5.43868 1.06292 1.83868 4.46292 0.938678C6.46292 0.438678 8.26292 1.33868 9.06292 2.83868C9.86292 1.33868 11.6629 0.438678 13.6629 0.938678C17.0629 1.83868 18.2629 5.43868 16.5629 8.63868C14.0629 12.4887 11.0629 16.8387 11.0629 16.8387Z" />
    ),
  },
  document: {
    viewBox: "0 0 18 19",
    paths: (
      <path d="M0.796875 15.7998V2.7998C0.796875 2.26937 1.00759 1.76066 1.38266 1.38559C1.75773 1.01052 2.26644 0.799805 2.79688 0.799805H11.7969L16.7969 5.7998V15.7998C16.7969 16.3302 16.5862 16.8389 16.2111 17.214C15.836 17.5891 15.3273 17.7998 14.7969 17.7998H2.79688C2.26644 17.7998 1.75773 17.5891 1.38266 17.214C1.00759 16.8389 0.796875 16.3302 0.796875 15.7998Z" />
    ),
  },
  person: {
    viewBox: "0 0 24 24",
    paths: (
      <>
        <path d="M12.0016 11.3996C13.8793 11.3996 15.4016 9.87738 15.4016 7.99961C15.4016 6.12184 13.8793 4.59961 12.0016 4.59961C10.1238 4.59961 8.60156 6.12184 8.60156 7.99961C8.60156 9.87738 10.1238 11.3996 12.0016 11.3996Z" />
        <path
          d="M5 20C6 16.5 9 14.5 12 14.5C15 14.5 18 16.5 19 20"
          strokeLinecap="round"
        />
      </>
    ),
  },
};

function ServiceIcon({ icon }: Pick<Service, "icon">) {
  return (
    <svg
      className="h-[17px] w-[17px] fill-none stroke-current stroke-[1.6]"
      viewBox={icons[icon].viewBox}
      aria-hidden="true"
    >
      {icons[icon].paths}
    </svg>
  );
}

export function Services() {
  return (
    <section
      className="mx-auto mt-[100px] w-[calc(100%-3rem)] max-w-[1180px] pb-[68px] max-[700px]:w-[calc(100%-2rem)]"
      id="services"
    >
      <Reveal className="flex items-end justify-between ">
        <div>
          <h2 className="text-[32px] font-['Baloo_2'] leading-tight font-bold  text-[#1e0a39]">
            Explore our services
          </h2>
          <p className="mt-2.5 text-[16px] text-[#4A4A4A]">
            Everything a child needs to fall in love with sustainability, in one
            place.
          </p>
        </div>
        <a
          className=" rounded-full font-['Lato'] border-[2px] border-[#620a9d] px-[25px] py-3 text-[15px] rounded-[999px] font-bold text-[#620a9d] transition hover:-translate-y-0.5"
          href="#all-services"
        >
          See all services
        </a>
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
