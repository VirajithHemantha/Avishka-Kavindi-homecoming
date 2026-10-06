const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Colors to replace
const colorMap = {
  '#3E2723': '#FFFFFF', // Text that was very dark brown -> White
  '#5C3A21': '#D4AF37', // Medium brown -> Gold
  '#8C6D53': '#D4AF37', // Lighter brown -> Gold
  '#996515': '#D4AF37', // Brownish gold -> Gold
  '#FDF8F5': '#0A0A0A', // Off-white bg -> Black
  '#FDFBF7': '#111111', // Off-white bg -> slightly lighter black
  '#FFFFF0': '#1A1A1A', // Off-white bg -> dark grey/black
  '#FFCBA4': '#8B0000', // Peach -> Red
  '#D4AF37': '#D4AF37', // Gold stays Gold
  '#333333': '#E0E0E0', // Dark grey text -> Light grey
  '#C0C0C0': '#333333', // Silver border -> Dark border
};

for (const [oldColor, newColor] of Object.entries(colorMap)) {
  const regex = new RegExp(oldColor, 'gi');
  content = content.replace(regex, newColor);
}

// Background adjustments
content = content.replace(/bg-\\[#f4f0ff\\]/gi, 'bg-[#000000]');

fs.writeFileSync('src/App.tsx', content);
console.log('Colors updated.');
