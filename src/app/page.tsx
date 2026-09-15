import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Purpose } from "@/components/Purpose";
import { EkoStore } from "@/components/EkoStore";
import { Footer } from "@/components/Footer";
import { Services } from "@/components/Services";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyParents } from "@/components/WhyParents";

export default function Home() {
  return <><Header /><main className="pt-[65px] max-[700px]:pt-[62px]"><Hero /><TrustStrip /><Services /><WhyParents /><EkoStore /><Purpose /></main><Footer /></>;
}
