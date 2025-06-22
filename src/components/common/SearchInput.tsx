import { Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchInputProps {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search Topics",
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== query) {
      setQuery(urlSearch);
    }
  }, [searchParams]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (newQuery) {
        params.set("search", newQuery);
      } else {
        params.delete("search");
      }
      setSearchParams(params, { replace: true });
    }, 500);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-primary">
        <Search className="text-muted-foreground mr-2 size-5" />
        <input
          type="text"
          className="flex-1 outline-none bg-transparent"
          placeholder={placeholder}
          value={query}
          onChange={handleQueryChange}
        />
      </div>
    </div>
  );
};
