import ArrowButton from "../components/ArrowButton";

export default function FinalSection() {
  return (
    <section className="w-full bg-[#fbf6ec] py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* subtle divider */}
        <div className="w-20 h-[2px] bg-gray-300 mx-auto mb-10" />

        <h2 className="text-5xl font-bold mb-6">
          Walk the Path with Devotion
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Bhakti is not a destination — it is a daily return to faith,
          remembrance, and inner stillness.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-6">
            <ArrowButton text="Begin Your Journey" className="text-white" />

          <ArrowButton text="Explore Wisdom" className="text-white" />
        </div>

      </div>
    </section>
  );
}
