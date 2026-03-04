// import { useState } from "react";
// import tinycolor from "tinycolor2";
// import { converter } from "culori";

// /* ================= ICONS ================= */

// const CopyIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24">
//     <path fill="currentColor"
//       d="M16 1H4C3 1 2 2 2 3v12h2V3h12V1zm3 4H8c-1 
//       0-2 1-2 2v14c0 1 1 2 2 2h11c1 
//       0 2-1 2-2V7c0-1-1-2-2-2z"/>
//   </svg>
// );


// /* ================= CULORI CONVERTERS ================= */

// const toLab = converter("lab");
// const toLuv = converter("luv");
// const toXyz = converter("xyz65");

// /* ================= MANUAL CMYK ================= */

// function rgbToCmyk(r, g, b) {
//   let c = 1 - r / 255;
//   let m = 1 - g / 255;
//   let y = 1 - b / 255;

//   let k = Math.min(c, m, y);

//   if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

//   c = ((c - k) / (1 - k)) * 100;
//   m = ((m - k) / (1 - k)) * 100;
//   y = ((y - k) / (1 - k)) * 100;
//   k = k * 100;

//   return {
//     c: Math.round(c),
//     m: Math.round(m),
//     y: Math.round(y),
//     k: Math.round(k)
//   };
// }

// /* ================= MANUAL HWB ================= */

// function rgbToHwb(r, g, b) {
//   r /= 255;
//   g /= 255;
//   b /= 255;

//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);

//   const tc = tinycolor({ r: r * 255, g: g * 255, b: b * 255 });
//   const h = tc.toHsl().h;

//   return {
//     h: Math.round(h),
//     w: Math.round(min * 100),
//     b: Math.round((1 - max) * 100),
//   };
// }

// /* ================= COMPONENT ================= */

// export default function ColorPickerTab() {
//   const [hex, setHex] = useState("#2596be");
//   const [favorite, setFavorite] = useState(false);

//   const tc = tinycolor(hex);
//   const rgb = tc.toRgb();
//   const hsl = tc.toHsl();

//   const lab = toLab(hex);
//   const luv = toLuv(hex);
//   const xyz = toXyz(hex);

//   const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
//   const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);

//   const copy = (value) => navigator.clipboard.writeText(value);

//   return (
//     <div className="cp-container">

//       <h2 className="cp-title">Color Conversion</h2>

//       <div className="cp-wrapper">

//         {/* LEFT PANEL */}
//        {/* LEFT PANEL */}
// <div className="cp-left">

//   {/* BIG COLOR PREVIEW BOX */}
//   <div
//     className="cp-gradient-box"
//     style={{ background: hex }}
//   />

//   {/* HUE SLIDER */}
//   <input
//     type="range"
//     min="0"
//     max="360"
//     value={hsl.h * 360}
//     onChange={(e) => {
//       const newColor = tinycolor({
//         h: e.target.value,
//         s: hsl.s,
//         l: hsl.l
//       });
//       setHex(newColor.toHexString());
//     }}
//     className="cp-hue-slider"
//   />

//   {/* HEX INPUT */}
//   <div className="cp-hex-row">
//     <label>HEX</label>
//     <input
//       value={hex}
//       onChange={(e) => setHex(e.target.value)}
//     />
//   </div>

//   {/* SCREEN PICK */}
//   <button
//     className="cp-screen-btn"
//     onClick={async () => {
//       if (!window.EyeDropper)
//         return alert("Not supported");

//       const eyeDropper = new window.EyeDropper();
//       const result = await eyeDropper.open();
//       setHex(result.sRGBHex);
//     }}
//   >
//     Pick from screen
//   </button>

// </div>

//         {/* RIGHT PANEL */}
//         <div className="cp-right">

//           <div className="cp-card" style={{ background: hex }}>
//             <div>
//               <h1>{hex}</h1>
//               <span>{tc.toName() || "Custom Color"}</span>
//             </div>

         
//           </div>

//           <div className="cp-grid">

//             <Box label="HEX" value={hex} copy={copy}/>
//             <Box label="RGB"
//               value={`${rgb.r}, ${rgb.g}, ${rgb.b}`}
//               copy={copy}
//             />
//             <Box label="HSL"
//               value={`${Math.round(hsl.h*360)}, ${Math.round(hsl.s*100)}, ${Math.round(hsl.l*100)}`}
//               copy={copy}
//             />
//             <Box label="CMYK"
//               value={`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`}
//               copy={copy}
//             />
//             <Box label="XYZ"
//               value={`${Math.round(xyz.x)}, ${Math.round(xyz.y)}, ${Math.round(xyz.z)}`}
//               copy={copy}
//             />
//             <Box label="LUV"
//               value={`${Math.round(luv.l)}, ${Math.round(luv.u)}, ${Math.round(luv.v)}`}
//               copy={copy}
//             />
//             <Box label="LAB"
//               value={`${Math.round(lab.l)}, ${Math.round(lab.a)}, ${Math.round(lab.b)}`}
//               copy={copy}
//             />
//             <Box label="HWB"
//               value={`${hwb.h}, ${hwb.w}, ${hwb.b}`}
//               copy={copy}
//             />

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= BOX ================= */

// function Box({ label, value, copy }) {
//   return (
//     <div className="cp-box">
//       <span className="cp-label">{label}</span>
//       <div className="cp-value">
//         <span>{value}</span>
//         <button onClick={() => copy(value)}>
//           <CopyIcon/>
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import tinycolor from "tinycolor2";
import { converter } from "culori";

