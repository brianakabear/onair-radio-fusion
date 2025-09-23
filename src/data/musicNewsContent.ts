export const musicNewsTemplates = [
  {
    category: "Jamaica News",
    templates: [
      {
        title: "Jamaica's Music Industry Shows Strong Growth in Export Revenue",
        excerpt: "Latest economic data reveals significant increases in music export earnings, highlighting Jamaica's growing influence in global music markets.",
        topics: ["economy", "music exports", "industry growth", "Jamaica"]
      },
      {
        title: "New Recording Studios Open Across Kingston and Spanish Town",
        excerpt: "Investment in music infrastructure continues as developers recognize Jamaica's strategic position in Caribbean music production.",
        topics: ["infrastructure", "recording studios", "music production", "investment"]
      },
      {
        title: "Jamaica Music Week Announces 2025 Festival Lineup",
        excerpt: "The annual celebration of Jamaican music culture prepares to showcase both legendary artists and emerging talent from across the island.",
        topics: ["festivals", "music week", "local events", "artist showcase"]
      }
    ]
  },
  {
    category: "Caribbean News",
    templates: [
      {
        title: "Trinidad Carnival Season Brings Economic Boost to Regional Music",
        excerpt: "The annual celebration drives significant revenue for Caribbean artists and supporting industries across the region.",
        topics: ["carnival", "regional economy", "music tourism", "cultural events"]
      },
      {
        title: "Barbados Launches New Music Education Initiative",
        excerpt: "Government-backed program aims to preserve traditional Caribbean music while fostering new talent across the region.",
        topics: ["music education", "cultural preservation", "government initiatives", "youth programs"]
      },
      {
        title: "Caribbean Music Awards Expand to Include More Regional Categories",
        excerpt: "Recognition program grows to better represent the diverse musical traditions found throughout the Caribbean islands.",
        topics: ["awards", "regional recognition", "music diversity", "cultural celebration"]
      }
    ]
  },
  {
    category: "International News",
    templates: [
      {
        title: "Caribbean Artists Gain Ground in European Music Festivals",
        excerpt: "Growing international recognition opens new opportunities for reggae and dancehall performers on the global stage.",
        topics: ["international festivals", "global recognition", "touring opportunities", "cultural export"]
      },
      {
        title: "Major Streaming Platforms Increase Caribbean Music Promotion",
        excerpt: "Digital music services develop specialized playlists and promotional campaigns for reggae and dancehall genres.",
        topics: ["streaming platforms", "digital promotion", "global reach", "music technology"]
      },
      {
        title: "African-Caribbean Music Collaborations Continue to Flourish",
        excerpt: "Cross-continental partnerships produce innovative sounds that blend traditional Caribbean rhythms with contemporary African beats.",
        topics: ["international collaboration", "cultural exchange", "music fusion", "global partnerships"]
      }
    ]
  },
  {
    category: "Entertainment News",
    templates: [
      {
        title: "New Caribbean Music Documentary Series Premieres on Streaming Platform",
        excerpt: "Five-part series explores the rich history and contemporary evolution of Caribbean music genres and their global impact.",
        topics: ["documentaries", "music history", "streaming content", "cultural storytelling"]
      },
      {
        title: "Celebrity DJ Announces Caribbean Music Podcast Series",
        excerpt: "Popular media personality launches weekly show featuring interviews with Caribbean artists and industry professionals.",
        topics: ["podcasts", "celebrity interviews", "music media", "artist promotion"]
      },
      {
        title: "Caribbean Music Influences Featured in Major Hollywood Soundtrack",
        excerpt: "Blockbuster film incorporates reggae and dancehall elements, bringing Caribbean sounds to massive international audiences.",
        topics: ["film soundtracks", "Hollywood", "music placement", "cultural influence"]
      }
    ]
  },
  {
    category: "Sports News",
    templates: [
      {
        title: "Olympic Athlete Credits Caribbean Music for Training Motivation",
        excerpt: "Elite sprinter shares how reggae and dancehall rhythms fuel training sessions and competition preparation.",
        topics: ["sports motivation", "athlete lifestyle", "music and athletics", "Caribbean pride"]
      },
      {
        title: "Caribbean Music Takes Center Stage at Major Sports Championships",
        excerpt: "International sporting events increasingly feature Caribbean artists in opening ceremonies and entertainment programs.",
        topics: ["sports entertainment", "ceremonial performances", "international events", "cultural showcase"]
      },
      {
        title: "Local Football Team Adopts Caribbean Music as Victory Anthem",
        excerpt: "Professional sports team partners with local artists to create official songs that celebrate victories and engage fans.",
        topics: ["team anthems", "sports partnerships", "fan engagement", "local pride"]
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