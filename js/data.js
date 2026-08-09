/* ============================================================
   PORTFOLIO DATA
   ------------------------------------------------------------
   Everything on the site is generated from this file. To add a
   new game or course, copy an existing block below, edit it,
   and save — no other file needs to change.

   GAME FIELDS
   ------------------------------------------------------------
   id            unique slug, no spaces                 (required)
   title         game name                              (required)
   tagline       one short line under the title          (optional)
   description   a few sentences, plain text             (required)
   tags          array of strings, tools/skills used      (required)
   status        "live" | "prototype"                    (required)
                   "live"      -> published, has a play link/embed
                   "prototype" -> unpublished, show video/photos/notes only
   orientation   "landscape" | "portrait"                 (required)
                   controls the thumbnail/embed shape
   image         path to a thumbnail image                (optional)
                   leave "" to show a placeholder slate with the title
   playUrl       link to the live game                    (optional)
                   used for "Open in new tab" and as the fallback
                   when a site is playable but can't be embedded
   embedUrl      URL that can load inside an <iframe>      (optional)
                   if set, adds an inline "Play here" option
                   (must allow embedding — itch.io, your own host, etc.
                   won't work for sites that send X-Frame-Options: DENY)
   youtubeId     YouTube video ID for a preview            (optional)
                   e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ
   images        array of screenshot paths                 (optional)
                   shown in a simple gallery modal, handy for
                   unpublished games you only have photos of
   year          e.g. "2024"                               (optional)
   client        who it was built for                      (optional)
   ============================================================ */

const PROFILE = {
  name: "Fahad Asghar",
  role: "HTML5 & Phaser Game Developer",
  tagline:
    "I build games that run in the browser — Phaser and HTML5 first, Unity when a project needs a native build. Web3 and AI aren't separate specialties, they're features I wire into the games themselves when a client needs them.",
  bio:
    "I've spent the last 8+ years shipping games for clients — mostly HTML5 and Phaser titles that need to run instantly in a browser, plus Unity when a project needs a native or mobile build. A lot of that work has involved wiring in Web3 mechanics (on-chain betting, token rewards, NFT cosmetics) or AI-assisted features — not as a separate specialty, just part of building whatever the game needs. I take rough concepts and turn them into something people can actually play.",
  location: "Sahiwal, Punjab, Pakistan",
  email: "your-email@example.com",
  avatar: "", // path to a photo, e.g. "assets/profile/me.jpg" — leave blank for initials mark
  stats: [
    { label: "Games shipped", value: "20+" },
    { label: "Years building", value: "8+" },
    { label: "Job success", value: "100%" }
  ],
  skills: [
    "Phaser",
    "HTML5 Canvas",
    "JavaScript",
    "PixiJS",
    "Game Design",
    "Unity",
    "C#",
    "Multiplayer",
    "Web3 Integration",
    "AI-assisted Gameplay"
  ],
  links: [
    { label: "Upwork", url: "https://www.upwork.com/freelancers/~016225b0cd1e76e4a5" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mfahadasghar/" },
    { label: "GitHub", url: "https://github.com/" },
    { label: "Email", url: "mailto:your-email@example.com" }
  ]
};

const GAMES = [
  {
    id: "red-light-green-light",
    title: "Red Light Green Light",
    tagline: "Squid Game-style crypto betting race",
    description:
      "A crypto-betting take on the doll game from Squid Game. Players place bets and race to the finish line without getting caught during the 'red light' phase. Built the full game loop, timing/detection mechanics, and betting logic.",
    tags: ["Phaser", "HTML5", "Web3 Betting Logic"],
    status: "live",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2024",
    client: "Subrays Technologies"
  },
  {
    id: "air-hockey-cep",
    title: "Air Hockey [CEP Edition]",
    tagline: "Blockchain-powered air hockey with NFT skins",
    description:
      "A crypto-token twist on classic air hockey. Players bet tokens, compete head-to-head, and win rewards. Includes NFT-based cosmetics for paddles and other in-game assets.",
    tags: ["Phaser", "HTML5", "Web3 / NFTs"],
    status: "live",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2024",
    client: "Subrays Technologies"
  },
  {
    id: "isometric-dice-board-game",
    title: "Isometric Dice Board Game — MVP",
    tagline: "Built from scratch, multiplayer-ready",
    description:
      "A full isometric, dice-based board game MVP built from the ground up for a client — board logic, dice mechanics, turn structure, and an architecture ready to plug in multiplayer.",
    tags: ["Phaser", "HTML5", "Multiplayer"],
    status: "live",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "Upwork client"
  },
  {
    id: "fruit-slot",
    title: "Fruit Slot",
    tagline: "Classic fruit-themed slot machine",
    description:
      "An HTML5 slot machine with reel spin mechanics, win-line evaluation, and animated payouts — built mobile-first in Phaser.",
    tags: ["Phaser", "HTML5", "Slots / Casino"],
    status: "live",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "Upwork client"
  },
  {
    id: "casino-slot-frontend",
    title: "Casino Slot Games — Front End",
    tagline: "Responsive UI for a slots platform",
    description:
      "Front-end builds for casino slot games: reel animations, paytables, and a fully responsive, mobile-first layout for a real-money gaming platform.",
    tags: ["Phaser", "HTML5", "UI / Casino"],
    status: "live",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "Upwork client"
  },
  {
    id: "ar-mobile-prototype",
    title: "AR Mobile Prototype",
    tagline: "Unity + real-time camera tracking",
    description:
      "An exploratory mobile AR prototype combining Unity 3D, real-time camera input, and lightweight computer-vision object tracking. Unpublished — built to test the concept.",
    tags: ["Unity", "C#", "AR / Computer Vision"],
    status: "prototype",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2026",
    client: ""
  },
  {
    id: "plato-card-game",
    title: "Plato — Blockchain Card Game",
    tagline: "On-chain card game prototype",
    description:
      "A card game concept with on-chain betting and ownership mechanics. Currently unpublished — add a video walkthrough or screenshots below when ready.",
    tags: ["Phaser", "HTML5", "Web3"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "",
    client: ""
  },
  {
    id: "traffic-coins",
    title: "Traffic Coins",
    tagline: "Arcade traffic game with a rewards loop",
    description:
      "A traffic-management arcade prototype tied to a crypto rewards loop. Currently unpublished — add a video walkthrough or screenshots below when ready.",
    tags: ["Phaser", "HTML5", "Web3"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "",
    client: ""
  }
];

/* COURSE FIELDS
   title, provider, date ("Jul 2026"), url (credential link, optional) */
const COURSES = [
  {
    title: "The Psychology of Games — Secrets of Good Game Design",
    provider: "Udemy",
    date: "Jul 2026",
    url: ""
  }
  // Add the rest of your courses here, same shape as above.
];
