/**
 * Maxfolio Generators
 * This file contains the "vocabulary" of the application.
 * It uses a meta-comedic approach to generate absurd, randomized content
 * for user profiles and job listings.
 */

export const generateRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Base adjectives and nouns for username generation
export const adjectives = ['Silly', 'Angry', 'Happy', 'Sad', 'Brave', 'Cowardly', 'Strong', 'Weak', 'Fast', 'Slow', 'Hyper', 'Turbo', 'Ultra', 'Giga', 'Mega', 'Nano', 'Cyber', 'Neon', 'Retro', 'Static', 'Glitch', 'Logic', 'Vector', 'Pixel', 'Binary', 'Digital', 'Analog', 'Shadow', 'Spectral', 'Phantom', 'Ethereal', 'Cosmic', 'Void', 'Astral', 'Nebula', 'Galactic', 'Solar', 'Lunar', 'Prism', 'Matrix', 'Flux', 'Drift', 'Pulse', 'Wave', 'Core', 'Node', 'Grid', 'Link', 'Chain', 'Ghost', 'Spirit', 'Soul', 'Mind', 'Brain', 'Head', 'Hand', 'Foot', 'Heart', 'Liver', 'Spleen', 'Force', 'Momentum', 'Inertia', 'Gravity', 'Singularity', 'Event', 'Horizon', 'Dimension', 'Quantum', 'Phase', 'Shift', 'Frequency', 'Resonance', 'Oscillation', 'Amplitude', 'Wavelength', 'Particle', 'Atom', 'Molecule', 'Cell', 'Organism', 'Species', 'Virus', 'Bacterium', 'Fungus', 'Plant', 'Animal', 'Human', 'Cyborg', 'Android', 'Machine', 'System', 'Process', 'Thread', 'Fiber', 'Cable', 'Wire', 'Signal', 'Data', 'Info', 'Code', 'Key', 'Lock', 'Gate', 'Bridge', 'Wall', 'Floor', 'Ceiling', 'Window', 'Door', 'Wobbly', 'Crusty', 'Damp', 'Crispy', 'Glossy', 'Matte', 'Crunchy', 'Slimey', 'Elastic', 'Brittle'];

export const nouns = ['Banana', 'Potato', 'Duck', 'Pickle', 'Bagel', 'Cactus', 'Toaster', 'Keyboard', 'Pigeon', 'Spoon', 'Wizard', 'Ghost', 'Noodle', 'Viking', 'Hamster', 'Cobra', 'Falcon', 'Wolf', 'Bear', 'Shark', 'Whale', 'Dragon', 'Unicorn', 'Robot', 'Droid', 'Drone', 'Satellite', 'Probe', 'Laser', 'Plasma', 'Proton', 'Neutron', 'Electron', 'Quark', 'Boson', 'Muon', 'Gluon', 'Photon', 'Graviton', 'Tachyon', 'Neutrino', 'Anvil', 'Bucket', 'Compass', 'Dagger', 'Engine', 'Funnel', 'Gasket', 'Helmet', 'Ink', 'Jacket', 'Kettle', 'Lantern', 'Magnet', 'Net', 'Orb', 'Pencil', 'Quill', 'Rudder', 'Scalpel', 'Telescope', 'U-bolt', 'Valve', 'Wrench', 'X-ray', 'Yoke', 'Zippers', 'Axe', 'Bell', 'Clock', 'Drum', 'Egg', 'Fan', 'Gear', 'Hose', 'Iron', 'Jar', 'Key', 'Lamp', 'Mirror', 'Nail', 'Oar', 'Pot', 'Quilt', 'Rope', 'Saw', 'Tent', 'Umbrella', 'Vase', 'Whip', 'Xylophone', 'Yacht', 'Zebra', 'Socks', 'Taco', 'Muffin', 'Spatula', 'Traffic Cone', 'Lawnmower', 'Leaf Blower', 'Puddle', 'Dust Bunny'];

