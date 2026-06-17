const DISHES = [
  "ALOO PARATHA",
  "CHICKEN BIRYANI",
  "DAL MAKHANI",
  "RAJMA",
  "CHOLE",
  "MEETHI LASSI",
  "MANGO CHEESECAKE",
  "DARBAR BOWLS",
];

function Track() {
  return (
    <div className="flex items-center shrink-0">
      {DISHES.map((dish) => (
        <span key={dish} className="flex items-center">
          <span className="font-heading text-cream text-[26px] px-4 whitespace-nowrap">
            {dish}
          </span>
          <span className="w-2 h-2 rounded-full bg-saffron shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="bg-ink h-16 flex items-center overflow-hidden group">
      <div className="flex animate-marquee group-hover:[animation-duration:60s] motion-reduce:animate-none">
        <Track />
        <Track />
      </div>
    </div>
  );
}
