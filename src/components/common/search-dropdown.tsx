import { Search } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SearchDropdownProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  onSelect: (option: { label: string; value: string }) => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  options,
  placeholder = "Search Topics",
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  const showDropdown = isFocused && filtered.length > 0;

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-full px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-primary">
        <Search className="text-muted-foreground mr-2 size-5" />
        <input
          type="text"
          className="flex-1 outline-none bg-transparent"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 left-0 right-0 bg-background border rounded-md mt-1 shadow-lg max-h-60 overflow-auto"
          >
            {filtered.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-muted"
                onMouseDown={() => {
                  onSelect(option);
                  setQuery(option.label);
                  setIsFocused(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
