import { useState } from "react";

const palettes = [
{
category:"furniture",
colors:["#81A6C6","#94AFBE","#D9CBB8","#C1B29F"]
},
{
category:"food",
colors:["#D8D5C4","#6FB7C0","#DA4442","#3E054F"]
},
{
category:"banking",
colors:["#2B0FA6","#9B007A","#E3185B","#F4792B"]
},
{
category:"real estate",
colors:["#D0D0D0","#8A3A50","#66304F","#2D2C2C"]
},
{
category:"fashion",
colors:["#FF5656","#F98755","#F4A75A","#F0C95A"]
},
{
category:"clothes",
colors:["#D36562","#D8D2D2","#6C7F43","#4F612B"]
}
];

export default function PaletteTab(){

const [search,setSearch] = useState("");
const [selectedPalette,setSelectedPalette] = useState(null);

const filtered = palettes.filter(p =>
p.category.toLowerCase().includes(search.toLowerCase())
);

/* DOWNLOAD PALETTE */

const downloadPalette = (colors)=>{

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 200;

const ctx = canvas.getContext("2d");

colors.forEach((color,i)=>{

ctx.fillStyle = color;
ctx.fillRect(i*200,0,200,200);

});

const link = document.createElement("a");
link.download="palette.png";
link.href = canvas.toDataURL();
link.click();

};


/* ========================= */
/* PALETTE DETAIL PAGE */
/* ========================= */

if(selectedPalette){

return(

<div className="palette-detail">

<button
onClick={()=>setSelectedPalette(null)}
className="back-btn"
>
← Back
</button>

<h2>{selectedPalette.category} Palette</h2>

<div className="detail-colors">

{selectedPalette.colors.map((color,i)=>(

<div
key={i}
className="detail-color"
style={{background:color}}
>
<span>{color}</span>
</div>

))}

</div>

<button
onClick={()=>downloadPalette(selectedPalette.colors)}
className="download-btn"
>
Download Palette
</button>

</div>

);

}


/* ========================= */
/* PALETTE GRID PAGE */
/* ========================= */

return(

<div className="palette-page">

{/* SEARCH */}

<div className="palette-search">
<input
type="text"
placeholder="Search palettes..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>

{/* GRID */}

<div className="palette-grid">

{filtered.map((palette,i)=>(

<div
key={i}
className="palette-card"
onClick={()=>setSelectedPalette(palette)}
>

<div className="palette-colors">

{palette.colors.map((c,index)=>(

<div
key={index}
className="palette-color"
style={{background:c}}
></div>

))}

</div>

</div>

))}

</div>

</div>

);

}