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
                   "live"      -> has a real play link (store/site)
                   "prototype" -> no live link — shows a video/photo
                                   preview instead
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
                   shown as "Watch preview" — works for both live and
                   prototype cards when there's no play link yet
   images        array of screenshot paths                 (optional)
                   shown in a simple gallery modal, handy for
                   games you only have photos of
   year          e.g. "2024"                               (optional)
   client        who it was built for                      (optional)
   ============================================================ */

const PROFILE = {
  name: "Fahad Asghar",
  role: "HTML5 & Phaser Game Developer",
  tagline:
    "I build games that run in the browser — Phaser and HTML5 first, Unity when a project needs a native build. Web3 and AI aren't separate specialties, they're features I wire into the games themselves when a client needs them.",
  bio:
    "I build web games — Phaser, HTML5, JavaScript, Unity, whatever the project needs to get from idea to something people can actually play. I've spent the last several years shipping games for clients, taking rough concepts and turning them into polished, playable builds without dragging out the timeline. I care about the part most people skip: making it feel good to play, not just technically working. If you've got a game idea sitting in your head and no one to build it, that's where I come in.",
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
      "A crypto-betting take on the doll game from Squid Game. Players place bets and try to reach the finish line without getting caught during the \"red light\" phase, with a twist that lets players pick an American leader as the protagonist. Built the full game loop, timing/detection mechanics, and betting logic.",
    tags: ["Phaser", "HTML5", "Web3 Betting Logic"],
    status: "live",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "u7BRzKfgAsA",
    images: [],
    year: "2024",
    client: "Subrays Technologies"
  },
  {
    id: "air-hockey-cep",
    title: "Air Hockey [CEP Edition]",
    tagline: "Blockchain-powered air hockey with NFT skins",
    description:
      "A crypto-token twist on classic air hockey. Players bet tokens, compete head-to-head, and win rewards, with NFT-based cosmetics for paddles and table designs that players can trade or sell. Weekly tournaments and leaderboards on top.",
    tags: ["Phaser", "HTML5", "Web3 / NFTs"],
    status: "live",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "r0goIDLH8kw",
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
    id: "traffic-out",
    title: "Traffic Out",
    tagline: "Casual traffic management game",
    description:
      "Players take the driver's seat and clear out busy streets — intuitive controls and increasingly challenging levels as you strategically maneuver vehicles to keep traffic flowing.",
    tags: ["Mobile", "Casual", "Google Play"],
    status: "live",
    orientation: "portrait",
    image: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.subrays.trafficout&hl=en",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "",
    client: "Subrays Technologies"
  },
  {
    id: "squid-arcade",
    title: "Squid Arcade",
    tagline: "Casual multiplayer mini-game arena",
    description:
      "Fun, casual multiplayer gaming — win games before time runs out or be eliminated, earn WON to customize character skins in the shop, and chat with opponents in-game.",
    tags: ["Multiplayer", "Mobile", "Google Play"],
    status: "live",
    orientation: "portrait",
    image: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.LanticGameStudios.SquidArcade&hl=en_GB",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2021–2022",
    client: ""
  },
  {
    id: "lolipop-saga",
    title: "Lolipop Saga",
    tagline: "Match-3 candy puzzle game",
    description:
      "A match-3 puzzle game with unlimited move possibilities — levels get genuinely challenging as they layer on multiple objectives.",
    tags: ["Mobile", "Match-3", "Google Play"],
    status: "live",
    orientation: "portrait",
    image: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.seker.oyunu&hl=pt",
    embedUrl: "",
    youtubeId: "_9CHwFJyizA",
    images: [],
    year: "2023",
    client: "Fiverr client"
  },
  {
    id: "game-of-dragons",
    title: "Game of Dragons",
    tagline: "3D Dragon MMO on Ethereum & BSC",
    description:
      "A 3D Dragon MMO where players battle and race for Dragon Gold to buy breedable dragons and breed unique NFTs. Multi-chain (Ethereum + Binance Smart Chain), with a full trading marketplace for dragons, items and abilities. Launched in BETA on Windows.",
    tags: ["Unity", "C#", "Web3 / NFTs", "Multiplayer"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "gor8976gTFM",
    images: [],
    year: "2021–2023",
    client: "Game of Dragons"
  },
  {
    id: "meme-royale",
    title: "Meme Royale",
    tagline: "Play-to-earn tokenomic crypto project",
    description:
      "A play-to-earn game built around $ROYALE, a deflationary token designed to grow scarcer over time through auto-burn — holders earn more ROYALE automatically just by holding.",
    tags: ["Unity", "Web3", "Tokenomics"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "CK4PQEtWnPI",
    images: [],
    year: "2022–2023",
    client: ""
  },
  {
    id: "football-tactics",
    title: "Football Tactics",
    tagline: "Multiplayer turn-based tactical sports",
    description:
      "FBT mixes turn-based strategy (think Fire Emblem) with online competitive sports (think FIFA). Players face off on the football field, place their players, and set orders for the next turn — orders resolve simultaneously and play out for both sides.",
    tags: ["HTML5", "Multiplayer", "Turn-Based Strategy"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "o8tlMDDNis0",
    images: [],
    year: "2023",
    client: ""
  },
  {
    id: "daadascape",
    title: "DaadaScape",
    tagline: "Blockchain-powered game for the African community",
    description:
      "A blockchain-powered game built by Daada Inc, focused on secure, intermediary-free transactions and decentralized ownership for a vibrant player community.",
    tags: ["Unity", "Web3", "Blockchain"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "RVaMiN8fMIo",
    images: [],
    year: "2023",
    client: "Daada Inc"
  },
  {
    id: "simba-dash",
    title: "Simba Dash",
    tagline: "Fast-paced endless runner",
    description:
      "An easy-to-play, fast-paced endless runner — start in the heart of the savannah and run endlessly through hurdles and dangers, with intuitive controls for casual and hardcore players alike.",
    tags: ["Mobile", "Endless Runner"],
    status: "prototype",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "8R2_DUVzX0E",
    images: [],
    year: "2020–2021",
    client: ""
  },
  {
    id: "ring-fighters",
    title: "Ring Fighters",
    tagline: "1v1 hand-to-hand multiplayer showdown",
    description:
      "A heart-pounding 1v1 multiplayer fighting game — street brawlers, martial artists and boxers each bring their own style. Master timing, precision and evasion, chain punches, kicks and special moves to send opponents to the canvas.",
    tags: ["Multiplayer", "Fighting", "Programming"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "uKvNTkA3FVs",
    images: [],
    year: "2021",
    client: ""
  },
  {
    id: "pet-vs-pets",
    title: "Pet vs. Pets",
    tagline: "Multiplayer P2E pet-fighting arena",
    description:
      "A multiplayer play-to-earn pet-fighting game — pick from a roster of cute Pets, pay an entrance fee to join the arena, and the last one standing takes the pool prize. Training and Gems modes let players compete without real money. New Pets are bought as NFTs from the in-game shop.",
    tags: ["Unity", "Web3 / NFTs", "Multiplayer"],
    status: "prototype",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "eQkSYEtZ4ns",
    images: [],
    year: "2019–2020",
    client: ""
  },
  {
    id: "snakecoins",
    title: "SnakeCoins",
    tagline: "Multiplayer .io-style snake game",
    description:
      "A multiplayer snake game — control an avatar that consumes multi-colored pellets, both from other players and ones that spawn naturally on the map, to grow in size.",
    tags: [".io Style", "Multiplayer", "Browser"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "wMPEL6H3Eio",
    images: [],
    year: "2019",
    client: ""
  },
  {
    id: "rps-multiplayer",
    title: "RPS Multiplayer",
    tagline: "Rock Paper Scissors showdown",
    description:
      "A multiplayer Rock Paper Scissors game that mixes strategy, psychology and lightning-fast decision-making — battle friends and players worldwide to climb the ranks and become RPS champion.",
    tags: ["Unity", "Multiplayer"],
    status: "prototype",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "oAqLu1IRXx4",
    images: [],
    year: "2019",
    client: ""
  },
  {
    id: "pong-masterball",
    title: "Pong Masterball",
    tagline: "Multiplayer ping pong showdown",
    description:
      "A fast-paced multiplayer ping pong game — quick rallies, lightning reflexes, and opponents from all over the world in a virtual table tennis showdown.",
    tags: ["Unity", "Multiplayer", "Sports"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "PVuFtu0G3Q0",
    images: [],
    year: "2018–2019",
    client: ""
  },
  {
    id: "cube-rivals",
    title: "Cube Rivals",
    tagline: "Multiplayer rocket-tag arena",
    description:
      "A multiplayer arena game where players score points by hitting each other with rockets — built with Photon PUN for networking, with a simple, easy-to-read UI.",
    tags: ["Multiplayer", "Photon", "Arena"],
    status: "prototype",
    orientation: "landscape",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "6U4SLp3VXRU",
    images: [],
    year: "2018",
    client: ""
  },
  {
    id: "book-of-egyptian-adventures",
    title: "Book of Egyptian Adventures",
    tagline: "Egyptian-themed slot game",
    description: "Push the button and try your luck — an Egyptian-adventure-themed slot machine.",
    tags: ["Unity", "Slots / Casino"],
    status: "prototype",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2018",
    client: ""
  },
  {
    id: "burning-coinman",
    title: "Burning Coinman",
    tagline: "2D crypto coin-collector",
    description:
      "An exhilarating 2D mobile game where collecting crypto coins comes with a twist — collected coins are burned, reducing token supply and driving up value. Play as Coinman, gathering as many coins as possible before they turn to ash.",
    tags: ["Unity", "Mobile", "Web3"],
    status: "prototype",
    orientation: "portrait",
    image: "",
    playUrl: "",
    embedUrl: "",
    youtubeId: "WiTJg15_xiw",
    images: [],
    year: "2017",
    client: ""
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
  }
];

/* COURSE FIELDS
   title, provider, date ("Jul 2026"), url (credential link, optional) */
const COURSES = [
  {
    title: "The Psychology of Games — Secrets of Good Game Design",
    provider: "Udemy",
    date: "Jul 2026",
    url: "https://www.udemy.com/certificate/UC-e00e6597-7ba5-4cd2-a086-ca3edc62d30f/"
  },
  {
    title: "Unity Multiplayer (Mirror): Intermediate C# & Networking",
    provider: "Udemy",
    date: "Dec 2022",
    url: "https://www.udemy.com/certificate/UC-06934b6d-475c-4ae7-aab9-042ac069261a/"
  },
  {
    title: "Introduction to Game Development with Unity",
    provider: "Udemy",
    date: "Oct 2024",
    url: "https://www.udemy.com/certificate/UC-543f0a17-5a23-40b0-9a46-60335b26d970/"
  },
  {
    title: "Software Engineering Virtual Experience Program",
    provider: "Forage",
    date: "Aug 2023",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Electronic%20Arts/a77WE3de8qrxWferQ_Electronic%20Arts_9WxtNSNpTruDxNMxA_1690866357153_completion_certificate.pdf"
  },
  {
    title: "Unity Game Development — Build a Basketball Game",
    provider: "Udemy",
    date: "Jan 2019",
    url: "https://www.udemy.com/certificate/UC-Y95PPXVF/"
  },
  {
    title: "Best Way to Learn German Language: Full Beginner (A1.1)",
    provider: "Udemy",
    date: "Jun 2026",
    url: "https://www.udemy.com/certificate/UC-c1ddff17-a3eb-4407-952a-fd863ee06597/"
  }
];
