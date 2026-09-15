import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const benefits = [
  {
    title: "Visualisable content",
    text: "3D and animated stories make abstract ideas concrete.",
    tone: "bg-[#247b53]",
    icon: "leaf",
  },
  {
    title: "100% retention",
    text: "Story-based lessons stick far longer than textbooks.",
    tone: "bg-[#4e80ca]",
    icon: "pin",
  },
  {
    title: "Higher engagement",
    text: "Quizzes and games keep kids coming back on their own.",
    tone: "bg-[#df6b5d]",
    icon: "robot",
  },
  {
    title: "Future-ready kids",
    text: "SDG fluency prepares children for tomorrow's careers.",
    tone: "bg-[#620a9d]",
    icon: "rocket",
  },
];

function BenefitIcon({ icon }: { icon: string }) {
  if (icon === "leaf")
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.33594 16.2534C4.33594 9.75189 8.67026 4.87577 20.5896 4.33398C19.5061 15.1698 14.0882 19.5041 6.5031 20.5877C5.41952 20.696 4.33594 19.5041 4.33594 19.5041V16.2534Z"
          fill="white"
          fill-opacity="0.9"
        />
        <path
          d="M4.33594 16.2534C4.33594 9.75189 8.67026 4.87577 20.5896 4.33398C19.5061 15.1698 14.0882 19.5041 6.5031 20.5877C5.41952 20.696 4.33594 19.5041 4.33594 19.5041V16.2534Z"
          stroke="#1F0A33"
          stroke-width="1.51701"
          stroke-linejoin="round"
        />
        <path
          d="M6.5 19.5044C8.66716 16.2536 11.9179 13.5447 17.3358 10.2939"
          stroke="#1F0A33"
          stroke-width="1.51701"
          stroke-linecap="round"
        />
      </svg>
    );
  if (icon === "pin")
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M13.0015 2.70898C14.7258 2.70898 16.3795 3.39396 17.5987 4.61322C18.818 5.83249 19.503 7.48617 19.503 9.21047C19.503 12.1361 17.6609 13.5448 16.9024 15.2785C16.5773 16.037 16.2522 17.0122 16.2522 17.8791H9.75074C9.75074 17.0122 9.42567 16.037 9.10059 15.2785C8.34209 13.5448 6.5 12.1361 6.5 9.21047C6.5 7.48617 7.18498 5.83249 8.40424 4.61322C9.6235 3.39396 11.2772 2.70898 13.0015 2.70898Z"
          fill="white"
          fillOpacity="0.92"
          stroke="#1F0A33"
          strokeWidth="1.51701"
        />
        <path
          d="M10.2969 20.5879H15.7148M11.0554 23.2968H14.9563"
          stroke="#1F0A33"
          strokeWidth="1.51701"
          strokeLinecap="round"
        />
        <path
          d="M13.0026 6.50195V10.077M10.8359 8.66862L13.0026 10.2936L15.1693 8.66862"
          stroke="#1F0A33"
          strokeWidth="1.3003"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (icon === "robot")
    return (
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17.8756 7.58496H8.12338C5.7296 7.58496 3.78906 9.5255 3.78906 11.9193V15.17C3.78906 17.5638 5.7296 19.5043 8.12338 19.5043H17.8756C20.2694 19.5043 22.2099 17.5638 22.2099 15.17V11.9193C22.2099 9.5255 20.2694 7.58496 17.8756 7.58496Z"
          fill="white"
          fillOpacity="0.92"
          stroke="#1F0A33"
          strokeWidth="1.51701"
        />
        <path
          d="M9.21198 15.0607C10.0496 15.0607 10.7286 14.3816 10.7286 13.544C10.7286 12.7064 10.0496 12.0273 9.21198 12.0273C8.37435 12.0273 7.69531 12.7064 7.69531 13.544C7.69531 14.3816 8.37435 15.0607 9.21198 15.0607Z"
          fill="#1F0A33"
        />
        <path
          d="M16.7979 15.0607C17.6355 15.0607 18.3146 14.3816 18.3146 13.544C18.3146 12.7064 17.6355 12.0273 16.7979 12.0273C15.9603 12.0273 15.2812 12.7064 15.2812 13.544C15.2812 14.3816 15.9603 15.0607 16.7979 15.0607Z"
          fill="#1F0A33"
        />
        <path
          d="M8.125 4.87598L9.75037 7.04314M17.8772 4.87598L16.2519 7.04314"
          stroke="#1F0A33"
          strokeWidth="1.40865"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.0007 2.16699C15.1679 4.55087 16.2515 7.58489 16.2515 11.3774C16.2515 13.8697 15.7097 16.1452 14.8428 18.0956L13.0007 21.6714L11.1587 18.0956C10.2918 16.1452 9.75 13.8697 9.75 11.3774C9.75 7.58489 10.8336 4.55087 13.0007 2.16699Z"
        fill="white"
        fillOpacity="0.92"
        stroke="#1F0A33"
        strokeWidth="1.51701"
        strokeLinejoin="round"
      />
      <path
        d="M12.999 12.0272C13.9563 12.0272 14.7323 11.2512 14.7323 10.2939C14.7323 9.33659 13.9563 8.56055 12.999 8.56055C12.0417 8.56055 11.2656 9.33659 11.2656 10.2939C11.2656 11.2512 12.0417 12.0272 12.999 12.0272Z"
        fill="#1F0A33"
      />
      <path
        d="M9.21168 17.3369C7.04452 18.2038 5.96094 19.5041 5.96094 20.5877M16.7967 17.3369C18.9639 18.2038 20.0475 19.5041 20.0475 20.5877"
        stroke="#1F0A33"
        strokeWidth="1.40865"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DropletAccent() {
  return (
    <svg
      className="pointer-events-none absolute right-[-31px] bottom-[-30px] h-[220px] w-[220px] opacity-40"
      viewBox="0 0 163 163"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M81.4046 13.5684C47.4847 27.1363 27.1328 54.2722 27.1328 88.1921C27.1328 102.586 32.8507 116.39 43.0287 126.568C53.2066 136.746 67.0108 142.464 81.4046 142.464C95.7984 142.464 109.603 136.746 119.781 126.568C129.959 116.39 135.676 102.586 135.676 88.1921C135.676 54.2722 115.325 27.1363 81.4046 13.5684Z"
        stroke="#853f35"
        strokeWidth="8.14077"
      />
    </svg>
  );
}

export function WhyParents() {
  return (
    <section className="mx-auto mt-[100px] w-[calc(100%-3rem)] max-w-[1180px] max-[700px]:w-[calc(100%-2rem)]">
      <Reveal className="relative overflow-hidden rounded-[20px] bg-[#f9ad32] px-[24px] py-[32px] sm:px-[34px] sm:py-[42px]">
        <h2 className="text-[24px] font-['Baloo_2'] leading-tight font-bold text-[#1e0a39]">
          Why parents choose Eko Pages
        </h2>
        <p className="mt-2 text-[14px] text-[#080602]">
          Built around how young children actually retain what they learn.
        </p>
        <RevealGroup
          className="relative z-10 mt-[32px] grid grid-cols-4 gap-7 max-[760px]:grid-cols-2 max-[460px]:grid-cols-1"
          delay={0.15}
        >
          {benefits.map((benefit) => (
            <RevealItem as="article" key={benefit.title} className="w-[263px]">
              <span
                className={`grid h-[56px] w-[56px] place-items-center rounded-[14px] ${benefit.tone}`}
              >
                <BenefitIcon icon={benefit.icon} />
              </span>
              <h3 className="mt-[14px] text-[14px] font-['Baloo_2'] font-bold text-[#1e0a39]">
                {benefit.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.45] text-[#4c3218]">
                {benefit.text}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <DropletAccent />
      </Reveal>
    </section>
  );
}
