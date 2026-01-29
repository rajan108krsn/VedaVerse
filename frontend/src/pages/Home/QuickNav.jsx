import ArrowButton from "../components/ArrowButton.jsx";
export default function QuickNav() {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <ArrowButton text='Pad' className="text-white" />
      <ArrowButton text="Charitra" className="text-white" />
      <ArrowButton text="Leela" className="text-white" />
      <ArrowButton text="Temples" className="text-white" />
      <ArrowButton text="About" className="text-white" />
    </div>
  );
}
