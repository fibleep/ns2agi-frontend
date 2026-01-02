export const EVENT_ROUTES: Record<string, string> = {
    "signal-i": "/events/signal-i",
    "signal-ii": "/events/signal-ii",
    "signal-iii": "https://etoile.events/events/ebffd051-6e3b-41e7-937f-6b5a68524cf0",
    "ai-hackathon-i": "/events/ai-hackathon-i",
    "ai-hackathon-ii": "/events/ai-hackathon-ii",
    "ai-hackathon-iii": "/events/ai-hackathon-iii",
    "robotics-hackathon-i": "/events/robotics-hackathon-i",
    "kids-ai-vibecoding-hackathon": "/events/kids-ai-vibecoding-hackathon",
    "future-in-bloom-pt1": "/blog/future-in-bloom",
    "tectonic": "https://tectonicconf.eu",
    "cassini-hackathon": "https://www.cassini.eu/hackathons",
    "belgium-nlp-meetup-27": "https://www.meetup.com/belgium-nlp-meetup/",
    "stripe-hackathon": "https://lu.ma/agenticpayments",
    "robotics-for-good-belgium-2026": "/kids/robotics-for-good",
};

export const getEventLink = (eventId: string, fallbackLink?: string): string => {
    return EVENT_ROUTES[eventId] || fallbackLink || "/";
};
