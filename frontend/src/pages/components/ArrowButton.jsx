import React from "react";

function ArrowButton({ text = "Get started", onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 font-medium ${className}`}
    >
      {text}

      <span className="relative">
        {/* subtle glow */}
        <span
          className="
            absolute inset-0
            rounded-full
            bg-orange-300
            opacity-20
            blur-sm
          "
        ></span>

        {/* arrow circle */}
        <span
          className="
            relative
            flex items-center justify-center
            w-8 h-8
            rounded-full
            bg-gray-800 text-white
            transition-transform duration-300 ease-out
            group-hover:translate-x-1
          "
        >
           ➤
        </span>
      </span>
    </button>
  );
}

export default ArrowButton;