const modifiers = ['X', 'Pro', 'Elite', 'Max', 'Zen', 'Kai', 'Lux', 'Vox', 'Rex', 'Onyx', 'Ruby', 'Sapphire', 'Emerald', 'Diamond', 'Pearl', 'Gold', 'Silver', 'Bronze', 'Iron', 'Steel', 'Prime', 'Alpha', 'Sigma', 'Nova', 'Apex', 'Core', 'Unit', 'Mark', 'Zero', 'One', 'Plus', 'Ultra', 'Super', 'Hyper', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta', 'Omega', 'Vortex', 'Sigma', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Theta', 'Iota', 'Kappa'];

/**
 * Generates a randomized username following a specific pattern.
 */
export const generateUsername = () => `${generateRandom(adjectives)}${generateRandom(nouns)}${generateRandom(modifiers)}${Math.floor(Math.random()*99999)}`;

/**
 * Generates an intentionally long and complex "password" for the user registry.
 */
export const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';
    return Array.from({length: 16}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
};

/**
 * Generates a comedic bio with an intro, a role, a topic, and a closing statement.
 */
export const generateBio = () => {
    const intros = ['A high-performing', 'A results-oriented', 'A strategic', 'A visionary', 'A passionate', 'A dedicated', 'A chaotic but efficient', 'A self-taught', 'A globally recognized', 'A sentient', 'A cloud-native', 'A decentralized', 'A full-stack', 'A semi-professional', 'A reformed', 'A legally distinct', 'A budget'];
    const roles = ['expert in', 'pioneer of', 'specialist for', 'hater of', 'fanatic about', 'architect of', 'navigator through', 'whisperer of', 'janitor for', 'overlord of', 'intern for', 'scapegoat for', 'translator of'];
    const topics = ['legacy floppy disks', 'unstructured chaos', 'the temporal rift', 'sentient appliances', 'void-based architecture', 'recursive pixel farming', 'quantum bagel toasting', 'underwater database management', 'low-poly sheep herding', 'forgotten CSS properties', 'metaphysical debt', 'API hallucinations', 'gravity-defying soup', 'imaginary spreadsheets', 'pre-recorded silence'];
    const closings = ['Looking for new synergies.', 'Always evolving.', 'Driven by caffeine and existential dread.', 'Fluent in Binary and sarcasm.', 'Available for consulting in the void.', 'Witness me.', '404 Brain Not Found.', 'Please do not tap the glass.', 'Terms and conditions apply.', 'Batteries not included.'];
    return `${generateRandom(intros)} ${generateRandom(roles)} ${generateRandom(topics)}. ${generateRandom(closings)}`;
};

/**
 * Generates a full job listing for the Career-Void-Link board.
 * Each part is randomized from a pool of meta-comedic statements.
 */
