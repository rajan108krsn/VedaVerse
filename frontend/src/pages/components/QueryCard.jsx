import ArrowButton from "./ArrowButton";

function QueryCard({ question, answer }) {
  return (
    <div className="bg-[#e6f2c2] text-[#2f3a1f] rounded-2xl p-6 shadow-md hover:shadow-lg transition">

      <h3 className="font-semibold mb-2">
        {question}
      </h3>

      <p className="text-sm opacity-80 mb-4">
        {answer}
      </p>

      <ArrowButton text="Read More" className="text-white" />

    </div>
  );
}

export default QueryCard;