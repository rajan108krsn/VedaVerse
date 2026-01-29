import ArrowButton from "../components/ArrowButton";
import HeroCard from "../components/HeroCard";
import harivanshji from "../../assets/harivanshji.jpeg";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img7 from "../../assets/img7.png";
import img5 from "../../assets/img5.png";
export default function HeroSection() {
  return (
    <div className="w-full py-16">
      <div className="max-w-5xl mx-auto rounded-[36px] p-12 md:p-20">
        <div className="text-center">
          <h1 className="text-2xl mb-2">
            Streamline Your Practice,
          </h1>

          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            Deepen Your Devotion
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Explore bhajans, read geeta shlokas, and dive into leelas — all in
            one place crafted for calm focus.
          </p>

          <div className="flex justify-center gap-4 mb-14">
            <ArrowButton text="Get started for free" className="text-white" />
            <ArrowButton text="Learn more" className="text-white" />
          </div>

          {/* 👇 HERO IMAGE ARC */}
          <div className="relative mt-20 flex justify-center gap-8 [perspective:1400px]">
  <HeroCard img={harivanshji} depth="-200px" y="-20px" delay="0ms" />
  <HeroCard img={img2} depth="-120px" y="-40px" delay="120ms" />
  <HeroCard img={img3} depth="0px"     y="-60px" delay="240ms" />
  <HeroCard img={img7} depth="-120px" y="-40px" delay="360ms" />
  <HeroCard img={img5} depth="-200px" y="-20px" delay="480ms" />
</div>
        </div>
      </div>
    </div>
  );
}
