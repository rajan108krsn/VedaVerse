import QueryCard from "../components/QueryCard.jsx";
import temple from "../../assets/temple.jpeg";
export default function QuerySection() {
  return (
    <section className="w-full bg-[#4c5b3c] py-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE (Temple / Manuscript) */}
        <div className="flex justify-center">
          <div className="relative w-[420px] h-[520px] rounded-[32px] overflow-hidden shadow-2xl">

            <img
              src={temple}   // 👈 replace with manuscript.jpg if needed
              alt="Temple Wisdom"
              className="w-full h-full object-cover"
            />

            {/* soft overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* caption */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-semibold mb-1">
                Timeless Wisdom
              </h3>
              <p className="text-sm opacity-90">
                Questions answered through shastras & devotion
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-white">

          <h2 className="text-4xl font-bold mb-4">
            Seek with Faith, <br /> Receive with Clarity
          </h2>

          <p className="text-white/80 mb-10 max-w-md">
            Devotees ask heartfelt questions. Timeless wisdom from
            shastras and acharyas guides the way forward.
          </p>

          {/* QUERY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <QueryCard
              question="Why do we chant the holy name daily?"
              answer="Regular chanting purifies the mind and keeps the heart connected to Krishna."
            />

            <QueryCard
              question="How to stay devoted in difficult times?"
              answer="Surrender, remembrance, and association help steady the soul."
            />

            <QueryCard
              question="What is the essence of Bhagavad Gita?"
              answer="Do your duty with devotion, without attachment to results."
            />

            <QueryCard
              question="How should a beginner start bhakti?"
              answer="Begin with naam japa, simple prayers, and sincere intent."
            />

          </div>
        </div>
      </div>
    </section>
  );
}
