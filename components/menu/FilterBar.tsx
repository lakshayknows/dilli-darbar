import { filterCategories, MenuCategory } from "@/data/menu";

export default function FilterBar({
  active,
  onChange,
  vegOnly,
  onVegOnlyChange,
}: {
  active: MenuCategory | "ALL";
  onChange: (value: MenuCategory | "ALL") => void;
  vegOnly: boolean;
  onVegOnlyChange: (value: boolean) => void;
}) {
  return (
    <div className="sticky top-20 z-30 -mx-6 px-6 md:mx-0 md:px-0 py-4 bg-maroon flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3 overflow-x-auto snap-x-mandatory pb-1">
        {filterCategories.map((cat) => {
          const isActive = active === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`shrink-0 snap-center-item min-h-[44px] px-5 font-body font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                isActive
                  ? "bg-saffron text-ink"
                  : "border border-cream text-cream hover:bg-cream hover:text-ink"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Veg-only toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={vegOnly}
        onClick={() => onVegOnlyChange(!vegOnly)}
        className={`shrink-0 min-h-[44px] inline-flex items-center gap-2.5 px-4 border font-body font-medium text-sm transition-colors duration-200 ${
          vegOnly
            ? "border-green-600 text-cream bg-green-700/20"
            : "border-cream/40 text-cream/80 hover:border-cream"
        }`}
      >
        <span
          className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
            vegOnly ? "bg-green-600" : "bg-cream/25"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-cream transition-transform duration-200 ${
              vegOnly ? "translate-x-4" : ""
            }`}
          />
        </span>
        Veg only
      </button>
    </div>
  );
}
