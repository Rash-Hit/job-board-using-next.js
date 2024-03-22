import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";
interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationsSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);
    const cities = useMemo(() => {
      if (!locationsSearchInput.trim()) return [];

      const searchWords = locationsSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationsSearchInput]);
    return (
      <div className="relative">
        <Input
          {...props}
          placeholder="Search for a city"
          type="search"
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          ref={ref}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          value={locationsSearchInput}
        />
        {locationsSearchInput.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                onMouseDown={(e) => {
                  e.preventDefault;
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
                className="block w-full p-2 text-start"
                key={city}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
