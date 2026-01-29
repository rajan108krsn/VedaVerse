import HeroSection from "./HeroSection.jsx";
import QuickNav from "./QuickNav";
import Overview from "./Overview.jsx";
import GeetaShloka from "./GeetaShloka";
import Query from "./Query.jsx";
import Navbar from "./Navbar.jsx";
import FinalSection from "./FinalSection.jsx";
export default function Home() {
  return (
    <div className="main-bg w-full">
      <Navbar />
      <HeroSection />
      <QuickNav />
      <Overview />
      <GeetaShloka />
      <Query />
      <FinalSection />
    </div>
  );
}
