import TempleCard from "../components/TempleCard";
import temple from "../../data/temple.js";

export default function Temple() {
  return (
    <section className="w-full bg-[#fbf6ec] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Sacred Temples
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover timeless temples across Bharat.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {temple.map((temple) => (
            <TempleCard
              key={temple.id}
              img={temple.image}
              name={temple.name}
              meta={temple.meta}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
