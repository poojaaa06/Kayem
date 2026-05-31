export type BlogPost = {
    slug: string;
    img: string;
    category: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    read: string;
    author: string;
    authorRole?: string;
};

export const blogPosts: BlogPost[] = [
    {
        slug: "anatomy-of-a-thread",
        img: "/images/saree1.png",
        category: "Material Study",
        title: "The Anatomy of a Thread: Light, Twist, and the Geometry of Touch",
        excerpt: "Long before a fabric drapes, the yarn decides how it will move. A meditation on denier, lustre, and the quiet engineering inside every filament we spin in Surat.",
        content: `
            <p class="lead">Every thread begins as a whisper. A single filament of polymer, extruded through a spinneret finer than a human hair, cooling as it falls into a water bath. But long before that moment of creation, the yarn has already decided how it will behave — how it will catch light, how it will twist, how it will eventually drape across a shoulder or gather into a curtain's fold.</p>
            
            <h2>The Geometry of Light</h2>
            <p>At KAYEM, we think about thread not as a single entity but as a conversation between several variables: denier (thickness), twist per inch (TPI), and lustre (the way light bounces off the filament's surface). A high-twist crepe yarn, for instance, creates a pebbled texture that scatters light, producing a matte finish that feels dry and crisp to the touch. Conversely, a low-twist filament allows light to travel uninterrupted along the fibre, creating a glossy, fluid surface that mimics silk.</p>
            
            <p>This is not merely aesthetic — it is structural. The sarees woven from our nylon crepe yarns hold their pleats without ironing. The dress materials made from our viscose ATY drape with a weightlessness that belies their durability.</p>
            
            <h2>Denier: The Architect of Touch</h2>
            <p>Denier measures the weight in grams of 9,000 metres of filament. At 20 denier, a yarn is almost invisible — used for ultra-sheer fabrics that float. At 500 denier, it becomes a robust thread for upholstery, designed to withstand years of friction and sunlight.</p>
            
            <p>But denier alone does not determine hand-feel. The air-texturising (ATY) process, which we have perfected over three decades, creates loops and bulks that transform a smooth filament into a yarn with the organic character of spun cotton. It is this hybrid quality — the strength of synthetic with the breathability of natural — that defines our specialty.</p>
            
            <h2>The Quiet Engineering</h2>
            <p>Walk through our Surat facility, and you will hear it before you see it: the steady hum of draw-texturising machines, the soft hiss of air jets, the rhythmic clack of wooden bobbins. Each sound corresponds to a specific transformation — the stretching of molecular chains, the entangling of filaments, the careful calibration of heat and tension.</p>
            
            <p>Our yarn does not announce itself. It prefers to work from the shadows, becoming the unseen infrastructure of beautiful fabric. But for those who know where to look, every thread tells a story.</p>
            
            <p class="signature">— Kishore Mehta, Founder & Chairman</p>
        `,
        date: "May 24, 2026",
        read: "8 min read",
        author: "Kishore Mehta",
        authorRole: "Founder & Chairman",
    },
    {
        slug: "four-decades-of-spindle-memory",
        img: "/images/blog-2.jpg",
        category: "Inside the Mill",
        title: "Four Decades of Spindle Memory",
        excerpt: "Inside our Surat facility, where 1985 machinery hums alongside the newest air-texturising lines.",
        content: `
            <p>The year is 1985. Surat is transforming from a small trading town into India's synthetic textile capital. In a modest factory on the city's outskirts, a single spinning line begins to turn — its rhythm marking the birth of KAYEM Synthetics.</p>
            
            <h2>Machines That Remember</h2>
            <p>Forty years later, that original spinning line still runs. Not as a museum piece, but as a working machine, producing yarn alongside our newest generation of air-texturising equipment. Its bearings have been replaced, its drive belts upgraded, but its fundamental geometry remains unchanged — a testament to an era when machinery was built to last decades, not seasons.</p>
            
            <p>"Older machines have a soul," says Ramesh Iyer, our Master of Looms, who has been with KAYEM since 1987. "You learn their rhythms, their moods. A new machine runs perfectly from day one. An old machine demands that you listen."</p>
            
            <h2>The Hum of Progress</h2>
            <p>Today, our facility houses three generations of spinning technology. The 1985 line handles our classic nylon plain yarns — steady, reliable, unchanged in formula for forty years. The 2005 expansion introduced our first ATY (air-texturised yarn) capability, allowing us to create the soft, silk-like textures that became our signature. And the newest lines, installed in 2020, bring computer-controlled tension systems and real-time quality monitoring.</p>
            
            <p>Yet walking through the factory floor, you cannot always tell which machine is which. The hum is continuous — a chord of industrial music that has played, without interruption, for four decades.</p>
            
            <h2>Beyond the Machine</h2>
            <p>What a machine cannot measure, a human hand can. Our yarn inspectors — many of whom have been with us for twenty-five years or more — run every cone through their fingers before it ships. They feel for slubs, for unevenness, for the subtle variations that even the most sensitive sensors might miss.</p>
            
            <p>"The machine counts," one inspector told me. "But the hand remembers."</p>
            
            <p class="signature">— Aanya Mehta, Director of Innovation</p>
        `,
        date: "May 10, 2026",
        read: "6 min",
        author: "Aanya Mehta",
        authorRole: "Director, Innovation",
    },
    {
        slug: "why-drape-begins-at-70-denier",
        img: "/images/blog-3.jpg",
        category: "Craft",
        title: "Why Drape Begins at 70 Denier",
        excerpt: "A close read on the relationship between fibre weight, fall, and the architecture of a saree's pleat.",
        content: `
            <p>In the saree-making districts of Varanasi, Kanchipuram, and Surat, there is a question that weavers ask before any other: "What denier?" Not the colour, not the lustre, but the weight of the yarn. Because before a saree can drape, before its pleats can hold, the yarn must first decide how it will behave under gravity.</p>
            
            <h2>The Science of Fall</h2>
            <p>Denier, as we discussed in our previous essay, measures the weight of 9,000 metres of filament. But for a saree, denier translates directly into fall — the way the fabric cascades from the shoulder to the ankle, gathering in pleats at the waist before flaring outward.</p>
            
            <p>A 50 denier yarn produces a saree that floats, almost ethereal, with pleats that shift with every step. A 120 denier yarn creates a fabric with structure — pleats that hold their shape through an entire evening. And a 200 denier yarn, rarely used for sarees but common in dress materials, produces a fabric that stands away from the body, creating volume and silhouette.</p>
            
            <h2>The 70 Denier Sweet Spot</h2>
            <p>At KAYEM, we have spent years refining our 70 denier yarns. Why 70? Because it represents the ideal balance between weight and fluidity — heavy enough to drape elegantly, light enough to feel effortless against the skin.</p>
            
            <p>But denier alone is not enough. The twist per inch (TPI) must also be calibrated. A 70 denier yarn with low twist (200 TPI) will have a smooth, glossy surface and a fluid drape. The same denier with high twist (800 TPI) will produce a crepe texture — slightly pebbled, with a dry hand and a drape that holds sharper pleats.</p>
            
            <h2>The Weaver's Choice</h2>
            <p>We do not dictate which denier a weaver should use. Instead, we offer a palette — from 50D to 500D — and trust the hands that have been weaving for generations to make the right choice. A master weaver in Varanasi knows that a Banarasi saree requires a different denier than a Georgette. A textile designer in Mumbai knows that a curtain needs a heavier yarn than a dress material.</p>
            
            <p>Our job is to provide the raw material. The art belongs to them.</p>
            
            <p class="signature">— Studio Notes</p>
        `,
        date: "April 28, 2026",
        read: "5 min",
        author: "Studio Notes",
        authorRole: "Design Team",
    },
    {
        slug: "dyeing-in-the-dark-search-for-burgundy",
        img: "/images/blog-4.jpg",
        category: "Colour",
        title: "Dyeing in the Dark: The Search for Burgundy",
        excerpt: "Three years, eleven baths, one impossible red — the story behind our dope-dyed signature.",
        content: `
            <p>Colour is the oldest argument in textile making. Ask ten dyers to define burgundy, and you will receive ten different answers. Some will describe a wine-dark red with purple undertones. Others will insist on a brownish crimson, closer to dried blood than to Bordeaux.</p>
            
            <p>At KAYEM, we spent three years and eleven dye baths finding our answer.</p>
            
            <h2>The Problem with Red</h2>
            <p>Red is the most unstable colour in the dyer's palette. Unlike blue or yellow, which bond predictably to synthetic fibres, red pigments tend to shift under heat, migrate during washing, and degrade under UV light. A burgundy that looks perfect on the cone may appear brown under fluorescent lighting or purple in direct sunlight.</p>
            
            <p>Our clients demanded consistency. Not "close enough." Not "within tolerance." But a burgundy that would look identical whether viewed in a Surat showroom, a Mumbai boutique, or a Delhi textile fair.</p>
            
            <h2>Eleven Attempts</h2>
            <p>Bath one: too purple. Bath three: too brown. Bath five: perfect in shade, unstable in wash-fastness. Bath seven: colour held, but lustre was compromised. Bath nine: the pigment migrated to the surface, leaving white spots. Bath eleven: at 3 AM on a Tuesday in July, our dyeing master finally held up a cone that glowed — deep, resonant, unwavering.</p>
            
            <p>"That's the one," he said. And it was.</p>
            
            <h2>Beyond Burgundy</h2>
            <p>Today, our dope-dyed collection includes over forty colours — from midnight navy to emerald green, from charcoal grey to ivory. Each one developed through the same painstaking process, each one tested for light-fastness, wash-fastness, and rub-fastness.</p>
            
            <p>But burgundy remains our signature. Not because it is the most popular colour, but because it taught us what it means to pursue perfection: slowly, stubbornly, without compromise.</p>
            
            <p class="signature">— Rishabh Mehta, Technical Director</p>
        `,
        date: "April 12, 2026",
        read: "7 min",
        author: "Rishabh Mehta",
        authorRole: "Technical Director",
    },
    {
        slug: "yarn-inspector-quiet-hour",
        img: "/images/blog-5.jpg",
        category: "Hands",
        title: "The Yarn Inspector's Quiet Hour",
        excerpt: "What machines still cannot feel — a portrait of the people who finger-read every cone before it ships.",
        content: `
            <p>The factory is loud. Machines hum, air jets hiss, and the conveyor belts click with mechanical precision. But in the inspection room, there is only silence — and the soft rustle of yarn passing through human fingers.</p>
            
            <p>Meet Radha. She has been inspecting yarn at KAYEM for twenty-two years. In that time, she has touched approximately 1.4 million cones of yarn — enough to circle the earth three times.</p>
            
            <h2>The Unwritten Manual</h2>
            <p>"The machine measures," Radha explains, pulling a cone from the inspection line. "It can detect variations in thickness, in colour, in twist. But the machine cannot feel."</p>
            
            <p>She runs the yarn between her thumb and forefinger, eyes half-closed. "Too smooth — means the lubricant was uneven. Too rough — means the ATY jets were misaligned. A catch in the filament — that's a broken fibre that the sensor missed."</p>
            
            <p>She sets the cone aside. "This one goes back."</p>
            
            <h2>Finger-Reading</h2>
            <p>Finger-reading is not a skill that can be taught from a manual. It is learned over years, through thousands of cones, through the gradual calibration of touch against quality standards. Radha's fingers have developed calluses in specific places — a map of her expertise, written in skin.</p>
            
            <p>"New inspectors always squeeze too hard," she says, laughing. "They think pressure reveals more. But the yarn tells you what it needs. You just have to listen."</p>
            
            <h2>The Last Check</h2>
            <p>Every cone that leaves KAYEM passes through human hands. Not because our machines are inadequate — we use the most advanced optical sensors available — but because touch remains the final, unautomated quality check.</p>
            
            <p>"The customer will feel this yarn," Radha says. "When they weave it, when they wear it, when their hand runs across the finished fabric. I want that moment to be good."</p>
            
            <p class="signature">— Studio Notes</p>
        `,
        date: "March 30, 2026",
        read: "4 min",
        author: "Studio Notes",
        authorRole: "Design Team",
    },
    {
        slug: "toward-a-greener-fancy-yarn",
        img: "/images/blog-6.jpg",
        category: "Futures",
        title: "Toward a Greener Fancy Yarn",
        excerpt: "Closed-loop water, recycled polymer, and a frank look at where speciality textiles need to go next.",
        content: `
            <p>The textile industry has a weight problem — not just in denier, but in environmental impact. Synthetic yarns, for all their durability and versatility, come with a carbon cost that cannot be ignored.</p>
            
            <p>At KAYEM, we have begun the long, difficult work of change.</p>
            
            <h2>Closed-Loop Water</h2>
            <p>Our dyeing facility now operates on a closed-loop water system. Every litre of water used in the dyeing process is captured, filtered, and reused. The result: a 92% reduction in water consumption over five years.</p>
            
            <p>"It wasn't easy," admits our environmental officer. "The filtration system cost more than the dyeing machines themselves. But there is no alternative. Freshwater is not infinite."</p>
            
            <h2>Recycled Polymer</h2>
            <p>We now offer nylon yarns made from 30% post-industrial recycled polymer — waste material from our own production process, ground down and re-extruded into new filament. The quality is indistinguishable from virgin nylon, but the carbon footprint is significantly lower.</p>
            
            <p>Can we reach 50%? 70%? We are working on it. But the technical challenges are real. Recycled polymer behaves differently under heat, with a narrower processing window and greater batch-to-batch variation. The solution is not simple — but it is necessary.</p>
            
            <h2>The Road Ahead</h2>
            <p>We do not pretend to have solved the sustainability challenge. Our industry still relies too heavily on fossil fuels, on single-use packaging, on supply chains that span continents. But we are committed to asking the hard questions — and to sharing our answers, even when they are incomplete.</p>
            
            <p>The next decade will define textile manufacturing for the century to come. We intend to be part of the solution.</p>
            
            <p class="signature">— Aanya Mehta, Director of Innovation</p>
        `,
        date: "March 14, 2026",
        read: "6 min",
        author: "Aanya Mehta",
        authorRole: "Director, Innovation",
    },
];