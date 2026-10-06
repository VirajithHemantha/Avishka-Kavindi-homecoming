const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The start of Venue Location Section
const venueStart = `            {/* Venue Location Section */}
            <section className="relative py-28 md:py-48 bg-gradient-to-b from-[#111111] to-[#1A1A1A] overflow-hidden">`;

const venueStartReplacement = `            {/* Common Scrolling Background Wrapper */}
            <div className="relative w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/ChatGPT Image Jul 25, 2026, 01_55_27 AM.png")' }}>
              <div className="absolute inset-0 bg-[#0A0A0A]/85 pointer-events-none" />
              
            {/* Venue Location Section */}
            <section className="relative py-28 md:py-48 overflow-hidden">`;

// Remove the individual background images from all sections
const bgImagePattern = `<div className="absolute inset-0 bg-\\[length:100%_100%\\] md:bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: 'url\\("/ChatGPT Image Jul 25, 2026, 01_55_27 AM.png"\\)' }} />`;

// Replace Venue Start
content = content.replace(venueStart, venueStartReplacement);

// Remove bg images
content = content.split(bgImagePattern).join('');

// Make RSVP Section transparent
const rsvpStart = `<section className="relative py-20 md:py-32 bg-[#1A1A1A] flex flex-col items-center overflow-hidden w-full">`;
const rsvpStartReplacement = `<section className="relative py-20 md:py-32 flex flex-col items-center overflow-hidden w-full">`;
content = content.replace(rsvpStart, rsvpStartReplacement);

// Make Wishing Section transparent
const wishingStart = `<section className="relative py-20 md:py-32 bg-[#111111] flex flex-col items-center overflow-hidden w-full">`;
const wishingStartReplacement = `<section className="relative py-20 md:py-32 flex flex-col items-center overflow-hidden w-full">`;
content = content.replace(wishingStart, wishingStartReplacement);

// Make Closing Section transparent
const closingStart = `<section className="relative py-32 md:py-48 bg-[#1A1A1A] overflow-hidden flex flex-col items-center w-full">`;
const closingStartReplacement = `<section className="relative py-32 md:py-48 overflow-hidden flex flex-col items-center w-full">`;
content = content.replace(closingStart, closingStartReplacement);

// Add closing div for the common wrapper right before </motion.div> which ends the website-stage
const endingTags = `            </section>
          </motion.div>
        )}
      </AnimatePresence>`;
const endingTagsReplacement = `            </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>`;
content = content.replace(endingTags, endingTagsReplacement);

fs.writeFileSync('src/App.tsx', content);
console.log('Background updated.');
