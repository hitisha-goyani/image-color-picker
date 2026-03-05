import { useRef, useState } from "react";
import { rgbToHex, rgbToHsl } from "../utils/colorUtils";
import ColorDetails from "./ColorDetails";


export default function ImagePicker() {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  );

  const [color, setColor] = useState("#ffffff");
  const [rgb, setRgb] = useState("");
  const [hsl, setHsl] = useState({});
  const [palette, setPalette] = useState([]);
  const [paletteLimit, setPaletteLimit] = useState(20);

  const [zoomPosition, setZoomPosition] = useState({
    x: 0,
    y: 0,
    show: false
  });

  // 🖼 When image loads
  const onImageLoad = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    extractAllColors();
  };

  // 🎯 Hover pick color
  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleX = imgRef.current.naturalWidth / rect.width;
    const scaleY = imgRef.current.naturalHeight / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = rgbToHex(r, g, b);

    setColor(hex);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    setHsl(rgbToHsl(r, g, b));

    setZoomPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true
    });
  };

  const handleLeave = () => {
    setZoomPosition(prev => ({ ...prev, show: false }));
  };

  // 📂 Upload image
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🎯 EyeDropper
  const handlePickFromScreen = async () => {
    if (!window.EyeDropper) {
      alert("EyeDropper not supported in this browser");
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();

      const hex = result.sRGBHex;

      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);

      setColor(hex);
      setRgb(`rgb(${r}, ${g}, ${b})`);
      setHsl(rgbToHsl(r, g, b));
    } catch (e) {
      console.log("Cancelled");
    }
  };

  // 🌈 Extract all colors from image
  const extractAllColors = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height).data;

    const colorSet = new Set();

    for (let i = 0; i < imageData.length; i += 50) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];

      const hex = rgbToHex(r, g, b);
      colorSet.add(hex);

      if (colorSet.size >= 400) break;
    }

    setPalette(Array.from(colorSet));
  };

  return (
    <div className="content">

      <div className="image-box">
        <img
          ref={imgRef}
          src={imageSrc}
          crossOrigin="anonymous"
          onLoad={onImageLoad}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          alt=""
        />

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {zoomPosition.show && (
          <div
            className="zoom-box"
            style={{
              top: zoomPosition.y,
              left: zoomPosition.x,
              background: color
            }}
          />
        )}
      </div>

      <ColorDetails
        color={color}
        rgb={rgb}
        hsl={hsl}
        fileInputRef={fileInputRef}
        handleUpload={handleUpload}
        handlePickFromScreen={handlePickFromScreen}
      />

     {/* Palette Bar */}
{/* ===== COLOR PALETTE ===== */}
<div className="palette-container">

  <h3 className="palette-heading">Color Palette</h3>

  <div className="palette-controls-row">

    {/* Minus */}
    <button
      className="palette-circle-btn"
      onClick={() =>
        setPaletteLimit(prev => Math.max(4, prev - 4))
      }
    >
      <svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>

    {/* Plus */}
    <button
      className="palette-circle-btn"
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

    {/* Color Strip */}
    <div className="palette-strip-bar">
      {palette.slice(0, paletteLimit).map((c, i) => (
        <div
          key={i}
          className="palette-segment"
          style={{ background: c }}
          onClick={() => setColor(c)}
          title={c}
        />
      ))}
    </div>

    {/* Download */}
    <button
      className="palette-circle-btn"
      onClick={() => {
        const blob = new Blob(
          [JSON.stringify(palette)],
          { type: "application/json" }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "palette.json";
        a.click();
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
    <button
      className="palette-circle-btn"
      onClick={() =>
        localStorage.setItem("palette", JSON.stringify(palette))
      }
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
  );
}