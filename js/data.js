/* ============================================================
   PORTFOLIO DATA
   ------------------------------------------------------------
   Everything on the site is generated from this file. To add a
   new game or course, copy an existing block below, edit it,
   and save. No other file needs to change.

   GAME FIELDS
   ------------------------------------------------------------
   id            unique slug, no spaces                 (required)
   title         game name                              (required)
   tagline       one short line under the title          (optional)
   description   a few sentences, plain text             (required)
   tags          array of strings, tools/skills used      (required)
   status        "live" | "prototype"                    (required)
                   "live"      -> has a real play link (store/site)
                   "prototype" -> no live link, shows a video/photo
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
                   (must allow embedding: itch.io, your own host, etc.
                   won't work for sites that send X-Frame-Options: DENY)
   youtubeId     YouTube video ID for a preview            (optional)
                   e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ
                   shown as "Watch preview", works for both live and
                   prototype cards when there's no play link yet
   images        array of screenshot paths                 (optional)
                   shown in a simple gallery modal, handy for
                   games you only have photos of
   year          e.g. "2024"                               (optional)
   client        who it was built for                      (optional)

   PROJECT DETAIL FIELDS
   ------------------------------------------------------------
   These fill the "View details" popup. All optional: leave one
   out and that part of the popup just doesn't render, so you can
   fill them in a game at a time. Every game already gets a popup
   from the fields above -- these make it worth reading.

   role          your role, e.g. "Solo developer"          (optional)
   timeline      how long it took, e.g. "6 weeks"          (optional)
   team          who else worked on it, e.g. "Solo",       (optional)
                   "2 devs + 1 artist"
   highlights    array of short strings, the standout       (optional)
                   features. Renders as a bullet list.
   challenges    array of { title, body } objects           (optional)
                   title  the problem, a few words
                   body   what you did about it
                 This is the part clients actually read --
                 it's the difference between "he made a game"
                 and "he solved this".

   Copy-paste template:

     role: "Solo developer",
     timeline: "6 weeks",
     team: "Solo",
     highlights: [
       "Sub-100ms move sync across regions",
       "Reconnect mid-match without losing state"
     ],
     challenges: [
       {
         title: "Keeping two boards in sync",
         body: "Players on bad connections saw moves land out of order. " +
               "Moved to an authoritative server tick with client-side " +
               "prediction, so the local board responds instantly and " +
               "reconciles when the server disagrees."
       }
     ],
   ============================================================ */

