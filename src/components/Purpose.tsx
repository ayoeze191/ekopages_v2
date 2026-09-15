import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const stats = [
  { value: 6, suffix: "", label: "COUNTRIES REACHED" },
  { value: 5000, suffix: "+", label: "STUDENTS ENROLLED" },
];

export function Purpose() {
  return (
    <section
      className="mx-auto mt-[100px] grid w-[calc(100%-3rem)] max-w-[1180px] grid-cols-2 items-center gap-8 pb-[68px] max-[760px]:grid-cols-1 max-[700px]:w-[calc(100%-2rem)]"
      id="about-us"
    >
      <RevealGroup>
        <RevealItem>
          <p className="font-['Caveat'] text-[20px] leading-none text-[#dc8e1c]">
            ✎ Our purpose
          </p>
          <h2 className="mt-2 font-['Baloo_2'] text-[24px] leading-tight font-bold text-[#1e0a39]">
            Catch them young.
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-4 max-w-[575px] font-['Lato'] text-[14px] leading-[24px] text-[#4A4A4A]">
            We want African children to see themselves in the books they read,
            characters that look like them and in a culture that represents them
            while learning to lead the next generation on sustainability, without
            losing sight of who they are.
          </p>
        </RevealItem>
        <RevealItem className="mt-7 grid max-w-[575px] grid-cols-2 gap-4 max-[430px]:grid-cols-1">
          {stats.map((stat) => (
            <div
              className="rounded-[14px] border border-[#e8e3db] bg-white px-5 pt-6 pb-5 shadow-[0_7px_16px_rgb(50_32_18_/_8%)]"
              key={stat.label}
            >
              <p className="font-['Baloo_2'] text-[28px] leading-none font-bold text-[#5A0C91] tabular-nums">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 font-['Lato'] text-[12px] leading-none font-bold tracking-[0.08em] text-[#4A4A4A]">
                {stat.label}
              </p>
            </div>
          ))}
        </RevealItem>
        <RevealItem>
          <a
            className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full border-[2px] border-[#5A0C91] px-[26px] font-['Lato'] text-[15px] font-bold text-[#5A0C91] transition hover:-translate-y-0.5"
            href="#our-story"
          >
            Learn more about us
          </a>
        </RevealItem>
      </RevealGroup>
      <Reveal
        className="min-h-[430px] rounded-[28px] bg-[linear-gradient(130deg,#8029b9_0%,#5c0b95_48%,#31004f_100%)] max-[760px]:min-h-[300px]"
        delay={0.15}
        aria-label="Eko Pages community illustration area"
        role="img"
      />
    </section>
  );
}
