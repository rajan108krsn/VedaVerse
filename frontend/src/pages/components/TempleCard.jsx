export default function TempleCard({ img, name, meta }) {
  return (
    <div className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      <div className="h-[280px] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-500">
          {meta}
        </p>
      </div>

    </div>
  );
}
