import { useState } from 'react';

interface Logo {
  src: string;
  alt: string;
  url: string;
  tier?: 'galaxy' | 'planet';
  background?: string;
}

const PartnersMarquee = () => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  const allLogos: Logo[] = [
    // Galaxy Sponsors
    { src: '/partnerships/logos/brucon.png', alt: 'Brucon', url: 'https://www.brucon.org/', tier: 'galaxy', background: '/partnerships/icons/galaxy.png' },
    { src: '/partnerships/logos/autodiscovery.png', alt: 'Autodiscovery', url: 'https://autodiscovery.eu/', tier: 'galaxy', background: '/partnerships/icons/galaxy.png' },

    // Planet Sponsors
    { src: '/partnerships/logos/tysonrobotics.png', alt: 'Tyson Robotics', url: 'https://tysonrobotics.com/Landing', tier: 'planet', background: '/partnerships/icons/planet.png' },

    // Community & Partners
    { src: '/partnerships/workedwith/Hugging_Face.png', alt: 'Hugging Face', url: 'https://huggingface.co/' },
    { src: '/partnerships/workedwith/EU_AI_Office.png', alt: 'European AI Office', url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office' },
    { src: '/partnerships/workedwith/imaginelab_logo.png', alt: 'iMagineLab', url: 'https://imaginelab.club/' },
    { src: '/partnerships/workedwith/nerldab.png', alt: 'Nerdlab', url: 'https://nerdlab.be/' },
    { src: '/partnerships/workedwith/kdg.png', alt: 'Karel de Grote Hogeschool', url: 'https://www.kdg.be/' },
    { src: '/partnerships/workedwith/AP Hogeschool Logo.png', alt: 'AP Hogeschool', url: 'https://www.ap.be/' },
    { src: '/partnerships/workedwith/dwengo-Photoroom.png', alt: 'Dwengo', url: 'https://www.dwengo.org/' },
    { src: '/partnerships/workedwith/brubotics.png', alt: 'Brubotics', url: 'https://brubotics.eu/' },
    { src: '/partnerships/workedwith/wintercircus.png', alt: 'Wintercircus', url: 'https://www.wintercircus.be/' },
    { src: '/partnerships/workedwith/Grand_Poste_Logo_Thumbnai.png', alt: 'Grand Poste', url: 'https://www.lagrandposte.be/' },
    { src: '/partnerships/workedwith/AI_for_good.png', alt: 'AI for Good', url: 'https://aiforgood.itu.int/' },
    { src: '/partnerships/workedwith/the_beacon.png', alt: 'The Beacon', url: 'https://thebeacon.eu/' },
    { src: '/partnerships/workedwith/CHB Sticker for Print.png', alt: 'Commons Hub Brussels', url: 'https://commonshub.brussels/' },
    { src: '/partnerships/workedwith/lovable_logo.svg', alt: 'Lovable', url: 'https://lovable.dev/' },
    { src: '/partnerships/workedwith/WeSTEM Logo Transparent.png', alt: 'WeSTEM', url: 'https://www.westem.eu/' },
    { src: '/partnerships/workedwith/Odoo Experience Logo.png', alt: 'Odoo Experience', url: 'https://www.odoo.com/odoo-experience' },
    { src: '/partnerships/workedwith/stad_antwerp.png', alt: 'City of Antwerp', url: 'https://www.antwerpen.be/' },
    { src: '/partnerships/workedwith/campus_19_logo.png', alt: 'Campus 19 (42) Belgium', url: 'https://campus19.be/' },
    { src: '/partnerships/workedwith/LeRobot Image.png', alt: 'LeRobot', url: 'https://huggingface.co/lerobot' },
    { src: '/partnerships/workedwith/tectonic.svg', alt: 'Tectonic Conf', url: 'https://tectonicconf.com/' },
    { src: '/partnerships/workedwith/young_engineers.png', alt: 'Young Engineers Liège', url: 'https://liegeville.youngengineers.org/' },
    { src: '/partnerships/workedwith/e6k-Photoroom.png', alt: 'E6K Kortrijk', url: 'https://www.e6k.be/' },
    { src: '/partnerships/workedwith/wat_white.png', alt: 'WAT', url: 'https://www.wat.com/' },
    { src: '/partnerships/workedwith/UCLL_twa.png', alt: 'UCLL Techniek- en WetenschapsAcademie (TWA)', url: 'https://www.techniekenwetenschapsacademie.be/' },
    { src: '/partnerships/workedwith/Stripe_wordmark_White.svg', alt: 'Stripe', url: 'https://stripe.com/en-be' },
    { src: '/partnerships/workedwith/de_creative_stem.png', alt: 'Creative STEM', url: 'https://decreatievestem.be' },
    { src: '/partnerships/workedwith/port-of-antwerp-bruges-no-bg.png', alt: 'Port of Antwerp-Bruges', url: 'https://www.portofantwerpbruges.com/en' }
  ];

  // Duplicate logos for seamless loop
  const getLoopedLogos = (logos: Logo[]) => {
    const repeatCount = Math.max(6, Math.ceil(12 / logos.length));
    return Array(repeatCount).fill(logos).flat();
  };

  // Split logos into two rows
  const midpoint = Math.ceil(allLogos.length / 2);
  const row1Logos = allLogos.slice(0, midpoint);
  const row2Logos = allLogos.slice(midpoint);

  const loopedRow1 = getLoopedLogos(row1Logos);
  const loopedRow2 = getLoopedLogos(row2Logos);

  return (
    <section className="py-12 bg-black overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl mb-8">
        <div className="text-center">
          <p className="text-sm md:text-base font-semibold text-white/60 uppercase tracking-wider mb-4">
            Supported By
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Sponsors & Friends
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {/* First Row - Left to Right */}
        <div className="relative overflow-hidden py-4">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Logos */}
          <div className="flex">
            <div
              className="flex gap-12 animate-marquee"
              style={{
                animationDuration: '80s',
                animationTimingFunction: 'linear',
                animationPlayState: hoveredLogo ? 'paused' : 'running'
              }}
            >
              {loopedRow1.map((logo, index) => {
                const width = logo.tier === 'galaxy' ? 'w-52' : logo.tier === 'planet' ? 'w-40' : 'w-32';
                const height = logo.tier === 'galaxy' ? 'h-28' : logo.tier === 'planet' ? 'h-20' : 'h-16';
                const isHovered = hoveredLogo === `row1-${index}`;
                const logoMaxSize = logo.tier === 'galaxy' ? 'max-w-24 max-h-16' : logo.tier === 'planet' ? 'max-w-20 max-h-12' : 'max-w-full max-h-full';

                return (
                  <a
                    key={index}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    onMouseEnter={() => setHoveredLogo(`row1-${index}`)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <div className={`relative ${width} ${height} flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300`}>
                      {logo.background && (
                        <>
                          <div className="absolute inset-0">
                            <img
                              src={logo.background}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 transition-all duration-300 ${
                                logo.tier === 'galaxy'
                                  ? (isHovered ? 'bg-blue-600/60' : 'bg-blue-600/30')
                                  : (isHovered ? 'bg-amber-600/60' : 'bg-amber-600/30')
                              }`}
                            />
                          </div>
                        </>
                      )}
                      <div className={`relative z-10 ${logo.tier === 'galaxy' ? 'p-8' : logo.tier === 'planet' ? 'p-6' : 'p-2'}`}>
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`${logoMaxSize} object-contain transition-all duration-500 ${
                            logo.tier ? 'grayscale-0 opacity-100 drop-shadow-lg' :
                            hoveredLogo === `row1-${index}`
                              ? 'grayscale-0 opacity-100 scale-110'
                              : 'grayscale opacity-60'
                          }`}
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Duplicate for seamless loop */}
            <div
              className="flex gap-12 animate-marquee"
              style={{
                animationDuration: '80s',
                animationTimingFunction: 'linear',
                animationPlayState: hoveredLogo ? 'paused' : 'running'
              }}
              aria-hidden="true"
            >
              {loopedRow1.map((logo, index) => {
                const width = logo.tier === 'galaxy' ? 'w-52' : logo.tier === 'planet' ? 'w-40' : 'w-32';
                const height = logo.tier === 'galaxy' ? 'h-28' : logo.tier === 'planet' ? 'h-20' : 'h-16';
                const isHovered = hoveredLogo === `row1-dup-${index}`;
                const logoMaxSize = logo.tier === 'galaxy' ? 'max-w-24 max-h-16' : logo.tier === 'planet' ? 'max-w-20 max-h-12' : 'max-w-full max-h-full';

                return (
                  <a
                    key={`duplicate-${index}`}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    onMouseEnter={() => setHoveredLogo(`row1-dup-${index}`)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <div className={`relative ${width} ${height} flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300`}>
                      {logo.background && (
                        <>
                          <div className="absolute inset-0">
                            <img
                              src={logo.background}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 transition-all duration-300 ${
                                logo.tier === 'galaxy'
                                  ? (isHovered ? 'bg-blue-600/60' : 'bg-blue-600/30')
                                  : (isHovered ? 'bg-amber-600/60' : 'bg-amber-600/30')
                              }`}
                            />
                          </div>
                        </>
                      )}
                      <div className={`relative z-10 ${logo.tier === 'galaxy' ? 'p-8' : logo.tier === 'planet' ? 'p-6' : 'p-2'}`}>
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`${logoMaxSize} object-contain transition-all duration-500 ${
                            logo.tier ? 'grayscale-0 opacity-100 drop-shadow-lg' :
                            hoveredLogo === `row1-dup-${index}`
                              ? 'grayscale-0 opacity-100 scale-110'
                              : 'grayscale opacity-60'
                          }`}
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative overflow-hidden py-4">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Logos */}
          <div className="flex">
            <div
              className="flex gap-12 animate-marquee-reverse"
              style={{
                animationDuration: '80s',
                animationTimingFunction: 'linear',
                animationPlayState: hoveredLogo ? 'paused' : 'running'
              }}
            >
              {loopedRow2.map((logo, index) => {
                const width = logo.tier === 'galaxy' ? 'w-52' : logo.tier === 'planet' ? 'w-40' : 'w-32';
                const height = logo.tier === 'galaxy' ? 'h-28' : logo.tier === 'planet' ? 'h-20' : 'h-16';
                const isHovered = hoveredLogo === `row2-${index}`;
                const logoMaxSize = logo.tier === 'galaxy' ? 'max-w-24 max-h-16' : logo.tier === 'planet' ? 'max-w-20 max-h-12' : 'max-w-full max-h-full';

                return (
                  <a
                    key={index}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    onMouseEnter={() => setHoveredLogo(`row2-${index}`)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <div className={`relative ${width} ${height} flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300`}>
                      {logo.background && (
                        <>
                          <div className="absolute inset-0">
                            <img
                              src={logo.background}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 transition-all duration-300 ${
                                logo.tier === 'galaxy'
                                  ? (isHovered ? 'bg-blue-600/60' : 'bg-blue-600/30')
                                  : (isHovered ? 'bg-amber-600/60' : 'bg-amber-600/30')
                              }`}
                            />
                          </div>
                        </>
                      )}
                      <div className={`relative z-10 ${logo.tier === 'galaxy' ? 'p-8' : logo.tier === 'planet' ? 'p-6' : 'p-2'}`}>
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`${logoMaxSize} object-contain transition-all duration-500 ${
                            logo.tier ? 'grayscale-0 opacity-100 drop-shadow-lg' :
                            hoveredLogo === `row2-${index}`
                              ? 'grayscale-0 opacity-100 scale-110'
                              : 'grayscale opacity-60'
                          }`}
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Duplicate for seamless loop */}
            <div
              className="flex gap-12 animate-marquee-reverse"
              style={{
                animationDuration: '80s',
                animationTimingFunction: 'linear',
                animationPlayState: hoveredLogo ? 'paused' : 'running'
              }}
              aria-hidden="true"
            >
              {loopedRow2.map((logo, index) => {
                const width = logo.tier === 'galaxy' ? 'w-52' : logo.tier === 'planet' ? 'w-40' : 'w-32';
                const height = logo.tier === 'galaxy' ? 'h-28' : logo.tier === 'planet' ? 'h-20' : 'h-16';
                const isHovered = hoveredLogo === `row2-dup-${index}`;
                const logoMaxSize = logo.tier === 'galaxy' ? 'max-w-24 max-h-16' : logo.tier === 'planet' ? 'max-w-20 max-h-12' : 'max-w-full max-h-full';

                return (
                  <a
                    key={`duplicate-${index}`}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    onMouseEnter={() => setHoveredLogo(`row2-dup-${index}`)}
                    onMouseLeave={() => setHoveredLogo(null)}
                  >
                    <div className={`relative ${width} ${height} flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300`}>
                      {logo.background && (
                        <>
                          <div className="absolute inset-0">
                            <img
                              src={logo.background}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 transition-all duration-300 ${
                                logo.tier === 'galaxy'
                                  ? (isHovered ? 'bg-blue-600/60' : 'bg-blue-600/30')
                                  : (isHovered ? 'bg-amber-600/60' : 'bg-amber-600/30')
                              }`}
                            />
                          </div>
                        </>
                      )}
                      <div className={`relative z-10 ${logo.tier === 'galaxy' ? 'p-8' : logo.tier === 'planet' ? 'p-6' : 'p-2'}`}>
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={`${logoMaxSize} object-contain transition-all duration-500 ${
                            logo.tier ? 'grayscale-0 opacity-100 drop-shadow-lg' :
                            hoveredLogo === `row2-dup-${index}`
                              ? 'grayscale-0 opacity-100 scale-110'
                              : 'grayscale opacity-60'
                          }`}
                        />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
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

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>

      {/* Partner With Us Section */}
      <div className="container mx-auto px-4 max-w-7xl mt-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Partner With Us
          </h3>
        </div>

        {/* Notion Embed */}
        <div className="w-full flex justify-center px-4 md:px-8">
          <iframe
            src="https://beaded-pineapple-898.notion.site/ebd/274d61b47ae280be826fcc817dd3af2c"
            className="w-full max-w-4xl h-[700px] rounded-2xl border border-white/20"
            style={{ background: 'transparent' }}
            title="Partner With Us Form"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