const PROFILE = {
  name: "Fahad Asghar",
  role: "HTML5 & Phaser Game Developer",
  tagline:
    "I build games that run in the browser. Phaser and HTML5 first, Unity when a project needs a native build. Web3 and AI aren't separate specialties, they're features I wire into the games themselves when a client needs them.",
  bio:
    "I build web games. Phaser, HTML5, JavaScript, Unity, whatever the project needs to get from idea to something people can actually play. I've spent the last several years shipping games for clients, taking rough concepts and turning them into polished, playable builds without dragging out the timeline. I care about the part most people skip: making it feel good to play, not just technically working. If you've got a game idea sitting in your head and no one to build it, that's where I come in.",
  location: "Sahiwal, Punjab, Pakistan",
  email: "fahadasghar360@gmail.com",
  confidentialNote: "Some of my client work is protected under NDA and isn't shown here.",
  avatar: "assets/profile/fahad.webp", // path to a photo: leave blank for initials mark
  stats: [
    { label: "Games shipped", value: "100+" },
    { label: "Years building", value: "7+" },
    { label: "Hackathons won", value: "3+" },
    { label: "Job success", value: "100%" },
  ],
  skills: [
    "Phaser",
    "HTML5 Games",
    "React Games",
    "TypeScript Games",
    "JavaScript",
    "PixiJS",
    "Game Design",
    "Unity",
    "C#",
    "Multiplayer",
    "Web3 Integration",
    "AI-assisted Gameplay"
  ],
  education: [
    { school: "COMSATS University Islamabad", degree: "BS, Computer Science", years: "" },
    { school: "Punjab Group of Colleges", degree: "ICS, Computer Science", years: "" }
  ],
  links: [
    { label: "Upwork", url: "https://www.upwork.com/freelancers/~016225b0cd1e76e4a5" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mfahadasghar/" },
    { label: "GitHub", url: "https://github.com/mfahadasghar" },
    { label: "Email", url: "mailto:fahadasghar360@gmail.com" }
  ]
};

const GAMES = [
  {
    id: "four-in-a-row",
    title: "Four in a Row",
    tagline: "Real-time multiplayer Connect Four",
    description:
      "A real-time multiplayer take on Connect Four. Drop pieces, race your opponent to four in a row, with live player avatars and turn timers.",
    tags: ["Phaser", "Multiplayer", "Real-time"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/four-in-a-row.webp",
    playUrl: "https://four-in-a-row-react.onrender.com",
    embedUrl: "https://four-in-a-row-react.onrender.com",
    youtubeId: "",
    images: [],
    year: "",
    client: "",
    role: "Solo developer",
    timeline: "3 weeks",
    team: "Solo",
    highlights: [
      "Server-authoritative moves, so a tampered client can't drop a piece out of turn",
      "Turn timers that keep running correctly through a reconnect",
      "Live opponent presence and avatars"
    ],
    challenges: [
      {
        title: "Two boards, one source of truth",
        body:
          "Players on uneven connections could see moves land in different orders, which in a game decided by column parity means two people looking at two different boards. The server became the only thing allowed to mutate board state; clients send intent, render optimistically, and reconcile against the authoritative reply."
      },
      {
        title: "Players who just close the tab",
        body:
          "An abandoned match left the opponent waiting forever. Added a disconnect grace window so a genuine network blip can rejoin the same match, after which the game resolves as a forfeit instead of hanging."
      }
    ]
  },
  {
    id: "black-peter",
    title: "Black Peter",
    tagline: "Real-time multiplayer card game",
    description:
      "A real-time multiplayer take on the classic Black Peter (Old Maid) card game. Pull cards from opponents' hands, make pairs, and avoid being left holding the odd one out.",
    tags: ["Phaser", "Multiplayer", "Real-time"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/black-peter.webp",
    playUrl: "https://black-peter-react.onrender.com",
    embedUrl: "https://black-peter-react.onrender.com",
    youtubeId: "",
    images: [],
    year: "",
    client: "",
    role: "Solo developer",
    timeline: "3 weeks",
    team: "Solo",
    highlights: [
      "Hidden hands held server-side, never broadcast to opponents",
      "Pair matching resolved on the server to keep draws honest",
      "Reconnect back into an in-progress round"
    ],
    challenges: [
      {
        title: "Hidden information over an open connection",
        body:
          "The whole game is about not knowing which card you're pulling, but a naive implementation sends every hand to every client where anyone can read it in devtools. Hands live on the server; clients only ever receive card counts and positions, and the pulled card's identity arrives only after the pull resolves."
      },
      {
        title: "Simultaneous pulls and the odd card",
        body:
          "Two players acting on the same hand in the same tick could both be handed the same card. Pulls are queued and resolved one at a time per hand, with the odd-card check re-run after every resolution so the Black Peter never silently disappears."
      }
    ]
  },
  {
    id: "super-mission",
    title: "Super Mission",
    tagline: "2D platformer, Unity WebGL",
    description:
      "A 2D platformer built in Unity. Jump, dodge hazards and collect items across handcrafted levels, playable straight in the browser via Unity WebGL.",
    tags: ["Unity", "WebGL", "Platformer"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/super-mission.webp",
    playUrl: "https://super-mission.vercel.app",
    embedUrl: "https://super-mission.vercel.app",
    youtubeId: "",
    images: [],
    year: "2025",
    client: "",
    role: "Solo developer",
    timeline: "6 weeks",
    team: "Solo",
    highlights: [
      "Runs in the browser via Unity WebGL, no install",
      "Handcrafted levels with escalating hazard patterns",
      "Keyboard and touch input from the same build"
    ],
    challenges: [
      {
        title: "Getting a Unity WebGL build small enough to load",
        body:
          "A default WebGL build is a big download, and players leave during a long loading bar. Stripped unused engine modules, moved to compressed texture atlases, and enabled Brotli compression to cut the initial payload down to something that starts fast on a normal connection."
      },
      {
        title: "One build, two input models",
        body:
          "Browser builds land on both desktop and phones, and a platformer tuned for keyboard feels unplayable with on-screen buttons. Input goes through a single abstraction with separate tuning per device, so jump timing stays forgiving on touch without making the keyboard version feel floaty."
      }
    ]
  },
  {
    id: "isometric-dice-board-game",
    title: "Isometric Dice Board Game: MVP",
    tagline: "Built from scratch, multiplayer-ready",
    description:
      "A full isometric, dice-based board game MVP built from the ground up for a client. Board logic, dice mechanics, turn structure, and an architecture ready to plug in multiplayer.",
    tags: ["Unity", "WebGL", "Multiplayer"],
    status: "live",
    orientation: "portrait",
    image: "assets/games/isometric-dice-board-game.webp",
    playUrl: "https://dice-game-pearl-nu.vercel.app",
    embedUrl: "https://dice-game-pearl-nu.vercel.app",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "Upwork client",
    role: "Gameplay developer",
    timeline: "5 weeks",
    team: "Solo, working to a client spec",
    highlights: [
      "Board logic kept fully separate from isometric rendering",
      "Turn state machine built to accept network play without a rewrite",
      "Dice, movement and tile resolution driven by data, not hardcoded"
    ],
    challenges: [
      {
        title: "Isometric rendering vs. board logic",
        body:
          "Tying game rules to screen positions is what makes isometric board games painful to extend. The board is a plain grid model that knows nothing about the camera; the isometric layer is a pure projection of it. Changing the board size or tile behaviour never touches rendering code."
      },
      {
        title: "Multiplayer-ready before multiplayer exists",
        body:
          "The MVP was single-device, but the client wanted online play next and didn't want it rebuilt. Every turn is an explicit, serialisable action resolved by a single state machine, so the same code path works whether the action came from a local tap or, later, the wire."
      }
    ]
  },
  {
    id: "typing-game",
    title: "Typing Game",
    tagline: "Fantasy-themed typing practice",
    description:
      "A typing practice game with a fantasy RPG skin. Type the falling words correctly before time runs out, with an on-screen keyboard that highlights the next key.",
    tags: ["HTML5", "JavaScript", "Typing"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/typing-game.webp",
    playUrl: "https://typing-game-gamma-six.vercel.app",
    embedUrl: "https://typing-game-gamma-six.vercel.app",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "",
    role: "Solo developer",
    timeline: "2 weeks",
    team: "Solo",
    highlights: [
      "On-screen keyboard that highlights the next key you need",
      "Fantasy RPG framing over a plain typing drill",
      "Word spawn pacing that adapts as you keep up"
    ],
    challenges: [
      {
        title: "Keyboards that aren't the one you developed on",
        body:
          "Reading raw key codes breaks the moment someone is on a non-US layout, and dead keys fire events that look like real input. Matching happens on the resolved character from the input event rather than physical key position, so the game works on layouts I never tested against."
      },
      {
        title: "Falling words that pile up on each other",
        body:
          "Random spawn positions meant words overlapped into unreadable mush right when difficulty ramped. Spawns are assigned to lanes with a cooldown per lane, so density can rise without words ever landing on top of one another."
      }
    ]
  },
  {
    id: "collect-the-shapes",
    title: "Collect the Shapes",
    tagline: "Holiday-themed shape sorting puzzle",
    description:
      "A shape-sorting puzzle with a cozy holiday theme. Drag falling shapes into the matching columns before you run out of lives.",
    tags: ["HTML5", "JavaScript", "Puzzle"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/collect-the-shapes.webp",
    playUrl: "https://collect-the-shapes-app.vercel.app",
    embedUrl: "https://collect-the-shapes-app.vercel.app",
    youtubeId: "",
    images: [],
    year: "2025",
    client: "",
    role: "Solo developer",
    timeline: "2 weeks",
    team: "Solo",
    highlights: [
      "Drag-and-sort built on pointer events, identical on mouse and touch",
      "Lives and difficulty tuned for a short casual session",
      "Cozy holiday theming as a swappable asset set"
    ],
    challenges: [
      {
        title: "Drag that feels right under a thumb",
        body:
          "A finger is far less precise than a cursor, and grabbing a falling shape kept registering as a page scroll. Moved to pointer events with a small movement threshold before a drag commits, and suppressed touch scrolling on the play surface only."
      },
      {
        title: "A difficulty curve that doesn't cliff",
        body:
          "Linear spawn-rate increases went from trivial to impossible within a few seconds. Fall speed and spawn rate now ramp on separate curves, so the game gets busier before it gets faster and players can feel the pressure building."
      }
    ]
  },
  {
    id: "beam-game",
    title: "Beam",
    tagline: "Minimalist falling-block catcher",
    description:
      "A minimalist arcade game. Catch falling data blocks inside a glowing capsule-shaped frame to build combos and rack up gigabytes.",
    tags: ["HTML5", "JavaScript", "Arcade"],
    status: "live",
    orientation: "portrait",
    image: "assets/games/beam-game.webp",
    playUrl: "https://beam-game.vercel.app",
    embedUrl: "https://beam-game.vercel.app",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "",
    role: "Solo developer",
    timeline: "2 weeks",
    team: "Solo",
    highlights: [
      "Combo scoring that rewards holding a risky streak",
      "Single-thumb portrait play",
      "Minimal visual language built around one glowing capsule"
    ],
    challenges: [
      {
        title: "Portrait that fits every phone",
        body:
          "Phone aspect ratios vary far more than they look, and a fixed portrait canvas either letterboxes badly or hides the catcher behind the home indicator. The playfield anchors to safe-area insets and scales to the shorter axis, so the capsule sits in the same reachable spot regardless of device."
      },
      {
        title: "Making a combo worth chasing",
        body:
          "Flat per-block scoring gave players no reason to take risks, so the game was calm and boring. Combo multipliers now build on consecutive catches and reset on a miss, which turns a full capsule into a genuine decision instead of an obvious one."
      }
    ]
  },
  {
    id: "glitch-run",
    title: "Glitch Run",
    tagline: "Minimalist platformer",
    description:
      "A minimalist platformer. Guide a glitchy little creature across floating platforms to reach the door before the timer runs out.",
    tags: ["HTML5", "JavaScript", "Platformer"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/glitch-run.webp",
    playUrl: "https://glitch-run.vercel.app",
    embedUrl: "https://glitch-run.vercel.app",
    youtubeId: "",
    images: [],
    year: "2026",
    client: "",
    role: "Solo developer",
    timeline: "2 weeks",
    team: "Solo",
    highlights: [
      "Swept collision, so fast falls never clip through a platform",
      "Coyote time and jump buffering for forgiving controls",
      "Per-level timer that pushes without punishing experimentation"
    ],
    challenges: [
      {
        title: "Falling straight through the floor",
        body:
          "At high fall speed a frame-by-frame position check can move the character from above a platform to below it without ever overlapping, so the collision never fires. Replaced point checks with a swept test against the movement segment, which catches the crossing regardless of speed."
      },
      {
        title: "Jumps that felt unfair",
        body:
          "Players kept insisting they pressed jump when the logs said they pressed it a frame or two after walking off the edge. Added coyote time and input buffering, so a slightly early or slightly late press still does what the player intended."
      }
    ]
  },
  {
    id: "christmas-ninja",
    title: "Christmas Ninja",
    tagline: "Fruit Ninja-style holiday slicer",
    description:
      "A holiday spin on the fruit-slicer formula. Slice flying mittens, trees and gingerbread men while avoiding the ones you shouldn't cut.",
    tags: ["HTML5", "JavaScript", "Arcade"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/christmas-ninja.webp",
    playUrl: "https://chrismas-ninja-app.vercel.app",
    embedUrl: "https://chrismas-ninja-app.vercel.app",
    youtubeId: "",
    images: [],
    year: "2025",
    client: "",
    role: "Solo developer",
    timeline: "3 weeks",
    team: "Solo",
    highlights: [
      "Swipe trails sampled into line segments for accurate slicing",
      "Holiday asset set over a reusable slicer core",
      "Spawn patterns that keep 'don't cut this' objects readable"
    ],
    challenges: [
      {
        title: "Slicing that matches what the player drew",
        body:
          "Testing only the pointer's current position misses fast swipes entirely — the finger jumps past the object between frames. The swipe is sampled into a short trail of segments each frame and objects are tested against those segments, so a quick flick registers everything it visually crossed."
      },
      {
        title: "Objects you're punished for hitting",
        body:
          "Mixing penalty objects into random spawns produced runs that were unavoidable through no fault of the player. Penalty items now spawn on their own timing rules with guaranteed visual separation from a cluster, so avoiding them is always a skill decision."
      }
    ]
  },
  {
    id: "sliding-puzzle",
    title: "Sliding Puzzle",
    tagline: "Classic image sliding puzzle",
    description:
      "A classic sliding-tile puzzle. Rearrange the scrambled photo back into place, with a preview and built-in hint system.",
    tags: ["HTML5", "JavaScript", "Puzzle"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/sliding-puzzle.webp",
    playUrl: "https://sliding-puzzle-app.vercel.app",
    embedUrl: "https://sliding-puzzle-app.vercel.app",
    youtubeId: "",
    images: [],
    year: "2025",
    client: "",
    role: "Solo developer",
    timeline: "2 weeks",
    team: "Solo",
    highlights: [
      "Shuffles that are provably solvable, every time",
      "Reference preview and a bounded hint system",
      "Any image can be dropped in as the puzzle source"
    ],
    challenges: [
      {
        title: "Shuffles that can't be solved",
        body:
          "Randomising tile order produces an unsolvable board roughly half the time, and players grind at it for ages before something feels wrong. The shuffle now either applies a random sequence of legal moves from the solved state, or checks the permutation's parity and corrects it, so every board that appears is guaranteed solvable."
      },
      {
        title: "A hint that helps without playing for you",
        body:
          "A full solver just hands over the answer and ends the puzzle. The hint runs a bounded search and surfaces only the next single useful move, so a stuck player gets unstuck without the game finishing itself."
      }
    ]
  },
  {
    id: "memory-game",
    title: "Memory Match",
    tagline: "Classic card-matching game",
    description:
      "A classic memory-matching game. Flip cards to find pairs before the timer runs out, built with a swappable card-image theme.",
    tags: ["HTML5", "JavaScript", "Puzzle"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/memory-game.webp",
    playUrl: "https://memory-game-react-app.vercel.app",
    embedUrl: "https://memory-game-react-app.vercel.app",
    youtubeId: "",
    images: [],
    year: "2025",
    client: "",
    role: "Solo developer",
    timeline: "1 week",
    team: "Solo",
    highlights: [
      "Card art driven entirely by config, so the theme swaps in one place",
      "Input locking that survives fast double-taps",
      "Timer and pair count tuned for a quick round"
    ],
    challenges: [
      {
        title: "Fast clicks breaking the flip logic",
        body:
          "Clicking a third card mid-animation left two cards face-up that were never compared, and the board could deadlock. Input is locked for the duration of the compare animation and queued clicks are dropped rather than buffered, which keeps the flip state machine in exactly one valid state."
      },
      {
        title: "Re-theming without touching game code",
        body:
          "The first version hardcoded card faces, so a new theme meant editing logic. Card sets are now plain data — a list of image paths — and the grid derives pair count from the set, so a new deck is a config change."
      }
    ]
  },
  {
    id: "fruit-ninja",
    title: "Fruit Ninja",
    tagline: "Fruit-slicer with a Japanese theme",
    description:
      "A fruit-slicer clone with a Japanese art style. Slice origami cranes and rice cakes while dodging bombs against a Mount Fuji backdrop.",
    tags: ["HTML5", "JavaScript", "Arcade"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/fruit-ninja.webp",
    playUrl: "https://fruit-ninja-two.vercel.app",
    embedUrl: "https://fruit-ninja-two.vercel.app",
    youtubeId: "",
    images: [],
    year: "2025",
    client: "",
    role: "Solo developer",
    timeline: "3 weeks",
    team: "Solo",
    highlights: [
      "Trail rendering that stays smooth during heavy slicing",
      "Japanese art direction over classic slicer mechanics",
      "Bomb placement rules that keep failure feeling earned"
    ],
    challenges: [
      {
        title: "Trails that tanked the framerate",
        body:
          "Redrawing a long swipe trail as individual sprites every frame was the single biggest cost in the game on mobile. The trail is capped to a fixed number of recent points and drawn as one tapered path, which held the framerate steady even with a screen full of objects."
      },
      {
        title: "Bombs that felt like a gotcha",
        body:
          "Randomly placed bombs frequently spawned mid-cluster where a natural swipe couldn't avoid them. Bombs now respect a minimum spatial and timing gap from other objects, so hitting one reads as a mistake rather than bad luck."
      }
    ]
  },
  {
    id: "lolipop-saga",
    title: "Lolipop Saga",
    tagline: "Match-3 candy puzzle game",
    description:
      "A match-3 puzzle game with unlimited move possibilities. Levels get genuinely challenging as they layer on multiple objectives.",
    tags: ["Unity", "Mobile", "Match-3"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/lolipop-saga.webp",
    playUrl: "https://play.google.com/store/apps/details?id=com.seker.oyunu&hl=pt",
    embedUrl: "",
    youtubeId: "_9CHwFJyizA",
    images: [],
    year: "2023",
    client: "Fiverr client",
    role: "Unity developer",
    timeline: "3 months",
    team: "Solo, with client-supplied art",
    highlights: [
      "Deadlock detection with automatic reshuffle",
      "Levels layering multiple win conditions at once",
      "Shipped to Google Play"
    ],
    challenges: [
      {
        title: "Boards with no move left",
        body:
          "Match-3 boards regularly reach a state with no valid swap, and a player staring at a dead board assumes the game is broken. After every cascade the board is scanned for at least one legal move, and reshuffles in place when there isn't one, preserving progress toward the level objectives."
      },
      {
        title: "Cascades resolving unpredictably",
        body:
          "When several matches clear at once, resolution order decides the final board, and an inconsistent order made scoring feel arbitrary. Cascade resolution runs in fixed passes — clear, collapse, refill, re-check — so the same board and the same swap always produce the same outcome."
      }
    ]
  },
  {
    id: "red-light-green-light",
    title: "Red Light Green Light",
    tagline: "Squid Game-style crypto betting race",
    description:
      "A crypto-betting take on the doll game from Squid Game. Players place bets and try to reach the finish line without getting caught during the \"red light\" phase, with a twist that lets players pick an American leader as the protagonist. Built the full game loop, timing/detection mechanics, and betting logic.",
    tags: ["Phaser", "HTML5", "Web3 Betting Logic"],
    status: "live",
    orientation: "landscape",
    image: "assets/games/red-light-green-light.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "u7BRzKfgAsA",
    images: [],
    year: "2024",
    client: "Subrays Technologies",
    role: "Game developer",
    timeline: "6 weeks",
    team: "Solo, within the client's product team",
    highlights: [
      "Movement detection with a latency grace window",
      "Bet outcomes resolved away from the client",
      "Selectable protagonist as a cosmetic layer over one game loop"
    ],
    challenges: [
      {
        title: "Detecting movement fairly when latency varies",
        body:
          "Eliminating a player the instant the light turns red punishes anyone with a slower connection for something they couldn't have seen yet. Detection uses a short grace window calibrated to the player's measured round-trip time, so the rule is enforced against what the player could actually perceive."
      },
      {
        title: "Betting that can't be gamed from the browser",
        body:
          "Anything wagered is worth tampering with, and a client that reports its own result is trivially exploitable. Round outcomes are decided server-side from the recorded input timeline; the browser renders the result but never determines it."
      }
    ]
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
    image: "assets/games/air-hockey-cep.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "r0goIDLH8kw",
    images: [],
    year: "2024",
    client: "Subrays Technologies",
    role: "Game developer",
    timeline: "8 weeks",
    team: "Solo, within the client's product team",
    highlights: [
      "Puck physics that stay identical on both players' screens",
      "NFT paddle and table skins loaded without blocking the match",
      "Weekly tournament and leaderboard support"
    ],
    challenges: [
      {
        title: "Two clients, two different pucks",
        body:
          "Each side simulating its own physics drifts apart within seconds, and in a game about angles that's immediately obvious. The simulation runs on a fixed timestep with one authoritative source, and clients interpolate toward it rather than integrating independently."
      },
      {
        title: "Cosmetics that must not delay a match",
        body:
          "Skins are fetched from chain metadata and off-chain storage, both of which can be slow or briefly unavailable. Matches start on default assets and swap in owned cosmetics as they resolve, so a slow metadata lookup never keeps two players waiting."
      }
    ]
  },
  {
    id: "squid-arcade",
    title: "Squid Arcade",
    tagline: "Casual multiplayer mini-game arena",
    description:
      "Fun, casual multiplayer gaming. Win games before time runs out or be eliminated, earn WON to customize character skins in the shop, and chat with opponents in-game. No longer listed on the Play Store.",
    tags: ["Multiplayer", "Mobile", "Google Play"],
    status: "prototype",
    orientation: "portrait",
    image: "assets/games/squid-arcade.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2021–2022",
    client: "",
    role: "Multiplayer developer",
    timeline: "Ongoing, 2021–2022",
    team: "Small team",
    highlights: [
      "Several mini-games sharing one lobby and match lifecycle",
      "Soft currency earned in play and spent on character skins",
      "In-game chat between opponents"
    ],
    challenges: [
      {
        title: "Many mini-games, one lobby",
        body:
          "Each mini-game wanting its own matchmaking and result handling would have meant maintaining the same networking bugs several times over. Lobby, match lifecycle and elimination live in one shared layer, and a mini-game only implements its own rules and win condition."
      },
      {
        title: "Chat between strangers",
        body:
          "Open chat in a casual game invites abuse and spam almost immediately. Messages pass through a filter and per-player rate limits before broadcast, which kept the feature usable without needing live moderators."
      }
    ]
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
    image: "assets/games/game-of-dragons.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "gor8976gTFM",
    images: [],
    year: "2021–2023",
    client: "Game of Dragons",
    role: "Unity developer",
    timeline: "Ongoing, 2021–2023",
    team: "Part of the studio team",
    highlights: [
      "Multi-chain support across Ethereum and Binance Smart Chain",
      "Breedable dragons minted as unique NFTs",
      "In-game marketplace for dragons, items and abilities"
    ],
    challenges: [
      {
        title: "Two chains, one inventory",
        body:
          "Ethereum and BSC differ in confirmation times, fees and tooling, and exposing that split to players would have been unusable. Chain interaction sits behind one interface with per-chain adapters, so the game asks 'what does this player own' without caring where it lives."
      },
      {
        title: "Breeding rules that preserve scarcity",
        body:
          "Unrestricted breeding floods the market and destroys the value of every dragon already owned. Breeding applies cooldowns and generation-based limits, with trait inheritance weighted so rare combinations stay genuinely rare as supply grows."
      }
    ]
  },
  {
    id: "meme-royale",
    title: "Meme Royale",
    tagline: "Play-to-earn tokenomic crypto project",
    description:
      "A play-to-earn game built around $ROYALE, a deflationary token designed to grow scarcer over time through auto-burn. Holders earn more ROYALE automatically just by holding.",
    tags: ["Unity", "Web3", "Tokenomics"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/meme-royale.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "CK4PQEtWnPI",
    images: [],
    year: "2022–2023",
    client: "",
    role: "Unity developer",
    timeline: "Ongoing, 2022–2023",
    team: "Small team",
    highlights: [
      "Play-to-earn loop built on a deflationary auto-burn token",
      "Holder rewards accruing passively",
      "In-game economy priced against a moving token value"
    ],
    challenges: [
      {
        title: "On-chain balances inside a running game",
        body:
          "Reading the chain directly on every UI update is slow, rate-limited and expensive. Balances are cached and refreshed on an interval and after any player action that should change them, with the interface showing pending state instead of pretending a transaction has already settled."
      },
      {
        title: "Pricing when the token keeps moving",
        body:
          "Fixing item costs in tokens meant they became trivially cheap or unaffordable as the price moved. Costs are defined in a stable internal unit and converted at transaction time, so the economy stays balanced independently of the token's market price."
      }
    ]
  },
  {
    id: "football-tactics",
    title: "Football Tactics",
    tagline: "Multiplayer turn-based tactical sports",
    description:
      "FBT mixes turn-based strategy (think Fire Emblem) with online competitive sports (think FIFA). Players face off on the football field, place their players, and set orders for the next turn. Orders resolve simultaneously and play out for both sides.",
    tags: ["Unity", "Multiplayer", "Turn-Based Strategy"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/football-tactics.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "o8tlMDDNis0",
    images: [],
    year: "2023",
    client: "",
    role: "Unity developer",
    timeline: "10 weeks",
    team: "Solo",
    highlights: [
      "Simultaneous turn resolution — both sides' orders play out at once",
      "Deterministic replay so both clients see an identical turn",
      "Fire Emblem-style positioning over a football pitch"
    ],
    challenges: [
      {
        title: "Both players moving at the same time",
        body:
          "Simultaneous orders create conflicts sequential turn games never face: two players targeting the same tile, a pass to someone who has already moved, tackles that would resolve differently depending on order. Resolution runs in defined phases with explicit tie-break rules, so every conflict has one documented outcome."
      },
      {
        title: "The same turn on two machines",
        body:
          "If resolution isn't deterministic, two clients can play out the same orders and disagree about the score. Resolution takes the order set plus a shared seed and runs the same code on both ends, so the turn is a replay of one computation rather than two independent simulations."
      }
    ]
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
    image: "assets/games/daadascape.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "RVaMiN8fMIo",
    images: [],
    year: "2023",
    client: "Daada Inc",
    role: "Unity developer",
    timeline: "8 weeks",
    team: "Solo, working with the client's team",
    highlights: [
      "Decentralised ownership without intermediary transaction fees",
      "Wallet onboarding aimed at first-time crypto users",
      "Tuned for mid- and low-end Android hardware"
    ],
    challenges: [
      {
        title: "Players who have never used a wallet",
        body:
          "Most of the target community had no crypto experience, and standard wallet flows assume seed phrases and gas are already understood. Onboarding was reduced to the smallest possible number of steps with plain-language explanations at each one, deferring wallet setup until the player has a reason to care."
      },
      {
        title: "Patchy connectivity and modest devices",
        body:
          "Assuming a stable connection and a recent phone would have excluded much of the audience. Asset sizes were cut, network calls made retryable and idempotent, and the game keeps working through short dropouts rather than kicking the player back to a loading screen."
      }
    ]
  },
  {
    id: "simba-dash",
    title: "Simba Dash",
    tagline: "Fast-paced endless runner",
    description:
      "An easy-to-play, fast-paced endless runner. Start in the heart of the savannah and run endlessly through hurdles and dangers, with intuitive controls for casual and hardcore players alike.",
    tags: ["Mobile", "Endless Runner"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/simba-dash.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "8R2_DUVzX0E",
    images: [],
    year: "2020–2021",
    client: "",
    role: "Game developer",
    timeline: "Ongoing, 2020–2021",
    team: "Solo",
    highlights: [
      "Procedurally generated track that stays clearable",
      "Object pooling for a steady framerate over long runs",
      "Controls readable by casual players, deep enough to master"
    ],
    challenges: [
      {
        title: "Procedural sections that were impossible",
        body:
          "Purely random hazard placement regularly produced gaps no jump could clear, which reads to the player as the game cheating. Track generation assembles pre-validated chunks and checks the seam between them against the player's actual jump distance, so every generated run is completable."
      },
      {
        title: "Framerate drifting down over a long run",
        body:
          "Instantiating and destroying obstacles continuously drove garbage collection spikes that got worse the longer someone survived — punishing exactly the best players. Everything spawned is drawn from pre-allocated pools and recycled, holding allocation flat regardless of run length."
      }
    ]
  },
  {
    id: "ring-fighters",
    title: "Ring Fighters",
    tagline: "1v1 hand-to-hand multiplayer showdown",
    description:
      "A heart-pounding 1v1 multiplayer fighting game. Street brawlers, martial artists and boxers each bring their own style. Master timing, precision and evasion, chain punches, kicks and special moves to send opponents to the canvas.",
    tags: ["Multiplayer", "Fighting", "Programming"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/ring-fighters.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "uKvNTkA3FVs",
    images: [],
    year: "2021",
    client: "",
    role: "Multiplayer developer",
    timeline: "8 weeks",
    team: "Solo",
    highlights: [
      "Netcode tuned for the timing tolerances of a fighting game",
      "Distinct movesets across brawler, martial artist and boxer",
      "Frame-data-driven hitboxes rather than collider guesswork"
    ],
    challenges: [
      {
        title: "Fighting games punish latency hardest",
        body:
          "Genres that tolerate a hundred milliseconds are unplayable here, because blocks and counters live inside a few frames. Input runs on a fixed delay with local prediction, so both players act against the same timeline and a counter that looked correct locally still lands."
      },
      {
        title: "Hitboxes that felt arbitrary",
        body:
          "Approximating hits with character colliders produced strikes that visually missed but registered, and vice versa. Attacks carry explicit per-frame hitbox and hurtbox data authored alongside the animation, so what the player sees is what the game tests."
      }
    ]
  },
  {
    id: "pet-vs-pets",
    title: "Pet vs. Pets",
    tagline: "Multiplayer P2E pet-fighting arena",
    description:
      "A multiplayer play-to-earn pet-fighting game. Pick from a roster of cute Pets, pay an entrance fee to join the arena, and the last one standing takes the pool prize. Training and Gems modes let players compete without real money. New Pets are bought as NFTs from the in-game shop.",
    tags: ["Unity", "Web3 / NFTs", "Multiplayer"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/pet-vs-pets.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "eQkSYEtZ4ns",
    images: [],
    year: "2019–2020",
    client: "",
    role: "Unity developer",
    timeline: "Ongoing, 2019–2020",
    team: "Small team",
    highlights: [
      "Entry-fee arena with a last-one-standing prize pool",
      "Free Training and Gems modes alongside the paid arena",
      "Pets acquired as NFTs from an in-game shop"
    ],
    challenges: [
      {
        title: "Real money on the outcome",
        body:
          "Once an entry fee is involved, any client that can influence the reported result will be attacked. Match results are validated server-side against the recorded action log before a payout is authorised, and the client is never trusted to declare a winner."
      },
      {
        title: "Free and paid modes staying in sync",
        body:
          "Training and Gems modes had drifted into behaving subtly differently from the paid arena, so practice stopped preparing players for the real thing. All three modes now run the same combat code with only entry and reward rules differing."
      }
    ]
  },
  {
    id: "snakecoins",
    title: "SnakeCoins",
    tagline: "Multiplayer .io-style snake game",
    description:
      "A multiplayer snake game. Control an avatar that consumes multi-colored pellets, both from other players and ones that spawn naturally on the map, to grow in size.",
    tags: [".io Style", "Multiplayer", "Browser"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/snakecoins.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "wMPEL6H3Eio",
    images: [],
    year: "2019",
    client: "",
    role: "Multiplayer developer",
    timeline: "6 weeks",
    team: "Solo",
    highlights: [
      "Area-of-interest culling so bandwidth doesn't scale with player count",
      "Spatial hashing for collision across a crowded map",
      "Classic .io growth loop in the browser"
    ],
    challenges: [
      {
        title: "Bandwidth growing with every player",
        body:
          "Broadcasting every snake to every client means traffic grows with the square of the player count, and the game falls over exactly when it gets popular. Each client receives only what's near its own viewport, sent as deltas rather than full snapshots, which keeps per-player bandwidth roughly flat."
      },
      {
        title: "Collision checks across a full map",
        body:
          "Testing every segment against every other segment is far too slow once a map is busy. Segments are indexed into a spatial hash and tested only against occupants of neighbouring cells, cutting the work to something that holds up under load."
      }
    ]
  },
  {
    id: "rps-multiplayer",
    title: "RPS Multiplayer",
    tagline: "Rock Paper Scissors showdown",
    description:
      "A multiplayer Rock Paper Scissors game that mixes strategy, psychology and lightning-fast decision-making. Battle friends and players worldwide to climb the ranks and become RPS champion.",
    tags: ["Unity", "Multiplayer"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/rps-multiplayer.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "oAqLu1IRXx4",
    images: [],
    year: "2019",
    client: "",
    role: "Unity developer",
    timeline: "4 weeks",
    team: "Solo",
    highlights: [
      "Commit-reveal so neither player can see the other's throw first",
      "Ranked ladder with progression",
      "Matchmaking that stays responsive with a small player pool"
    ],
    challenges: [
      {
        title: "Nobody can be allowed to peek",
        body:
          "The entire game collapses if either client can observe the opponent's choice before locking its own, and sending both choices to a server still leaves an ordering question. Each side submits a hash of its choice plus a nonce first, then reveals; the reveal is verified against the commitment, so an early look is worthless."
      },
      {
        title: "Matchmaking with nobody online",
        body:
          "A ranked ladder is dead on arrival if the first player to arrive waits indefinitely. Search widens its rating tolerance the longer a player waits and falls back to a bot opponent past a threshold, so a session always starts."
      }
    ]
  },
  {
    id: "pong-masterball",
    title: "Pong Masterball",
    tagline: "Multiplayer ping pong showdown",
    description:
      "A fast-paced multiplayer ping pong game. Quick rallies, lightning reflexes, and opponents from all over the world in a virtual table tennis showdown.",
    tags: ["Unity", "Multiplayer", "Sports"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/pong-masterball.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "PVuFtu0G3Q0",
    images: [],
    year: "2018–2019",
    client: "",
    role: "Unity developer",
    timeline: "Ongoing, 2018–2019",
    team: "Solo",
    highlights: [
      "Prediction and reconciliation for fast rallies",
      "Fixed-timestep physics so both clients agree",
      "Global matchmaking"
    ],
    challenges: [
      {
        title: "Rallies faster than the round trip",
        body:
          "At rally speed the ball can cross a meaningful distance in the time a packet takes to arrive, so waiting for the server puts the paddle permanently behind. The client predicts locally and reconciles against authoritative updates, correcting smoothly rather than snapping the ball."
      },
      {
        title: "Physics disagreeing between devices",
        body:
          "Stepping physics on frame time means a 120Hz machine and a 30Hz machine compute different trajectories from the same inputs. Simulation moved to a fixed timestep decoupled from rendering, so the same rally resolves identically regardless of the hardware."
      }
    ]
  },
  {
    id: "cube-rivals",
    title: "Cube Rivals",
    tagline: "Multiplayer rocket-tag arena",
    description:
      "A multiplayer arena game where players score points by hitting each other with rockets. Built with Photon PUN for networking, with a simple, easy-to-read UI.",
    tags: ["Unity", "Multiplayer", "Photon"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/cube-rivals.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "6U4SLp3VXRU",
    images: [],
    year: "2018",
    client: "",
    role: "Unity developer",
    timeline: "4 weeks",
    team: "Solo",
    highlights: [
      "Photon PUN networking with master-client migration handled",
      "Lag-compensated rocket hit registration",
      "Deliberately plain, readable arena UI"
    ],
    challenges: [
      {
        title: "The host leaving mid-match",
        body:
          "With Photon's master client owning authoritative state, that player disconnecting can strand everyone else in a dead room. Room state is kept recoverable and master-client migration is handled explicitly, so the match continues with a new owner instead of collapsing."
      },
      {
        title: "Rockets that visually hit but didn't count",
        body:
          "Testing hits against where the server thinks a target is ignores that the shooter aimed at where they saw it, one round trip ago. Hit checks rewind target positions to the shooter's view at fire time, so a shot that looked good on screen registers."
      }
    ]
  },
  {
    id: "book-of-egyptian-adventures",
    title: "Book of Egyptian Adventures",
    tagline: "Egyptian-themed slot game",
    description:
      "Push the button and try your luck. An Egyptian-adventure-themed slot machine.",
    tags: ["Unity", "Slots / Casino"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/book-of-egyptian-adventures.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "",
    images: [],
    year: "2018",
    client: "",
    role: "Unity developer",
    timeline: "3 weeks",
    team: "Solo",
    highlights: [
      "Weighted reel strips driving a defined return-to-player",
      "Paytable and reel weights configurable without code changes",
      "Anticipation timing on near-misses"
    ],
    challenges: [
      {
        title: "Payouts that had to add up",
        body:
          "Slot maths is unforgiving: reel weights and the paytable together decide the long-run return, and getting it wrong by a little produces a game that either never pays or pays constantly. Reel strips and payouts are data, and expected return was simulated over large spin counts to confirm the configured target before shipping."
      },
      {
        title: "Spins that felt mechanical",
        body:
          "Stopping reels the instant the result was known made every spin feel identical and gave away outcomes early. Stop timing is staggered with easing and a held final reel, so a near-miss reads as a near-miss without changing the already-determined result."
      }
    ]
  },
  {
    id: "burning-coinman",
    title: "Burning Coinman",
    tagline: "2D crypto coin-collector",
    description:
      "An exhilarating 2D mobile game where collecting crypto coins comes with a twist. Collected coins are burned, reducing token supply and driving up value. Play as Coinman, gathering as many coins as possible before they turn to ash.",
    tags: ["Unity", "Mobile", "Web3"],
    status: "prototype",
    orientation: "landscape",
    image: "assets/games/burning-coinman.webp",
    playUrl: "",
    embedUrl: "",
    youtubeId: "WiTJg15_xiw",
    images: [],
    year: "2017",
    client: "",
    role: "Unity developer",
    timeline: "5 weeks",
    team: "Solo",
    highlights: [
      "Collected coins burn, tying the core loop to token supply",
      "Tuned for low-end Android hardware",
      "Burn feedback surfaced directly in the run"
    ],
    challenges: [
      {
        title: "Making a burn mechanic legible",
        body:
          "A supply reduction happening off-screen is invisible, and a mechanic players can't perceive doesn't influence how they play. Each collected coin visibly turns to ash with a running total for the session, so the economic idea is expressed through feedback rather than a menu."
      },
      {
        title: "Budget phones as the target, not an afterthought",
        body:
          "Building against a decent test device meant the game stuttered badly on the hardware most of the audience actually owned. Draw calls were batched, particle counts capped and texture sizes cut until it held a stable framerate on low-end Android."
      }
    ]
  }
];

/* TESTIMONIAL FIELDS
   quote      the review, verbatim, plain text          (required)
   project    the job/project title                      (optional)
   location   client's country/city, if shown             (optional)
   clientNote a standout client stat, e.g. big spend      (optional)
   rating     out of 5                                    (optional) */
const TESTIMONIALS = [
  {
    quote:
      "Fahad is knows what he is doing. He didnt have any problems with additional requests in terms of security implementation and I have already rehired him ;)",
    project: "Mini Game Development in Phaser or PixiJS",
    location: "Bratislava, Slovakia",
    clientNote: "",
    rating: 5.0
  },
  {
    quote: "Fahad is a very talented developer. Really appreciate your help, Fahad!",
    project: "Unity Dev Coach",
    location: "Boise, United States",
    clientNote: "",
    rating: 5.0
  },
  {
    quote:
      "It was a pleasure working with Fahad. He quickly understood the brief and handled every challenge we presented with ease. His strong grasp of key concepts made even complex tasks straightforward for him. I would gladly work with him again.",
    project: "HTML5 Game Developer, Phaser Integration",
    location: "Chesterfield, United Kingdom",
    clientNote: "",
    rating: 5.0
  },
  {
    quote: "Fahad is an expert in his field and I can highly recommend him!",
    project: "Fruit Ninja Clone in Phaser",
    location: "",
    clientNote: "",
    rating: 5.0
  },
  {
    quote:
      "Fahad completed the task successfully and showed great communication skills. We will make sure to come back to him for similar future tasks.",
    project: "Scratch Mechanics Script",
    location: "",
    clientNote: "",
    rating: 5.0
  }
];

/* COURSE FIELDS
   title, provider, date ("Jul 2026"), url (credential link, optional) */
const COURSES = [
  {
    title: "The Psychology of Games: Secrets of Good Game Design",
    provider: "Udemy",
    date: "Jul 2026",
    url: "https://www.udemy.com/certificate/UC-e00e6597-7ba5-4cd2-a086-ca3edc62d30f/"
  },
  {
    title: "Best Way to Learn German Language: Full Beginner (A1.1)",
    provider: "Udemy",
    date: "Jun 2026",
    url: "https://www.udemy.com/certificate/UC-c1ddff17-a3eb-4407-952a-fd863ee06597/"
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
    title: "Unity Multiplayer (Mirror): Intermediate C# & Networking",
    provider: "Udemy",
    date: "Dec 2022",
    url: "https://www.udemy.com/certificate/UC-06934b6d-475c-4ae7-aab9-042ac069261a/"
  },
  {
    title: "Unity Game Development: Build a Basketball Game",
    provider: "Udemy",
    date: "Jan 2019",
    url: "https://www.udemy.com/certificate/UC-Y95PPXVF/"
  }
];
