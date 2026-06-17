// TextSection.jsx
// Usage:
//   <TextSection title="What is an LLM?" level={2}>Your explanation here</TextSection>
//   <TextSection title="Code-style note" level={2} font="mono">...</TextSection>
//   <TextSection title="Custom Google Font" level={2} font="lobster">...</TextSection>
//   <TextSection title="Different fonts" level={2} titleFont="lobster" font="serif">...</TextSection>
//   <TextSection title="One-off custom font" level={2} fontFamily="'Poppins', sans-serif">...</TextSection>
//
// Props:
//   title       (string)  - Section heading
//   level       (1|2|3)   - Heading size (default: 2)
//   font        (string)  - preset key from FONT_PRESETS for the BODY text (default: "sans")
//   fontFamily  (string)  - custom CSS font-family for the body, overrides `font` if provided
//   titleFont   (string)  - preset key from FONT_PRESETS for the TITLE (default: same as `font`)
//   titleFontFamily (string) - custom CSS font-family for the title, overrides `titleFont` if provided
//   children              - Any JSX / text content
//
// If titleFont / titleFontFamily are not given, the title uses the same font as the body.
//
// ── Adding a Google Font ──────────────────────────────────────────────────
// 1. Go to fonts.google.com, pick a font + weights, copy the <link> tags it gives you
// 2. Paste those <link> tags into the <head> of public/index.html
// 3. Add a new entry below mapping a short key to the font's CSS name
//    e.g. lobster: "'Lobster', cursive"
// 4. Use it anywhere with font="lobster" or titleFont="lobster"

const FONT_PRESETS = {
  sans:  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono:  "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",

  // ── Add your Google Fonts here (must also be linked in public/index.html) ──
  lobster: "'Lobster', cursive",
  poppins : "Poppins",
  parisienne: "Parisienne",
  montserrat: "Montserrat"
};

export default function TextSection({
  title,
  level = 2,
  font = "sans",
  fontFamily,
  titleFont,
  titleFontFamily,
  children,
}) {
  const Tag = `h${level}`;

  // Body font
  const bodyFont = fontFamily || FONT_PRESETS[font] || FONT_PRESETS.sans;

  // Title font: falls back to body font if not specified separately
  const headingFont =
    titleFontFamily || FONT_PRESETS[titleFont] || (titleFont ? FONT_PRESETS.sans : bodyFont);

  return (
    <div className="ts-block">
      {title && (
        <Tag className={`ts-heading ts-h${level}`} style={{ fontFamily: headingFont }}>
          {title}
        </Tag>
      )}
      <div className="ts-body" style={{ fontFamily: bodyFont }}>
        {children}
      </div>
    </div>
  );
}