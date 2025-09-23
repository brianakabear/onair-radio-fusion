export const musicNewsTemplates = [
  {
    category: "Caribbean Culture",
    templates: [
      {
        title: "Caribbean Music Festival Season: What to Expect This Year",
        excerpt: "The Caribbean festival circuit is heating up with exciting lineups featuring both legendary artists and rising stars.",
        topics: ["festivals", "live music", "Caribbean events", "artist lineups"]
      },
      {
        title: "The Rise of Caribbean Fusion: Blending Traditional and Modern Sounds",
        excerpt: "How contemporary Caribbean artists are innovating while honoring traditional musical roots.",
        topics: ["music evolution", "cultural preservation", "modern Caribbean"]
      },
      {
        title: "Island Rhythms Going Global: Caribbean Music's International Impact",
        excerpt: "Exploring how Caribbean music continues to influence mainstream pop, hip-hop, and electronic music worldwide.",
        topics: ["global influence", "crossover success", "cultural export"]
      }
    ]
  },
  {
    category: "Artist Spotlight",
    templates: [
      {
        title: "Rising Star Alert: New Caribbean Artists Making Waves",
        excerpt: "Discover the next generation of Caribbean musicians who are reshaping the sound of island music.",
        topics: ["emerging artists", "new releases", "talent discovery"]
      },
      {
        title: "Veteran Voices: Celebrating Caribbean Music Legends",
        excerpt: "Honoring the pioneers who laid the foundation for today's Caribbean music scene.",
        topics: ["music legends", "career retrospectives", "musical legacy"]
      },
      {
        title: "Collaboration Nation: Caribbean Artists Crossing Borders",
        excerpt: "The most exciting international collaborations bringing Caribbean flavors to the world stage.",
        topics: ["collaborations", "cross-cultural music", "international features"]
      }
    ]
  },
  {
    category: "Music Technology",
    templates: [
      {
        title: "Studio Innovation: How Technology is Shaping Caribbean Music Production",
        excerpt: "From traditional recording techniques to cutting-edge digital production, see how Caribbean music is embracing technology.",
        topics: ["music production", "studio technology", "digital innovation"]
      },
      {
        title: "Streaming Success: Caribbean Artists in the Digital Age",
        excerpt: "How streaming platforms have opened new opportunities for Caribbean musicians to reach global audiences.",
        topics: ["streaming platforms", "digital distribution", "online promotion"]
      },
      {
        title: "Virtual Concerts and Digital Festivals: The Future of Caribbean Music Events",
        excerpt: "The evolution of live music experiences in the digital era and what it means for Caribbean artists.",
        topics: ["virtual events", "digital concerts", "online festivals"]
      }
    ]
  },
  {
    category: "Industry Updates",
    templates: [
      {
        title: "Record Label Spotlight: Independent Labels Driving Caribbean Music Forward",
        excerpt: "How independent record labels are championing Caribbean artists and preserving musical authenticity.",
        topics: ["record labels", "independent music", "artist development"]
      },
      {
        title: "Music Awards Season: Celebrating Caribbean Excellence",
        excerpt: "Highlighting Caribbean artists and their achievements in major music awards and recognition programs.",
        topics: ["music awards", "artist recognition", "industry honors"]
      },
      {
        title: "Radio Evolution: How Caribbean Music is Adapting to New Broadcasting Trends",
        excerpt: "The changing landscape of radio broadcasting and its impact on Caribbean music promotion.",
        topics: ["radio broadcasting", "music promotion", "media evolution"]
      }
    ]
  },
  {
    category: "Community Events",
    templates: [
      {
        title: "Local Music Scene: Celebrating Community Artists and Venues",
        excerpt: "Shining a spotlight on grassroots Caribbean music scenes and the venues that support emerging talent.",
        topics: ["local music", "community venues", "grassroots artists"]
      },
      {
        title: "Music Education: Programs Nurturing the Next Generation of Caribbean Musicians",
        excerpt: "Educational initiatives and programs helping young people connect with their musical heritage.",
        topics: ["music education", "youth programs", "cultural preservation"]
      },
      {
        title: "Community Celebrations: Music as the Heart of Caribbean Culture",
        excerpt: "How music brings Caribbean communities together through festivals, block parties, and cultural events.",
        topics: ["community events", "cultural celebrations", "social impact"]
      }
    ]
  }
];

export const generateMusicNewsContent = (template: any) => {
  const contentIntros = [
    "The Caribbean music scene continues to evolve and inspire audiences worldwide.",
    "Music has always been at the heart of Caribbean culture, and today's artists are no exception.",
    "From the islands to the international stage, Caribbean music is making its mark.",
    "The rich musical heritage of the Caribbean provides endless inspiration for both artists and fans.",
    "Caribbean rhythms have a unique power to bring people together and create lasting memories."
  ];

  const contentBodies = [
    "This vibrant musical landscape showcases the incredible diversity and creativity that defines Caribbean culture. Artists are constantly pushing boundaries while staying true to their roots.",
    "The fusion of traditional and contemporary elements creates a sound that resonates with both local and global audiences. This approach has opened doors for many talented musicians.",
    "Music festivals and live performances continue to be essential platforms for artists to connect with their audience and showcase their unique talents to the world.",
    "The role of community in Caribbean music cannot be overstated. Local venues, radio stations, and grassroots organizations play a crucial part in nurturing new talent.",
    "Technology has revolutionized how Caribbean music is produced, distributed, and consumed, creating new opportunities for artists to reach wider audiences."
  ];

  const contentConclusions = [
    "As we look to the future, Caribbean music's influence will undoubtedly continue to grow and inspire new generations of artists and music lovers.",
    "The passion and creativity of Caribbean musicians ensure that this rich musical tradition will continue to thrive and evolve.",
    "Supporting Caribbean artists and their music is not just about entertainment – it's about preserving and celebrating a vital part of our cultural heritage.",
    "The global appreciation for Caribbean music reflects its universal appeal and the skill of the artists who create these unforgettable sounds.",
    "Link Up Radio remains committed to showcasing the best of Caribbean music and supporting the artists who make it possible."
  ];

  const randomIntro = contentIntros[Math.floor(Math.random() * contentIntros.length)];
  const randomBody = contentBodies[Math.floor(Math.random() * contentBodies.length)];
  const randomConclusion = contentConclusions[Math.floor(Math.random() * contentConclusions.length)];

  return `${randomIntro}\n\n${randomBody}\n\n${randomConclusion}`;
};