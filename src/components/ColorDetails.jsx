export default function ColorDetails({
  color,
  rgb,
  hsl,
  fileInputRef,
  handleUpload,
  handlePickFromScreen
}) {

  const hslText =
    hsl && hsl.h !== undefined
      ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      : "";

  const copy = (value) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="details-panel">

      {/* ===== COLOR PREVIEW ===== */}
      <div
        className="preview-square"
        style={{ background: color }}
      />

      {/* ===== HEX ===== */}
      <div className="info-row">
        <span>HEX</span>
        <div className="value-group">
          <span>{color}</span>
          <button
            className="modern-btn"
            onClick={() => copy(color)}
          >
            {/* Copy Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4
                       a2 2 0 0 1 2-2h9
                       a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ===== RGB ===== */}
      <div className="info-row">
        <span>RGB</span>
        <div className="value-group">
          <span>{rgb}</span>
          <button
            className="modern-btn"
            onClick={() => copy(rgb)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4
                       a2 2 0 0 1 2-2h9
                       a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ===== HSL ===== */}
      <div className="info-row">
        <span>HSL</span>
        <div className="value-group">
          <span>{hslText}</span>
          <button
            className="modern-btn"
            onClick={() => copy(hslText)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4
                       a2 2 0 0 1 2-2h9
                       a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ===== UPLOAD SECTION ===== */}
      <div className="upload-card">

        <p className="upload-title">Use your own image</p>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          style={{ display: "none" }}
        />

        {/* Upload Button */}
        <button
          className="primary-upload"
          onClick={() => fileInputRef?.current?.click()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5
                     a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span style={{ marginLeft: 8 }}>
            Use your image
          </span>
        </button>

        {/* EyeDropper Button */}
        <button
          className="secondary-upload"
          onClick={handlePickFromScreen}
        >
          <svg width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 11l-8 8-4-4 8-8
                     a2.828 2.828 0 1 1 4 4z"/>
          </svg>
          <span style={{ marginLeft: 8 }}>
            Pick from Screen
          </span>
        </button>

        {/* Privacy Text */}
        <p className="privacy-text">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            style={{ marginRight: 5 }}>
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          We think data protection is important!
          <b> No data is sent.</b> The magic happens in your browser.
        </p>

      </div>

    </div>
  );
}