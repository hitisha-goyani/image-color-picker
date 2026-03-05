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
  onClick={() => {
    const data = JSON.stringify(palette, null, 2);

    const blob = new Blob([data], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "color-palette.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }}
>
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12"/>
                <path d="M7 10l5 5 5-5"/>
                <path d="M5 21h14"/>
              </svg>
            </button>

            {/* Save */}
            {/* Save */}
<button
  className="circle-btn"
  onClick={() => {
    const savedPalette = {
      colors: palette,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem(
      "savedPalette",
      JSON.stringify(savedPalette)
    );

    alert("Palette saved successfully!");
  }}
>
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5V3h11l3 3v15z"/>
                <path d="M7 3v5h8"/>
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
    </div>
  );
}