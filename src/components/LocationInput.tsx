import { forwardRef, useState } from "react";
import { Input } from "./ui/input";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationsSearchInput, setLocationSearchInput] = useState("");
    return <Input {...props} ref={ref} />;
  },
);
