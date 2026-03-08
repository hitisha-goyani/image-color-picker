import { useState } from "react";
import ImageTab from "./components/ImageTab";
import ColorPickerTab from "./components/ColorPickerTab";
import PaletteTab from "./components/PaletteTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="wrapper">

      {/* ===== TABS ===== */}
      <div className="tabs">
        <button
          className={activeTab === "image" ? "active" : ""}
          onClick={() => setActiveTab("image")}
        >
          Pick color from image
        </button>

        <button
          className={activeTab === "picker" ? "active" : ""}
          onClick={() => setActiveTab("picker")}
        >
          Color Picker
        </button>
              <button
      className={activeTab==="palette" ? "active":""}
      onClick={()=>setActiveTab("palette")}
      >
      Color Palette
      </button>
      </div>

      {/* ===== TAB CONTENT ===== */}
      {activeTab === "image" && <ImageTab />}
      {activeTab === "picker" && <ColorPickerTab />}
      {activeTab === "palette" && <PaletteTab />}
   

    </div>
  );
}