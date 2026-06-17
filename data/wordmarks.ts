/**
 * "Dilli Darbar" written across Indian scripts, each paired with a display font
 * that actually contains its glyphs. Gajraj One is Latin-only, so every non-Latin
 * line gets a script-appropriate font (Khand for Devanagari, Noto families for the
 * rest, Nastaliq for Urdu). Loaded via the combined Google Fonts <link> in
 * app/layout.tsx. Shared by SplashScreen and the route-level loading screen.
 */
export const WORDMARKS = [
  { text: "dilli-darbar", font: "'Gajraj One', sans-serif" },
  { text: "दिल्ली दरबार", font: "'Khand', sans-serif" },
  { text: "دہلی دربار", font: "'Noto Nastaliq Urdu', serif" },
  { text: "ਦਿੱਲੀ ਦਰਬਾਰ", font: "'Noto Sans Gurmukhi', sans-serif" },
  { text: "দিল্লি দরবার", font: "'Noto Sans Bengali', sans-serif" },
  { text: "தில்லி தர்பார்", font: "'Noto Sans Tamil', sans-serif" },
  { text: "ఢిల్లీ దర్బార్", font: "'Noto Sans Telugu', sans-serif" },
  { text: "દિલ્હી દરબાર", font: "'Noto Sans Gujarati', sans-serif" },
] as const;
