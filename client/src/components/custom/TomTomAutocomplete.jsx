import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

const TOMTOM_BASE = "https://api.tomtom.com/search/2/search";

export default function TomTomAutocomplete({ onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!query || query.length < 2 || selected) {
      setSuggestions([]);
      if (!query || query.length < 2) setIsOpen(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${TOMTOM_BASE}/${encodeURIComponent(query)}.json?key=${import.meta.env.VITE_TOMTOM_PLACE_API}&typeahead=true&limit=7`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
        setIsOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selected]);

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (result) => {
    const label = result.address?.freeformAddress || result.poi?.name || query;
    setQuery(label);
    setSelected(true);
    setIsOpen(false);
    onChange({ label, value: result });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSelected(false);
  };

  const handleClear = () => {
    setQuery("");
    setSelected(false);
    setSuggestions([]);
    setIsOpen(false);
    onChange(null);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Input
          value={query}
          onChange={handleChange}
          placeholder={placeholder || "Search for a destination..."}
          className="w-full"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
          >
            ✕
          </button>
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-50 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {loading && (
            <li className="p-2 text-gray-500 text-sm">Loading...</li>
          )}
          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <li className="p-2 text-gray-500 text-sm">No results found</li>
          )}
          {suggestions.map((result, idx) => (
            <li
              key={result.id || idx}
              onClick={() => handleSelect(result)}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
            >
              <div className="text-sm font-medium">
                {result.poi?.name || result.address?.freeformAddress || query}
              </div>
              {result.poi?.name && result.address?.freeformAddress && (
                <div className="text-xs text-gray-500">
                  {result.address.freeformAddress}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
