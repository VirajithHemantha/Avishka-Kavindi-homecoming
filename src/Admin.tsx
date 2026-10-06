import React, { useState } from 'react';
import { Check, Link as LinkIcon, MessageSquare, Wand2 } from 'lucide-react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const baseUrl = window.location.origin;
  
  const getDisplayName = () => {
    const trimmedName = guestName.trim();
    if (!trimmedName) return '';
    
    if (prefix === 'Dear') {
      return trimmedName;
    }
    if (prefix === 'Family') {
      return `${trimmedName} and Family`;
    }
    return `${prefix} ${trimmedName}`;
  };

  const displayName = getDisplayName();

  const generatedLink = guestName.trim()
    ? `${baseUrl}/${encodeURIComponent(guestName.trim().toLowerCase())}?prefix=${encodeURIComponent(prefix)}`
    : '';

  const messageTemplate = `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our homecoming invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Avishka & Kavindi`;

  const handleGenerate = () => {
    if (guestName.trim()) {
      setGenerated(true);
    }
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessage = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(messageTemplate);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  return (
    <div className="h-[100dvh] overflow-y-auto w-full bg-[#FDF8F5] p-6 md:p-12 font-sans text-[#3E2723]">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#996515]/20">
        <h1 className="text-4xl text-center font-playball text-[#996515] mb-2">Homecoming Invitation</h1>
        <h2 className="text-xl text-center font-cinzel text-[#3E2723] mb-10 tracking-widest font-bold">Link Generator</h2>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#5C3A21] uppercase tracking-wider">Prefix</label>
              <select 
                value={prefix}
                onChange={(e) => { setPrefix(e.target.value); setGenerated(false); }}
                className="w-full p-4 rounded-xl border border-[#C0C0C0] focus:outline-none focus:border-[#996515] bg-[#FDF8F5] text-[#333333] font-medium transition-colors"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-bold text-[#5C3A21] uppercase tracking-wider">Guest Name</label>
              <input 
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => { setGuestName(e.target.value); setGenerated(false); }}
                className="w-full p-4 rounded-xl border border-[#C0C0C0] focus:outline-none focus:border-[#996515] bg-[#FDF8F5] text-[#333333] font-medium transition-colors"
                onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleGenerate}
              disabled={!guestName.trim()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#996515] text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-[#7a5111] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className="w-5 h-5" />
              Generate Link
            </button>
          </div>

          {generated && (
            <div className="pt-6 border-t border-[#996515]/20 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#5C3A21] uppercase tracking-wider">Generated Link</h3>
                <div className="bg-[#FDF8F5] p-4 rounded-xl border border-[#996515]/30 text-[#996515] font-medium break-all">
                  {generatedLink}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#5C3A21] uppercase tracking-wider">Message Preview</h3>
                <div className="bg-[#FDF8F5] p-6 rounded-2xl border border-[#C0C0C0] whitespace-pre-wrap font-sans text-sm md:text-base text-[#333333] leading-relaxed">
                  {messageTemplate}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                <button 
                  onClick={copyLink}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[#996515] text-[#996515] font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-[#996515] hover:text-white transition-all"
                >
                  {copiedLink ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  {copiedLink ? 'Link Copied!' : 'Copy Link Only'}
                </button>
                <button 
                  onClick={copyMessage}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-[#996515] text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-[#7a5111] transition-all shadow-lg"
                >
                  {copiedMsg ? <Check className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                  {copiedMsg ? 'Message Copied!' : 'Copy Full Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

