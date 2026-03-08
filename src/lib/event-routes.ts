export const EVENT_ROUTES: Record<string, string> = {
    "signal-i": "/events/signal-i",
    "signal-ii": "/events/signal-ii",
    "signal-iii": "/events/signal-iii",
    "ai-hackathon-i": "/events/ai-hackathon-i",
    "ai-hackathon-ii": "/events/ai-hackathon-ii",
    "ai-hackathon-iii": "/events/ai-hackathon-iii",
    "robotics-hackathon-i": "/events/robotics-hackathon-i",
    "kids-ai-vibecoding-hackathon": "/events/kids-ai-vibecoding-hackathon",
    "future-in-bloom-pt1": "/events/future-in-bloom-pt1",
    "tectonic": "/events/tectonic",
    "brucon": "/events/brucon",
    "belgium-nlp-meetup-27": "/events/belgium-nlp-meetup-27",
    "stripe-hackathon": "/events/stripe-hackathon",
    "get-sip-done-antwerp": "/events/get-sip-done-antwerp",
    "elevenlabs-hackathon-ghent": "/events/elevenlabs-hackathon-ghent",
    "ap-robotics-workshop": "/events/ap-robotics-workshop",
    "openclaw-meetup": "/events/openclaw-deep-dive",
    "ai-community-journal-club-001": "/events/ai-community-journal-club-001",
};

export const getEventLink = (eventId: string, fallbackLink?: string): string => {
    return EVENT_ROUTES[eventId] || fallbackLink || "/";
};
