const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the old wrapper start
const oldWrapperStart = `            {/* Common Scrolling Background Wrapper */}
            <div className="relative w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/ChatGPT Image Jul 25, 2026, 01_55_27 AM.png")' }}>
              <div className="absolute inset-0 bg-[#0A0A0A]/85 pointer-events-none" />
              
            {/* Venue Location Section */}`;
content = content.replace(oldWrapperStart, `            {/* Venue Location Section */}`);

// 2. Insert new wrapper start before Wedding Details
const weddingDetailsStart = `            {/* Wedding Details Section */}`;
const newWrapperStart = `            {/* Common Scrolling Background Wrapper */}
            <div className="relative w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/Burgundy Floral Wedding Frame.png")' }}>
              <div className="absolute inset-0 bg-[#0A0A0A]/85 pointer-events-none" />
              
            {/* Wedding Details Section */}`;
content = content.replace(weddingDetailsStart, newWrapperStart);

// 3. Remove background images from Wedding Details, Schedule, Countdown
const bgImage1 = `<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/ChatGPT Image Jul 30, 2026, 03_14_21 AM.png")' }} />`;
const bgImage2 = `<div className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none" style={{ backgroundImage: 'url("/ChatGPT Image Jul 30, 2026, 03_14_21 AM.png")' }} />`;
const bgImage3 = `<div className="absolute inset-0 bg-[length:100%_100%] md:bg-cover bg-center bg-no-repeat opacity-100" style={{ backgroundImage: 'url("/ChatGPT Image Jul 25, 2026, 01_54_22 AM.png")' }} />`;

content = content.split(bgImage1).join('');
content = content.split(bgImage2).join('');
content = content.split(bgImage3).join('');

// 4. Clean up bg colors on sections
content = content.replace(`<section id="details" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">`, '<section id="details" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">');
content = content.replace(`<section className="relative py-12 md:py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center w-full">`, '<section className="relative py-12 md:py-32 overflow-hidden flex flex-col items-center w-full">');
content = content.replace(`<section className="relative py-28 md:py-48 bg-[#1A1A1A] flex flex-col items-center overflow-hidden">`, '<section className="relative py-28 md:py-48 flex flex-col items-center overflow-hidden">');

fs.writeFileSync('src/App.tsx', content);
console.log('Background updated again.');
