/**
 * Renders a JSON-LD <script>. XSS-safe: we control the object and stringify it,
 * escaping the `<` that could break out of the script tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
