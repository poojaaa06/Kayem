export const allPosts = [
    {
        slug: "anatomy-of-a-thread",
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
        category: "Material Study",
        title: "The Anatomy of a Thread: Light, Twist, and the Geometry of Touch",
        excerpt:
            "Long before a fabric drapes, the yarn decides how it will move. A meditation on denier, lustre, and the quiet engineering inside every filament we spin in Surat.",
        date: "May 24, 2026",
        read: "8 min read",
        author: "Kishore Mehta",
        body: [
            {
                type: "lead",
                text: "Hold a single filament of 30-denier trilobal polyester up to morning light and watch what it does. It doesn't merely reflect — it refracts, bends the spectrum, fragments gold into a dozen quieter colours. That is not accident. It is geometry.",
            },
            {
                type: "h2",
                text: "What denier actually measures",
            },
            {
                type: "p",
                text: "Denier is weight per length: the mass in grams of 9,000 metres of a single filament. A lower number means a finer thread. A 15-denier filament is gossamer — roughly the diameter of a fine human hair, though far more uniform. At 70 denier you begin to feel the yarn between your fingertips as something with presence, with memory. Beyond 150 denier the fibre starts to carry structure rather than drape.",
            },
            {
                type: "p",
                text: "The denier decision is the first aesthetic decision a mill makes. Everything downstream — how a saree falls, whether a dupatta holds its pleat, how a shawl drapes from the shoulder — traces back to this single number chosen before a single spindle turns.",
            },
            {
                type: "image",
                src: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=8",
                caption: "Cross-sections of trilobal, round, and hollow filaments under polarised light — each profile bends incident light differently.",
            },
            {
                type: "h2",
                text: "The geometry of lustre",
            },
            {
                type: "p",
                text: "Round fibres are mirrors. Light strikes, reflects at a single angle, creates a hard highlight. This is the cold shine of commodity yarn — the kind that reads as synthetic from across a room. Trilobal fibres are prisms. Three flat faces intercept light at three different angles simultaneously. The result is a softer, more complex shimmer — closer to the way silk catches light because silk itself is roughly triangular in cross-section.",
            },
            {
                type: "blockquote",
                text: "We spent fourteen months perfecting the trilobal die geometry before we were satisfied. The difference between a 56° and a 60° included angle in the filament cross-section is invisible to any instrument we own — but your eye knows immediately.",
                attribution: "Kishore Mehta, on developing the Kayem Silk-Touch filament",
            },
            {
                type: "h2",
                text: "Twist and the architecture of touch",
            },
            {
                type: "p",
                text: "Twist per metre — TPI in the old imperial measure — determines how a yarn feels under the hand and how it behaves under tension. Low twist produces a soft, almost crumbling hand: the fibres lie parallel, compress easily, feel like down. High twist produces a hard, wiry yarn that springs back, holds its structure, sounds faintly crisp when rubbed. Weave engineers at the fabric mills we supply speak of twist the way musicians speak of key — the same melody played in a different key becomes a different emotional experience.",
            },
            {
                type: "p",
                text: "For our fancy yarns — the slub constructions, the air-textured multifilaments — twist is less a parameter and more a composition. A slub yarn contains zones of near-zero twist where the roving was allowed to billow before being captured, alternating with tight-twisted bridges that hold the structure. Under the right light, a fabric woven from slub yarn shows its rhythm. You can read the yarn's biography in the cloth.",
            },
        ],
        related: ["four-decades-of-spindle-memory", "why-drape-begins-at-70-denier"],
    },
    {
        slug: "four-decades-of-spindle-memory",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
        category: "Inside the Mill",
        title: "Four Decades of Spindle Memory",
        excerpt:
            "Inside our Surat facility, where 1985 machinery hums alongside the newest air-texturising lines.",
        date: "May 10, 2026",
        read: "6 min",
        author: "Aanya Mehta",
        body: [
            {
                type: "lead",
                text: "The oldest draw-texturising machine on our floor was commissioned in 1985. It is also, by some measures, the most reliable piece of equipment we own.",
            },
            {
                type: "p",
                text: "Walk into the main hall at the Surat facility and you move through three eras simultaneously. On the west wall: rows of original Barmag machines, their housings painted the particular shade of industrial cream that was fashionable in the mid-eighties. In the centre: a generation of machines from the late nineties, upgraded with digital tension sensors but still bearing their original mechanical hearts. Along the east wall: the new air-texturising lines, silent and precise, watched over by a single operator where once six would have stood.",
            },
            {
                type: "h2",
                text: "What the old machines know",
            },
            {
                type: "p",
                text: "There is a certain category of knowledge that lives in mechanical systems and nowhere else. The 1985 Barmag machines have been maintained, adjusted, and coaxed back from the edge of failure so many times that the engineers who work them have developed an almost tactile understanding of what they can and cannot do. They know, by sound, when the false-twist spindle is approaching the temperature at which yarn break frequency rises. They know, by vibration felt through a hand resting on the housing, when the feed rollers need attention.",
            },
            {
                type: "blockquote",
                text: "You cannot write down what forty years of listening teaches you. It lives in the hands. When a new engineer joins the line, I put their palm flat on the machine and say — feel that. That is what healthy sounds like.",
                attribution: "Suresh Patel, Senior Machine Operator, Kayem Surat",
            },
        ],
        related: ["anatomy-of-a-thread", "the-yarn-inspectors-quiet-hour"],
    },
    {
        slug: "why-drape-begins-at-70-denier",
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&q=80",
        category: "Craft",
        title: "Why Drape Begins at 70 Denier",
        excerpt:
            "A close read on the relationship between fibre weight, fall, and the architecture of a saree's pleat.",
        date: "April 28, 2026",
        read: "5 min",
        author: "Studio Notes",
        body: [
            {
                type: "lead",
                text: "The pleat of a saree is not just folding fabric. It is a structural decision encoded at the spinning stage, months before the cloth is woven.",
            },
            {
                type: "p",
                text: "Ask a drape specialist what separates a saree that falls well from one that merely hangs, and the answer will rarely begin with weave structure or fibre content. It will begin with weight. Specifically: the weight of the constituent filaments, and whether that weight is distributed as stiffness or as fall.",
            },
        ],
        related: ["anatomy-of-a-thread", "dyeing-in-the-dark"],
    },
    {
        slug: "dyeing-in-the-dark",
        img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=80",
        category: "Colour",
        title: "Dyeing in the Dark: The Search for Burgundy",
        excerpt:
            "Three years, eleven baths, one impossible red — the story behind our dope-dyed signature.",
        date: "April 12, 2026",
        read: "7 min",
        author: "Rishabh Mehta",
        body: [
            {
                type: "lead",
                text: "Burgundy is not a colour. It is a negotiation between red and darkness, and the terms shift with every batch of polymer, every change in humidity, every degree of temperature variation in the bath.",
            },
            {
                type: "p",
                text: "We began trying to match a swatch in 2021. The client — a heritage saree house in Banaras — had been buying the same burgundy for thirty years from a mill that had closed. They brought us three metres of the original. Under fluorescent light it read almost purple. In daylight it was a deep wine. In candlelight it came alive as something close to oxblood. We needed all three simultaneously.",
            },
        ],
        related: ["why-drape-begins-at-70-denier", "toward-a-greener-fancy-yarn"],
    },
    {
        slug: "the-yarn-inspectors-quiet-hour",
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80",
        category: "Hands",
        title: "The Yarn Inspector's Quiet Hour",
        excerpt:
            "What machines still cannot feel — a portrait of the people who finger-read every cone before it ships.",
        date: "March 30, 2026",
        read: "4 min",
        author: "Studio Notes",
        body: [
            {
                type: "lead",
                text: "Before any cone leaves the facility, a person holds it. Not to scan it, not to weigh it — to feel it.",
            },
            {
                type: "p",
                text: "The inspection station is a long table under a bank of full-spectrum fluorescent lights, positioned at the end of the packaging line. The inspectors — six of them on the day shift — stand rather than sit. They say you feel more standing up. The fingertips are more alert.",
            },
        ],
        related: ["four-decades-of-spindle-memory", "anatomy-of-a-thread"],
    },
    {
        slug: "toward-a-greener-fancy-yarn",
        img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80",
        category: "Futures",
        title: "Toward a Greener Fancy Yarn",
        excerpt:
            "Closed-loop water, recycled polymer, and a frank look at where speciality textiles need to go next.",
        date: "March 14, 2026",
        read: "6 min",
        author: "Aanya Mehta",
        body: [
            {
                type: "lead",
                text: "The speciality yarn industry has a problem it has been comfortable not naming. We are going to name it.",
            },
            {
                type: "p",
                text: "A tonne of dyed polyester yarn requires, on average, between 80 and 150 litres of water per kilogram in conventional dyeing processes. For a mill our size, running at full capacity, that number becomes consequential very quickly. The Tapi river, which runs through the district that made Surat the textile city it is, is not an infinite resource.",
            },
        ],
        related: ["dyeing-in-the-dark", "anatomy-of-a-thread"],
    },
];

export function getPost(slug: string) {
    return allPosts.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slugs: string[]) {
    return slugs.map((s) => allPosts.find((p) => p.slug === s)).filter(Boolean) as typeof allPosts;
}