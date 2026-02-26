import { useState } from 'react';

interface Logo {
  src: string;
  alt: string;
  url: string;
  tier?: 'galaxy' | 'planet';
  background?: string;
}

interface LogoItemProps {
  logo: Logo;
  rowId: string;
  index: number;
  hoveredLogo: string | null;
  setHoveredLogo: (id: string | null) => void;
}

const LogoItem = ({ logo, rowId, index, hoveredLogo, setHoveredLogo }: LogoItemProps) => {
  const id = `${rowId}-${index}`;
  const isHovered = hoveredLogo === id;

  const width = logo.tier === 'galaxy' ? 'w-52' : logo.tier === 'planet' ? 'w-40' : 'w-32';
  const height = logo.tier === 'galaxy' ? 'h-28' : logo.tier === 'planet' ? 'h-20' : 'h-16';
  const logoMaxSize = logo.tier === 'galaxy' ? 'max-w-24 max-h-16' : logo.tier === 'planet' ? 'max-w-20 max-h-12' : 'max-w-full max-h-full';
  const padding = logo.tier === 'galaxy' ? 'p-8' : logo.tier === 'planet' ? 'p-6' : 'p-2';

  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 group"
      onMouseEnter={() => setHoveredLogo(id)}
      onMouseLeave={() => setHoveredLogo(null)}
    >
      <div className={`relative ${width} ${height} flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300`}>
        {logo.background && (
          <div className="absolute inset-0">
            <img src={logo.background} alt="" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 transition-all duration-300 ${
              logo.tier === 'galaxy'
                ? (isHovered ? 'bg-blue-600/60' : 'bg-blue-600/30')
                : (isHovered ? 'bg-amber-600/60' : 'bg-amber-600/30')
            }`} />
          </div>
        )}
        <div className={`relative z-10 ${padding}`}>
          <img
            src={logo.src}
            alt={logo.alt}
            className={`${logoMaxSize} object-contain transition-all duration-500 ${
              logo.tier
                ? 'grayscale-0 opacity-100 drop-shadow-lg'
                : isHovered
                  ? 'grayscale-0 opacity-100 scale-110'
                  : 'grayscale opacity-60'
            }`}
          />
        </div>
      </div>
    </a>
  );
};

interface MarqueeRowProps {
  logos: Logo[];
  rowId: string;
  reverse?: boolean;
  hoveredLogo: string | null;
  setHoveredLogo: (id: string | null) => void;
}

const MarqueeRow = ({ logos, rowId, reverse = false, hoveredLogo, setHoveredLogo }: MarqueeRowProps) => {
  const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  const style = {
    animationDuration: '80s',
    animationTimingFunction: 'linear',
    animationPlayState: hoveredLogo ? 'paused' : 'running'
  } as const;

  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <div className={`flex gap-12 ${animationClass}`} style={style}>
          {logos.map((logo, index) => (
            <LogoItem
              key={index}
              logo={logo}
              rowId={rowId}
              index={index}
              hoveredLogo={hoveredLogo}
              setHoveredLogo={setHoveredLogo}
            />
          ))}
        </div>

        <div className={`flex gap-12 ${animationClass}`} style={style} aria-hidden="true">
          {logos.map((logo, index) => (
            <LogoItem
              key={`dup-${index}`}
              logo={logo}
              rowId={`${rowId}-dup`}
              index={index}
              hoveredLogo={hoveredLogo}
              setHoveredLogo={setHoveredLogo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnersMarquee = () => {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

  const allLogos: Logo[] = [
    // Galaxy Sponsors
    { src: '/partnerships/logos/2.png', alt: 'Brucon', url: 'https://www.brucon.org/', tier: 'galaxy', background: '/partnerships/icons/2.png' },
    { src: '/partnerships/logos/1.png', alt: 'Autodiscovery', url: 'https://autodiscovery.eu/', tier: 'galaxy', background: '/partnerships/icons/2.png' },

    // Community & Partners
    { src: '/partnerships/workedwith/6.png', alt: 'Hugging Face', url: 'https://huggingface.co/' },
    { src: '/partnerships/workedwith/4.png', alt: 'European AI Office', url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office' },
    { src: '/partnerships/workedwith/20.svg', alt: 'iMagineLab', url: 'https://imaginelab.club/' },
    { src: '/partnerships/workedwith/23.png', alt: 'Nerdlab', url: 'https://nerdlab.be/' },
    { src: '/partnerships/workedwith/21.png', alt: 'Karel de Grote Hogeschool', url: 'https://www.kdg.be/' },
    { src: '/partnerships/workedwith/2.png', alt: 'AP Hogeschool', url: 'https://www.ap.be/' },
    { src: '/partnerships/workedwith/16.png', alt: 'Dwengo', url: 'https://www.dwengo.org/' },
    { src: '/partnerships/workedwith/12.png', alt: 'Brubotics', url: 'https://brubotics.eu/' },
    { src: '/partnerships/workedwith/30.png', alt: 'Wintercircus', url: 'https://www.wintercircus.be/' },
    { src: '/partnerships/workedwith/5.png', alt: 'Grand Poste', url: 'https://www.lagrandposte.be/' },
    { src: '/partnerships/workedwith/1.png', alt: 'AI for Good', url: 'https://aiforgood.itu.int/' },
    { src: '/partnerships/workedwith/28.png', alt: 'The Beacon', url: 'https://thebeacon.eu/' },
    { src: '/partnerships/workedwith/3.png', alt: 'Commons Hub Brussels', url: 'https://commonshub.brussels/' },
    { src: '/partnerships/workedwith/22.png', alt: 'Lovable', url: 'https://lovable.dev/' },
    { src: '/partnerships/workedwith/11.webp', alt: 'WeSTEM', url: 'https://www.westem.eu/' },
    { src: '/partnerships/workedwith/8.png', alt: 'Odoo Experience', url: 'https://www.odoo.com/odoo-experience' },
    { src: '/partnerships/workedwith/26.png', alt: 'City of Antwerp', url: 'https://www.antwerpen.be/' },
    { src: '/partnerships/workedwith/13.png', alt: 'Campus 19 (42) Belgium', url: 'https://campus19.be/' },
    { src: '/partnerships/workedwith/7.png', alt: 'LeRobot', url: 'https://huggingface.co/lerobot' },
    { src: '/partnerships/workedwith/27.png', alt: 'Tectonic Conf', url: 'https://tectonicconf.com/' },
    { src: '/partnerships/workedwith/32.svg', alt: 'Young Engineers Liège', url: 'https://liegeville.youngengineers.org/' },
    { src: '/partnerships/workedwith/17.png', alt: 'E6K Kortrijk', url: 'https://www.e6k.be/' },
    { src: '/partnerships/workedwith/29.png', alt: 'WAT', url: 'https://www.wat.com/' },
    { src: '/partnerships/workedwith/10.svg', alt: 'UCLL Techniek- en WetenschapsAcademie (TWA)', url: 'https://www.techniekenwetenschapsacademie.be/' },
    { src: '/partnerships/workedwith/9.png', alt: 'Stripe', url: 'https://stripe.com/en-be' },
    { src: '/partnerships/workedwith/15.svg', alt: 'Creative STEM', url: 'https://decreatievestem.be' },
    { src: '/partnerships/workedwith/24.png', alt: 'Port of Antwerp-Bruges', url: 'https://www.portofantwerpbruges.com/en' }
  ];

  const getLoopedLogos = (logos: Logo[]) => {
    const repeatCount = Math.max(6, Math.ceil(12 / logos.length));
    return Array(repeatCount).fill(logos).flat();
  };

  const midpoint = Math.ceil(allLogos.length / 2);
  const row1Logos = getLoopedLogos(allLogos.slice(0, midpoint));
  const row2Logos = getLoopedLogos(allLogos.slice(midpoint));

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
        <MarqueeRow
          logos={row1Logos}
          rowId="row1"
          hoveredLogo={hoveredLogo}
          setHoveredLogo={setHoveredLogo}
        />
        <MarqueeRow
          logos={row2Logos}
          rowId="row2"
          reverse
          hoveredLogo={hoveredLogo}
          setHoveredLogo={setHoveredLogo}
        />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee { animation: marquee linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse linear infinite; }
      `}</style>
    </section>
  );
};

export default PartnersMarquee;
