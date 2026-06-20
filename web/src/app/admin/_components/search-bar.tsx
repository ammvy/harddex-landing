import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative flex-1 min-w-[180px]">
      <Search
        size={14}
        strokeWidth={1.8}
        className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="w-full bg-input-background border border-border pl-9 pr-3 py-2.5 outline-none uppercase tracking-wider text-[11px] focus:border-primary transition-colors duration-100 placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
