import { useEffect, useState } from "react";

interface SignalPopupProps {
  eventUrl: string;
}

export const SignalPopup = ({ eventUrl }: SignalPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("signal-iii-popup-seen");
    if (!hasSeenPopup) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("signal-iii-popup-seen", "true");
  };

  const handleSignup = () => {
    localStorage.setItem("signal-iii-popup-seen", "true");
    window.open(eventUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-2xl pointer-events-auto animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close popup"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Card with sunset background */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src="/signal-iii/cover.png"
                alt="SIGNAL Sunset"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
            </div>

            {/* Content */}
            <div className="relative p-12 text-center">
              {/* SIGNAL text */}
              <h2
                className="text-6xl md:text-7xl font-serif italic tracking-tight text-white mb-3"
                style={{
                  fontFamily: "Georgia, serif",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                SIGNAL
              </h2>

              {/* AI MEETUP */}
              <div
                className="text-lg md:text-xl uppercase tracking-[0.3em] text-white/90 mb-8"
                style={{
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  fontFamily: "Georgia, serif",
                }}
              >
                AI MEETUP
              </div>

              {/* CTA Button */}
              <button
                onClick={handleSignup}
                className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
