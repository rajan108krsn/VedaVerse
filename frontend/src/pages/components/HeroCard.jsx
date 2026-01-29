export default function HeroCard({
  img,
  depth = "0px",
  y = "0px",
  delay = "0ms",
}) {
  return (
    <div
      style={{
        transform: `translateY(${y}) translateZ(${depth})`,
        animationDelay: delay,
      }}
      className="
        w-44 h-64
        rounded-3xl
        overflow-hidden
        bg-white
        shadow-2xl
        transform-gpu
        animate-rise
      "
    >
      <img
        src={img}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