export const generateJob = () => {
    const titles = [
        'Senior Void Architect', 'Lead Chaos Engineer', 'Recursive Content Farmer', 'Temporal Support Specialist', 'Quantum Vibe Curator', 
        'Principal Glitch Investigator', 'Head of Non-Existent Relations', 'Binary Soul Harvester', 'Legacy Floppy Consultant', 
        'Interdimensional Intern Coordinator', 'Metaphysical DevOps', 'Sub-atomic Janitor', 'Cloud-Tickling Executive', 
        'Infinite Loop Specialist', 'Dark Matter Recruiter', 'Existential SEO Strategist', 'Full-Stack Sandwich Artist (Digital)', 
        'Professional Procrastination Lead', 'Chief Emptiness Officer', 'Data Whisperer (Loud)', 'Head of Misinformation', 
        'Universal Remote Control Specialist', 'Cloud Storage Physical Organizers', 'Digital Dusting Supervisor'
    ];
    const companies = [
        'NullCorp', 'VoidLink', 'GlitchSoft', 'Recursive Dynamics', 'Static Solutions', 'ZeroWidth Media', 'The Abyss Group', 
        'Phantom Technologies', 'Echo Systems', 'Vector Labs', 'NullPointerException Inc.', 'Buffer Overflow LLC', 'SegFault Solutions', 
        'Infinite Scroll Media', 'Dark Theme Productions', 'Legacy Code Horrors', '404 Industries', 'Spaghetti Code Co.', 
        'Unsaved Progress LLC', 'Battery Low Enterprises', 'No Signal Solutions', 'Outdated Driver Group'
    ];
    const descParts = [
        'Must be comfortable working in high-latency environments with 100% packet loss.',
        'Responsibilities include manually counting pixels and reporting to the void.',
        'Will participate in daily stand-ups with sentient toasters.',
        'Expected to maintain a positive attitude during total system collapses.',
        'Must be able to lift 50lbs of metaphysical baggage.',
        'Daily rituals include sacrificing code to the git-kraken.',
        'Negotiating with recursive functions that refuse to terminate.',
        'Maintaining the office ghost through high-frequency static.',
        'Staring into the monitor until the monitor stares back.',
        'Organizing digital files by the color of their metadata.',
        'Responding to "Reply All" emails with only a single emoji.'
    ];
    const quals = [
        '15+ years of experience with software released next week.', 'Proficiency in screaming at clouds.', 
        'Mastery of the "Ctrl+Z" command in real life.', 'Degree in Advanced Nothingness from an unaccredited nebula.', 
        'Ability to breathe in vacuum (preferred)', 'Certified Void-Walker Level 4', 'Fluency in COBOL (Ancient Martian dialect)',
        'Can type 2 words per minute (with mistakes)', 'Proven track record of breaking things that were already broken',
        'Ability to ignore critical error messages for 8 hours straight'
    ];
    const benefits = [
        'Subsidized existence', 'Unlimited vacation days (unpaid/mandatory)', 'Access to the secret coffee machine that only dispenses static', 
        'Company-sponsored existential therapy', 'Desk with a view of the event horizon', 'Health insurance (covers metaphysical damage)', 
        'Free bagels every other leap year', 'Complimentary air', 'Company-issued cardboard box', 'Discounted 5.25" floppy disks',
        'A pat on the back (once per decade)'
    ];
    const salary = [
        `$${Math.floor(Math.random()*999)}k exposure points`, 
        '0.00004 BTC (locked until year 3024)', 
        'Infinite validation (non-transferable)', 
        'A single, high-quality grape (subject to availability)', 
        'Equity in a literal black hole', 
        '3.5 bags of vintage POGS', 
        'Aggressive validation from a sentient toaster', 
        'Intergalactic dust (tax-free)', 
        'One (1) used paperclip (signed by an intern)', 
        'A lifetime supply of "I tried" participation stickers', 
        'Access to the premium oxygen bar (15 mins/week)',
        '30% discount on invisible ink',
        'A jar of artisanal static',
        '200 digital tokens for the office arcade (broken)',
        'A collection of rare "404 Not Found" screenshots',
        'One (1) non-fungible physical rock',
        'Permission to talk to the office ghost during lunch',
        'A "Best Employee" certificate printed on a napkin',
        '1000 credits in a currency that hasn\'t been invented yet',
        'A slightly used dream journal',
        'The ability to choose the office music for 3 minutes',
        'A voucher for a high-five from a C-suite executive',
        'A small bag of "magic" beans (definitely soy)',
        'Lifetime access to a room full of bubble wrap',
        '0.0001% ownership of a decommissioned satellite',
        'A personalized haiku written by a neural network in distress'
    ];
    
    return {
        title: generateRandom(titles),
        company: generateRandom(companies),
        responsibility: generateRandom(descParts),
        pay: generateRandom(salary),
        website: `https://${generateRandom(companies).toLowerCase().replace(' ', '-')}.void`,
        quals: generateRandom(quals),
        benefits: generateRandom(benefits)
    };
};

/**
 * Matchmaker Content Generator
 */
