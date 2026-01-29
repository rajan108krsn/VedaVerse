import img5 from "../../assets/img5.png";
import leela from "../../assets/leela.png";
export default function Overview() {
  return (
    <section className="w-full bg-[#fbf6ec] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LARGE IMAGE */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden h-[320px]">
            <img
              src={img5}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">
                Bhakt Charitra
              </h3>
              <p className="text-sm opacity-90">
                Biography of Devotees
              </p>
            </div>
          </div>

          {/* SMALL IMAGE */}
          <div className="relative rounded-3xl overflow-hidden h-[320px]">
            <img
              src={img5}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">
                Pad / Bhajans
              </h3>
              <p className="text-sm opacity-90">
                Lyrics at your fingertips
              </p>
            </div>
          </div>

          {/* SMALL IMAGE */}
          <div className="relative rounded-3xl overflow-hidden h-[260px]">
            <img
              src={leela}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">
                Temples
              </h3>
              <p className="text-sm opacity-90">
                Find sacred spaces
              </p>
            </div>
          </div>

          {/* LARGE IMAGE */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden h-[260px]">
            <img
              src={leela}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">
                Krishna Leela
              </h3>
              <p className="text-sm opacity-90">
                Visualize what matters most
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
