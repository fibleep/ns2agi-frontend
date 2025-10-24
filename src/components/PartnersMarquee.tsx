import { useState } from 'react';

interface Logo {
  src: string;
  alt: string;
  url: string;
}

interface Tier {
  name: string;
  emoji: string;
  logos: Logo[];
  theme: {
    gradient: string;
    accentColor: string;
    speed: number;
  };
}

const PartnersMarquee = () => {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const tiers: Tier[] = [
    {
      name: 'Galaxy Sponsors',
      emoji: '🌌',
      logos: [
        {
          src: '/partnerships/logos/brucon.png',
          alt: 'Brucon',
          url: 'https://www.brucon.org/'
        },
        {
          src: '/partnerships/logos/autodiscovery.png',
          alt: 'Autodiscovery',
          url: 'https://autodiscovery.eu/'
        }
      ],
      theme: {
        gradient: 'from-blue-900/40 via-blue-800/30 to-blue-900/40',
        accentColor: 'blue-400',
        speed: 60
      }
    },
    {
      name: 'Planet Sponsors',
      emoji: '🪐',
      logos: [
        {
          src: '/partnerships/logos/tysonrobotics.png',
          alt: 'Tyson Robotics',
          url: 'https://tysonrobotics.com/Landing'
        }
      ],
      theme: {
        gradient: 'from-orange-900/40 via-orange-800/30 to-orange-900/40',
        accentColor: 'orange-400',
        speed: 60
      }
    }
  ];

  // Duplicate logos for seamless loop
  const getLoopedLogos = (logos: Logo[]) => {
    const repeatCount = Math.max(6, Math.ceil(12 / logos.length));
    return Array(repeatCount).fill(logos).flat();
  };

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Partners & Community
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"></div>
        </div>
      </div>

      <div className="space-y-8">
        {tiers.map((tier, tierIndex) => {
          const loopedLogos = getLoopedLogos(tier.logos);
          const isPaused = hoveredTier === tierIndex;

          return (
            <div key={tierIndex} className="relative">
              {/* Tier Label */}
              <div className="text-center mb-4">
                <span className={`inline-flex items-center gap-2 text-sm font-semibold text-${tier.theme.accentColor} px-4 py-2 rounded-full bg-white/5 border border-white/10`}>
                  <span>{tier.emoji}</span>
                  <span>{tier.name}</span>
                  <span>{tier.emoji}</span>
                </span>
              </div>

              {/* Marquee Container */}
              <div
                className={`relative overflow-hidden bg-gradient-to-r ${tier.theme.gradient} py-8 border-y border-white/10`}
                onMouseEnter={() => setHoveredTier(tierIndex)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {/* Gradient Overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling Logos */}
                <div className="flex">
                  <div
                    className={`flex gap-16 ${isPaused ? '' : 'animate-marquee'}`}
                    style={{
                      animationDuration: isPaused ? 'none' : `${tier.theme.speed}s`,
                    }}
                  >
                    {loopedLogos.map((logo, index) => (
                      <a
                        key={index}
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 group"
                      >
                        <div className="relative w-40 h-24 flex items-center justify-center p-4 rounded-lg bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/10">
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Duplicate for seamless loop */}
                  <div
                    className={`flex gap-16 ${isPaused ? '' : 'animate-marquee'}`}
                    style={{
                      animationDuration: isPaused ? 'none' : `${tier.theme.speed}s`,
                    }}
                    aria-hidden="true"
                  >
                    {loopedLogos.map((logo, index) => (
                      <a
                        key={`duplicate-${index}`}
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 group"
                      >
                        <div className="relative w-40 h-24 flex items-center justify-center p-4 rounded-lg bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/10">
                          <img
                            src={logo.src}
                            alt={logo.alt}
                            className="max-w-full max-h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee linear infinite;
        }

        /* Grayscale-to-color on hover for logos */
        .group > div > img {
          filter: grayscale(100%) saturate(0%) brightness(0.85);
          transition: filter 300ms ease, opacity 300ms ease, transform 300ms ease;
        }
        .group:hover > div > img {
          filter: grayscale(0%) saturate(100%) brightness(1);
        }
      `}</style>
    </section>
  );
};

export default PartnersMarquee;