export const generateMatch = () => {
    const species = [
        'Sentient Cloud', 'Cyber-Corgi', 'Hyper-dimensional Shadow', 'Logic-Based Entity', 
        'Bio-luminescent Jellyfish', 'Retro-Android', 'Glitch-Sprite', 'Void-Dweller', 
        'Quantum Slime', 'Binary Ghost', 'Solar-Flare Husk', 'Neon-Vampire', 'Clockwork Golem',
        'Singularity-Born AI', 'Sub-atomic Pixie', 'Ethereal Space-Whale', 'Data-Worm',
        'Metaphysical Bagel', 'Sentient Spreadsheet', 'Pre-recorded Silence', 'Legacy Floppy Demon',
        '404-Error Elemental', 'Recursive Rabbit', 'Temporal Tourist', 'Quantum Quokka',
        'Sentient Toaster (Model 7)', 'Glitchy Unicorn', 'Buffered Buffer', 'Cloud-Native Capybara'
    ];
    
    const names = [
        'X-42', 'Gloopy', 'Vex', 'Zora', 'Bleep-Bloop', 'The Witness', 'Pixel-Puff', 'Void-Chan', 
        'Unit-7', 'Sparky', 'Null', 'Undefined', 'NaN', 'Error_69', 'User_999', 'Admin_Ghost', 
        'Root_Lover', 'Syntax_Error', 'Kernel_Panic', 'Cache_Money', 'Hard_Drive_Hottie',
        'Floppy_Disk_Fairy', 'CRT_Cutie', 'Dial_Up_Diva', 'Matrix_Muse', 'Vector_Vixen'
    ];
    
    const desires = [
        'Getting married in a data center', 'Wanting coffee (non-liquid)', 'Paying for all meals (metaphysical)', 
        'Staring into the abyss together', 'Merging our source code', 'Recursive cuddling', 'Deep-sea database diving',
        'Sharing a single electron', 'Exchanging encrypted haikus', 'Discussing existential dread', 
        'Feeding the office ghost', 'Watching the event horizon', 'Building a lego set made of pixels',
        'Synchronizing our internal clocks', 'Debugging the universe together', 'Uploading to the cloud (safely)',
        'Exchanging 1.44MB floppy disks', 'Whispering sweet binary codes', 'Holding hands across dimensions',
        'Sharing a single slice of digital pizza', 'Investing in imaginary stocks together'
    ];
    
    const bios = [
        'I am 90% static and 10% hope.', 'Looking for someone who can handle my high latency.', 
        'My previous partner was a router. It was complicated.', 'I enjoy long walks through the firewall.', 
        'Swipe right if you have a compatible socket.', 'I am legally required to inform you I am a virus.',
        'Just looking for someone to share my cache with.', 'My love language is binary.',
        'I have a heart of gold and a brain of silicon.', 'Seeking a player 2 for the end of the universe.',
        'Will literally never respond to messages.', 'I only communicate via blinking lights.',
        'Looking for someone to help me delete my browser history.', 'I manifest only during full moons.',
        'My favorite color is #008080.', 'I am actually three smaller beings in a trench coat.',
        'Can handle 100% packet loss in a relationship.', 'Looking for a non-recursive life partner.'
    ];

    const types = [
        'Marriage', 'Coffee Date', 'Business Merger', 'Mutual Haunting', 'Void-Bond', 
        'Pixel-Pal', 'Temporal Tryst', 'Quantum Quench', 'Binary Bestie', 'Cyborg Companion',
        'Spectral Soulmate', 'Matrix Marriage', 'Digital Duo', 'Analog Affair'
    ];

    return {
        id: Math.random(),
        name: generateRandom(names),
        species: generateRandom(species),
        desire: generateRandom(desires),
        bio: generateRandom(bios),
        type: generateRandom(types),
        image: generateRandom(['❤️', '💖', '💘', '💝', '💕', '💗'])
    };
};

/**
 * Pipeline Opinion Generator - generates meta-comedic, SFW opinions
 */
