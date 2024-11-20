import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-3 text-sm focus:outline-none
         focus:ring focus:ring-yellow-400
        focus:ring-offset-2 fucus:w-72
         bg-yellow-100 placeholder:text-stone-900
          w-28 sm:w-64 transition-all duration-300"
      />
    </form>
  );
}