/* ================= ICONS ================= */

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M16 1H4C3 1 2 2 2 3v12h2V3h12V1zm3 4H8c-1 
      0-2 1-2 2v14c0 1 1 2 2 2h11c1 
      0 2-1 2-2V7c0-1-1-2-2-2z"
    />
  </svg>
);

/* ================= CULORI CONVERTERS ================= */

const toLab = converter("lab");
const toLuv = converter("luv");
const toXyz = converter("xyz65");

/* ================= MANUAL CMYK ================= */

function rgbToCmyk(r, g, b) {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, m, y);

  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

  c = ((c - k) / (1 - k)) * 100;
  m = ((m - k) / (1 - k)) * 100;
  y = ((y - k) / (1 - k)) * 100;
  k = k * 100;

  return {
    c: Math.round(c),
    m: Math.round(m),
    y: Math.round(y),
    k: Math.round(k),
  };
}

/* ================= MANUAL HWB ================= */

function rgbToHwb(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  const tc = tinycolor({ r: r * 255, g: g * 255, b: b * 255 });
  const h = tc.toHsl().h;

  return {
    h: Math.round(h),
    w: Math.round(min * 100),
    b: Math.round((1 - max) * 100),
  };
}

/* ================= COMPONENT ================= */

export default function ColorPickerTab() {
  const [hex, setHex] = useState("#2596be");

  /* ===== NEW PICKER STATES (ONLY FOR UI) ===== */
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(60);
  const [brightness, setBrightness] = useState(70);
  const sbRef = useRef(null);

  /* ===== UPDATE HEX FROM PICKER ===== */
  useEffect(() => {
    const color = tinycolor({
      h: hue,
      s: saturation / 100,
      v: brightness / 100,
    });
    setHex(color.toHexString());
  }, [hue, saturation, brightness]);

  /* ===== DRAG FUNCTION ===== */
  const startDrag = (e) => {
    updateColor(e);
    window.addEventListener("mousemove", updateColor);
    window.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    window.removeEventListener("mousemove", updateColor);
    window.removeEventListener("mouseup", stopDrag);
  };

  const updateColor = (e) => {
    const rect = sbRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));

    setSaturation((x / rect.width) * 100);
    setBrightness(100 - (y / rect.height) * 100);
  };

  /* ===== ORIGINAL LOGIC (UNCHANGED) ===== */
  const tc = tinycolor(hex);
  const rgb = tc.toRgb();
  const hsl = tc.toHsl();
  const lab = toLab(hex);
  const luv = toLuv(hex);
  const xyz = toXyz(hex);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);

  const copy = (value) => navigator.clipboard.writeText(value);

  return (
    <div className="cp-container">
      <h2 className="cp-title">Color Conversion</h2>

      <div className="cp-wrapper">

        {/* ================= UPDATED COLOR PICKER ONLY ================= */}
        <div className="cp-left">

          <div
            ref={sbRef}
            onMouseDown={startDrag}
            className="cp-sb-box"
            style={{
              background: `
                linear-gradient(to top, black, transparent),
                linear-gradient(to right, white, hsl(${hue},100%,50%))
              `
            }}
          >
            <div
              className="cp-cursor"
              style={{
                left: `${saturation}%`,
                top: `${100 - brightness}%`,
              }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(e.target.value)}
            className="cp-hue-slider"
          />

          <div className="cp-hex-row">
            <label>HEX</label>
            <input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
            />
          </div>
           <button
     className="cp-screen-btn"
    onClick={async () => {
      if (!window.EyeDropper)
        return alert("Not supported");

      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setHex(result.sRGBHex);
    }}
  >
    Pick from screen
  </button>

          
        </div>
        {/* ============================================================= */}

        {/* RIGHT PANEL (UNCHANGED) */}
        <div className="cp-right">

          <div className="cp-card" style={{ background: hex }}>
            <div>
              <h1>{hex}</h1>
              <span>{tc.toName() || "Custom Color"}</span>
            </div>
          </div>

          <div className="cp-grid">
            <Box label="HEX" value={hex} copy={copy}/>
            <Box label="RGB" value={`${rgb.r}, ${rgb.g}, ${rgb.b}`} copy={copy}/>
            <Box label="HSL"
              value={`${Math.round(hsl.h*360)}, ${Math.round(hsl.s*100)}, ${Math.round(hsl.l*100)}`}
              copy={copy}
            />
            <Box label="CMYK"
              value={`${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k}`}
              copy={copy}
            />
            <Box label="XYZ"
              value={`${Math.round(xyz.x)}, ${Math.round(xyz.y)}, ${Math.round(xyz.z)}`}
              copy={copy}
            />
            <Box label="LUV"
              value={`${Math.round(luv.l)}, ${Math.round(luv.u)}, ${Math.round(luv.v)}`}
              copy={copy}
            />
            <Box label="LAB"
              value={`${Math.round(lab.l)}, ${Math.round(lab.a)}, ${Math.round(lab.b)}`}
              copy={copy}
            />
            <Box label="HWB"
              value={`${hwb.h}, ${hwb.w}, ${hwb.b}`}
              copy={copy}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= BOX ================= */

function Box({ label, value, copy }) {
  return (
    <div className="cp-box">
      <span className="cp-label">{label}</span>
      <div className="cp-value">
        <span>{value}</span>
        <button onClick={() => copy(value)}>
          <CopyIcon/>
        </button>
      </div>
    </div>
  )
}