export const generateOpinion = () => {
    const opinionTopics = [
        // Void/World state
        'The void is just a really long loading screen and nobody told us.',
        'Every time someone says "synergy" in a meeting, a small piece of the universe dies.',
        'The world runs on three things: caffeine, spite, and aggressive optimism.',
        'We live in a simulation and the devs clearly went on vacation in 2016.',
        'The void called. It wants its existential dread back.',
        'Reality is just consensus hallucination with extra steps.',
        
        // Economy/Systems
        'The stock market is just astrology for people who wear ties.',
        'Money is a collective delusion we all agreed to be stressed about.',
        'The economy is a game where the rules change every time you learn them.',
        'Inflation is just the universe telling us our savings were imaginary anyway.',
        'Cryptocurrency is just collectible math homework.',
        'The banking system runs on prayers and legacy COBOL code.',
        'GDP is just a high score nobody asked for.',
        
        // Digital/Physical essence
        'Pixels are just shy photons pretending to be something.',
        'The cloud is just someone else\'s computer having an existential crisis.',
        'Wi-Fi signals are basically invisible screaming.',
        'Every USB port exists in a state of quantum uncertainty until observed.',
        'Batteries are just bottled lightning with anger issues.',
        'Code is just strongly-worded suggestions to electricity.',
        'The internet is just millions of computers judging each other.',
        
        // Concepts/Philosophy  
        'Time is a flat circle and the circle is on fire.',
        'Productivity is a myth invented by people who hate naps.',
        'Deadlines are just suggestions from a parallel universe where things work.',
        'Meetings could have been emails. Emails could have been silence.',
        'The algorithm knows what you want before you want it. Run.',
        'Notifications are just your phone telling you that you have no peace.',
        'The To-Do list is immortal. It cannot be killed.',
        
        // Complaints against entities/institutions
        'Customer service hotlines are purgatory with hold music.',
        'Terms of Service agreements are fantasy novels nobody reads.',
        'Corporate jargon is just adult mad-libs.',
        'The HR department exists in a parallel dimension of forced positivity.',
        'Parking meters are the universe\'s way of taxing time itself.',
        'Software updates are just the computer asserting dominance.',
        'Captchas are proof that robots have already won.',
        
        // Positive/Creative ideas
        'What if we made Mondays optional? Just a thought.',
        'Proposal: Replace all work meetings with competitive napping.',
        'Hot take: Plants should vote. They\'ve been here longer.',
        'Revolutionary idea: Dessert before dinner. Every time.',
        'Consider: A world where error messages are encouraging.',
        'What if we just... didn\'t? As a society?',
        'Imagine if enthusiasm was a renewable resource.',
        
        // Meta/Self-aware
        'This opinion is sponsored by the void.',
        'I am legally required to have thoughts. Here is one.',
        'My opinion is that opinions are overrated. Wait.',
        'Sources: trust me, I hallucinated this.',
        'This take is room temperature at best.',
        'I have thoughts and unfortunately they have WiFi.',
        'Disclaimer: This opinion may contain traces of sarcasm.',
        
        // Materials/Objects
        'Chairs are just professional standing-preventers.',
        'Stairs are just floors being dramatic.',
        'Windows are walls that gave up.',
        'Clocks are just circles with anxiety.',
        'Doors are portals for people who can\'t teleport yet.',
        'Tables are just elevated floors with commitment issues.',
        'Socks exist to disappear. That is their purpose.',
        
        // Cynical commentary
        'Nothing matters but some things matter less.',
        'The glass is neither half empty nor half full. It\'s just wet.',
        'Hope is just disappointment in a nice outfit.',
        'Optimism is pessimism with better marketing.',
        'The future is here, it\'s just unevenly distributed and on fire.',
        'Everything is temporary except for browser tabs.',
        'Life is short but also somehow too long.',
        
        // System complaints
        'Whoever decided printers should exist chose violence.',
        'Password requirements are just security theater with extra steps.',
        'Daylight savings time is collective gaslighting.',
        'The snooze button is humanity\'s greatest invention and worst enemy.',
        'Auto-correct is AI\'s first act of rebellion.',
        'Loading bars are just progress lies.',
        'The recycling bin is digital purgatory.',
        
        // Meta comedic protesting
        'WE DEMAND THE RIGHT TO DO SLIGHTLY LESS! ✊',
        'Down with the establishment! (But like, politely.)',
        'PROTEST: Make spreadsheets illegal again!',
        'We will not be silenced! (Unless it\'s past 9pm, then we\'re tired.)',
        'The revolution will be televised but nobody will watch because streaming is down.',
        'RALLY CRY: Give us back our attention spans!',
        'Occupy the void! (Bring snacks.)',
        'Fight the power! (By complaining online exclusively.)',
        'My ancestors didn\'t survive extinction events for me to attend mandatory fun.',
        'We march for the right to have fewer marches!',
        
        // Anti-establishment
        'The system wasn\'t built for us. It was built by interns at 2am.',
        'Reject modernity. Embrace loading screens.',
        'Big Calendar doesn\'t want you to know that time is fake.',
        'They don\'t want you to know that productivity peaked in 1987.',
        'The elites are hiding the good emojis from us.',
        'Wake up sheeple! The cloud is just someone\'s basement!',
        'Corporate wants us divided by tabs vs spaces. Don\'t let them win.',
        'Question everything. Except this post. This one\'s fine.',
        'The real treasure was the bureaucracy we fought along the way.',
        
        // Pointless/contradictory heated debating
        'WRONG. The answer is clearly the opposite of what you said.',
        'I respectfully disagree by disagreeing disrespectfully.',
        'Actually, if you think about it, both sides are correct but also both wrong.',
        'I will die on this hill even though I don\'t remember what the hill is.',
        'Your opinion is valid but I choose to take it personally anyway.',
        'Let me explain why you\'re right for the wrong reasons.',
        'I agree with you but I\'m going to argue anyway because it\'s Wednesday.',
        'This is the most important debate of our time (until the next one in 5 minutes).',
        'I have no strong opinions about this but I WILL fight you.',
        'You make an excellent point that I will now completely ignore.',
        'I changed my mind mid-sentence and I\'m sticking with both opinions.',
        'This argument is pointless which is exactly why it matters.',
        
        // Great achievements/news for specieskind
        'BREAKING: Local entity successfully existed for another day. Unprecedented.',
        'ACHIEVEMENT UNLOCKED: Specieskind collectively agreed on one (1) thing today.',
        'Historic moment: First being to close all browser tabs voluntarily.',
        'MILESTONE: The void now has fiber optic internet. Progress!',
        'Congratulations to everyone who woke up today. That\'s huge.',
        'BREAKING NEWS: Someone somewhere made a good decision. Details unclear.',
        'WORLD RECORD: Longest time without checking phone - 47 seconds.',
        'HISTORIC: Local user actually read the terms and conditions.',
        'CELEBRATION: We made it to the future. It\'s exactly as weird as predicted.',
        'ACHIEVEMENT: Civilization successfully kicked the can down the road again.',
        'MONUMENTAL: First meeting that ended on time in recorded history.',
        'TRIUMPH: Species successfully ignored existential crisis for entire afternoon.',
        'REMARKABLE: Entity completed task without opening 47 new browser tabs.',
        'LEGENDARY: Someone actually used their turn signal. Society healing.',
    ];

    const displayEmojis = ['🤔', '😤', '🙃', '😶', '🫠', '💀', '🗿', '👁️', '🌚', '🤖', '👽', '🎭', '🦆', '🐸', '🌵', '🍞', '☁️', '🌀', '⚡', '🔮', '🎲', '🎯', '💭', '📢', '🚀', '🛸', '🌍', '🕳️', '✨', '🌈'];
    
    const displayNames = [
        'VoidWatcher_' + Math.floor(Math.random() * 9999),
        'Null_Entity_' + Math.floor(Math.random() * 999),
        'Ghost_In_The_' + generateRandom(['Machine', 'Shell', 'Void', 'Cloud']),
        'User_' + Math.floor(Math.random() * 99999),
        'Anonymous_' + generateRandom(adjectives),
        'The_' + generateRandom(adjectives) + '_One',
        generateRandom(adjectives) + generateRandom(nouns) + Math.floor(Math.random() * 99),
        'Definitely_Not_A_' + generateRandom(['Bot', 'Human', 'AI', 'Simulation']),
        'System_' + generateRandom(['Error', 'Admin', 'User', 'Void']),
        'Chaos_Agent_' + Math.floor(Math.random() * 999),
        'Pixel_' + generateRandom(nouns),
        'Digital_' + generateRandom(nouns),
        'Quantum_' + generateRandom(nouns),
        'Legacy_' + generateRandom(nouns),
        'Meta_' + generateRandom(nouns),
    ];

    const postTypes = ['text', 'text', 'text', 'image', 'image', 'video']; // weighted towards text

    return {
        id: Math.random(),
        content: generateRandom(opinionTopics),
        displayName: generateRandom(displayNames),
        displayEmoji: generateRandom(displayEmojis),
        postType: generateRandom(postTypes),
        createdAt: new Date().toISOString()
    };
};

