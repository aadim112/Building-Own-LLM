// ImageBlock.jsx
// Usage: <ImageBlock src={myImg} alt="Attention diagram" caption="Fig 1: Scaled dot-product attention" />
// Props:
//   src      (string)  - image path / import
//   alt      (string)  - alt text
//   caption  (string)  - optional caption shown below image
//   width    (string)  - optional CSS width, e.g. "80%" (default: "100%")

export default function ImageBlock({ src, alt, caption, width = "100%" }) {
  return (
    <figure className="ib-figure">
      <img src={src} alt={alt} className="ib-img" style={{ width }} />
      {caption && <figcaption className="ib-caption">{caption}</figcaption>}
    </figure>
  );
}
