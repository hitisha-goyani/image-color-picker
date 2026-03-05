import { useRef, useState, useEffect } from "react";
import { rgbToHex, rgbToHsl } from "../utils/colorUtils";
import ColorDetails from "./ColorDetails";

export default function ImageTab() {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const frameRef = useRef(null);

  const [imageSrc, setImageSrc] = useState("");
const [color, setColor] = useState("#2596be");
const [rgb, setRgb] = useState("rgb(37,150,190)");
const [hsl, setHsl] = useState({ h:196, s:67, l:45 });
  const [palette, setPalette] = useState([]);
  const [paletteLimit, setPaletteLimit] = useState(12);
  const [zoom, setZoom] = useState({ x: 0, y: 0, show: false });
  const [showExport, setShowExport] = useState(false);
const [activeExport, setActiveExport] = useState(null);

  useEffect(() => {
    setImageSrc(
      "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg"
    );
  }, []);

  // ================= IMAGE LOAD =================
  const handleImageLoad = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true
    });

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    extractAllColors();
  };

  // ================= HOVER COLOR PICK =================
  const handleMouseMove = (e) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const rect = imgRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", {
        willReadFrequently: true
      });

      const scaleX = imgRef.current.naturalWidth / rect.width;
      const scaleY = imgRef.current.naturalHeight / rect.height;

      const x = Math.floor((e.clientX - rect.left) * scaleX);
      const y = Math.floor((e.clientY - rect.top) * scaleY);

      if (x < 0 || y < 0) return;

      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

      setColor(hex);
      setRgb(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
      setHsl(rgbToHsl(pixel[0], pixel[1], pixel[2]));

      setZoom({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        show: true
      });
    });
  };

  const handleLeave = () => {
    setZoom({ x: 0, y: 0, show: false });
  };

  // ================= IMAGE UPLOAD =================
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  // ================= EXTRACT PALETTE =================
  const extractAllColors = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true
    });

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height).data;

    const colorSet = new Set();

    for (let i = 0; i < imageData.length; i += 80) {
      const hex = rgbToHex(
        imageData[i],
        imageData[i + 1],
        imageData[i + 2]
      );
      colorSet.add(hex);
      if (colorSet.size > 300) break;
    }

    setPalette([...colorSet]);
  };

  // download button //


  const downloadFile = (content, filename, type) => {

  const blob = new Blob([content], { type });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const exportCSS = () => {
  const css = palette
    .slice(0, paletteLimit)
    .map((c, i) => `--color-${i + 1}: ${c};`)
    .join("\n");

  downloadFile(css, "palette.css", "text/css");
};

const exportCode = () => {
  const code = palette
    .slice(0, paletteLimit)
    .map(c => `"${c}"`)
    .join(",\n");

  downloadFile(`[${code}]`, "palette.txt", "text/plain");
};

const exportSVG = () => {

  const colors = palette.slice(0, paletteLimit);

  const width = 100 * colors.length;

  const svg =
`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="100">
${colors.map((c,i)=>`<rect x="${i*100}" y="0" width="100" height="100" fill="${c}" />`).join("")}
</svg>`;

  downloadFile(svg, "palette.svg", "image/svg+xml");
};

const exportPNG = () => {

  const colors = palette.slice(0, paletteLimit);

  const canvas = document.createElement("canvas");
  const size = 80;

  canvas.width = colors.length * size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  colors.forEach((c,i)=>{
    ctx.fillStyle = c;
    ctx.fillRect(i*size,0,size,size);
  });

  const link = document.createElement("a");
  link.download = "palette.png";
  link.href = canvas.toDataURL();
  link.click();
};

  return (
    <div className="content">

      <div className="left-panel">
        <div className="image-box">
          <img
            ref={imgRef}
            src={imageSrc}
            alt=""
            crossOrigin="anonymous"
            onLoad={handleImageLoad}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleLeave}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {zoom.show && (
            <div
              className="zoom-box"
              style={{
                top: zoom.y,
                left: zoom.x,
                background: color
              }}
            />
          )}
        </div>

        {/* ================= PALETTE ================= */}
        <div className="palette-section">
          <h3>Color Palette</h3>

          <div className="palette-controls">

            {/* Minus */}
            <button
              className="circle-btn"
              onClick={() =>
                setPaletteLimit(prev => Math.max(4, prev - 4))
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>

            {/* Color Bar */}
            <div className="palette-bar">
              {palette
                .slice(0, paletteLimit)
                .map((c, i) => (
                  <div
                    key={i}
                    style={{ background: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
            </div>

            {/* Plus */}
            <button
              className="circle-btn"
              onClick={() =>
                setPaletteLimit(prev => prev + 4)
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>

            {/* Download */}
            {/* Download */}
<button
  className="circle-btn"
  onClick={() => setShowExport(true)}
>
  <svg width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v12"/>
    <path d="M7 10l5 5 5-5"/>
    <path d="M5 21h14"/>
  </svg>
</button>

           

          </div>
        </div>
      </div>

      <ColorDetails
        color={color}
        rgb={rgb}
        hsl={hsl}
        fileInputRef={fileInputRef}
        handleUpload={handleUpload}
      />


      {showExport && (

<div className="export-overlay">

  <div className="export-modal">

    <h2>Export Palette</h2>

    <div className="export-list">

      <div onClick={()=>setActiveExport("css")}>CSS</div>

      {activeExport==="css" && (
        <div className="export-actions">
          <button onClick={()=>setShowExport(false)}>Cancel</button>
          <button onClick={exportCSS}>Download</button>
        </div>
      )}

      <div onClick={()=>setActiveExport("code")}>Code</div>

      {activeExport==="code" && (
        <div className="export-actions">
          <button onClick={()=>setShowExport(false)}>Cancel</button>
          <button onClick={exportCode}>Download</button>
        </div>
      )}

      <div onClick={()=>setActiveExport("svg")}>SVG</div>

      {activeExport==="svg" && (
        <div className="export-actions">
          <button onClick={()=>setShowExport(false)}>Cancel</button>
          <button onClick={exportSVG}>Download</button>
        </div>
      )}

      <div onClick={()=>setActiveExport("png")}>PNG</div>

      {activeExport==="png" && (
        <div className="export-actions">
          <button onClick={()=>setShowExport(false)}>Cancel</button>
          <button onClick={exportPNG}>Download</button>
        </div>
      )}

    </div>

  </div>

</div>
)}
    </div>
  );
}