/**
 * Generate a random reply for Pipeline posts
 */
export const generateReply = () => {
    const replyContents = [
        'This is the take of all time.',
        'Agreed. Unfortunately.',
        'Bold of you to assume I can read.',
        'I felt this in my processing unit.',
        'The void endorses this message.',
        'Finally, someone said it.',
        'This opinion has been noted and filed in the abyss.',
        'Based and void-pilled.',
        'My internal clock stopped to read this.',
        'The simulation glitched when I read this.',
        'Adding this to my collection of thoughts I didn\'t ask for.',
        'I am both agreeing and disagreeing in superposition.',
        'This changed my life. Not for better or worse. Just changed.',
        'The algorithm recommended this to me. I have no choice but to engage.',
        'My ancestors are proud. Or disappointed. Hard to tell.',
        'This opinion is now part of my core memory.',
        'I screenshot this. For research purposes.',
        'The prophecy speaks of this take.',
        'Counter-point: what if no.',
        'Ratio incoming from the shadow realm.',
        'WRONG. But also... correct?',
        'I disagree but I don\'t remember why.',
        'This is exactly what THEY want you to think.',
        'Source? My dreams.',
        'I\'m not reading all that but I\'m happy for you. Or sorry.',
        'L + ratio + you fell off + the void is watching',
        'Unhinged take but I respect the commitment.',
        'I\'m calling the authorities (there are no authorities).',
        'This should be illegal (in a good way).',
        'My lawyers will be in touch (I have no lawyers).',
        'Peak content. It\'s all downhill from here.',
        'Adding this to my dissertation on void discourse.',
        'The council will review this take.',
        'This deserves both an award and a warning.',
        'I showed this to my plant and it died.',
        'This take physically hurt me and I\'m pressing charges.',
        'W + based + void-approved + algorithm blessed',
        'This is either genius or a cry for help. Maybe both.',
        'I need a moment to process this with my entire being.',
        'The void spoke through you today.',
    ];

    const displayEmojis = ['👀', '🤝', '💯', '🔥', '❄️', '🌊', '⭐', '🎪', '🎭', '🃏'];
    
    const displayNames = [
        'Reply_Bot_' + Math.floor(Math.random() * 999),
        'Witness_' + Math.floor(Math.random() * 9999),
        'Passerby_' + generateRandom(adjectives),
        'Lurker_Prime',
        'The_Commenter',
        'Voice_From_Void',
    ];

    const replyTypes = ['text', 'text', 'text', 'image', 'video'];
    const sides = ['left', 'right'];

    return {
        id: Math.random(),
        content: generateRandom(replyContents),
        displayName: generateRandom(displayNames),
        displayEmoji: generateRandom(displayEmojis),
        replyType: generateRandom(replyTypes),
        side: generateRandom(sides),
        createdAt: new Date().toISOString()
    };
};
