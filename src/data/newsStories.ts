export interface NewsStory {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  source: string;
  image?: string;
  dateTimestamp: number;
}

export const newsStories: NewsStory[] = [
  // Jamaica News (40 stories)
  {
    id: "news-1",
    title: "Jamaica's Blue Mountain Coffee Production Reaches Record High",
    excerpt: "Coffee farmers in the Blue Mountains report exceptional harvest yields this season, with quality maintaining international premium standards.",
    category: "Jamaica News",
    date: "December 20, 2024",
    readTime: "4 min read",
    source: "Jamaica Observer",
    dateTimestamp: new Date("2024-12-20").getTime()
  },
  {
    id: "news-2",
    title: "New Kingston Infrastructure Project to Transform Downtown",
    excerpt: "Government announces major redevelopment plan for downtown Kingston, focusing on sustainable urban planning and economic revitalization.",
    category: "Jamaica News",
    date: "December 19, 2024",
    readTime: "5 min read",
    source: "Jamaica Gleaner",
    dateTimestamp: new Date("2024-12-19").getTime()
  },
  {
    id: "news-3",
    title: "Jamaican Athletes Prepare for World Championships",
    excerpt: "Track and field stars from Jamaica gear up for upcoming international competitions with intensive training programs.",
    category: "Sports News",
    date: "December 18, 2024",
    readTime: "3 min read",
    source: "Sports Jamaica",
    dateTimestamp: new Date("2024-12-18").getTime()
  },
  {
    id: "news-4",
    title: "Tourist Arrivals in Jamaica Exceed Pre-Pandemic Levels",
    excerpt: "Tourism ministry reports significant recovery with visitor numbers surpassing 2019 figures, boosting local economy.",
    category: "Jamaica News",
    date: "December 17, 2024",
    readTime: "4 min read",
    source: "Jamaica Observer",
    dateTimestamp: new Date("2024-12-17").getTime()
  },
  {
    id: "news-5",
    title: "Reggae Festival Announces Star-Studded Lineup",
    excerpt: "Annual reggae celebration brings together international and local artists for three days of music and cultural celebration.",
    category: "Entertainment News",
    date: "December 16, 2024",
    readTime: "3 min read",
    source: "Entertainment Weekly JA",
    dateTimestamp: new Date("2024-12-16").getTime()
  },
  {
    id: "news-6",
    title: "Jamaica's Renewable Energy Initiative Shows Progress",
    excerpt: "Solar and wind energy projects across the island contribute to sustainable development goals and reduced carbon footprint.",
    category: "Jamaica News",
    date: "December 15, 2024",
    readTime: "5 min read",
    source: "Jamaica Gleaner",
    dateTimestamp: new Date("2024-12-15").getTime()
  },
  {
    id: "news-7",
    title: "Local Fishermen Report Improved Catches",
    excerpt: "Marine conservation efforts show positive results as fish populations recover in protected coastal areas.",
    category: "Jamaica News",
    date: "December 14, 2024",
    readTime: "3 min read",
    source: "Jamaica Observer",
    dateTimestamp: new Date("2024-12-14").getTime()
  },
  {
    id: "news-8",
    title: "Jamaican Cuisine Featured in International Food Festival",
    excerpt: "Traditional Jamaican dishes gain recognition at global culinary event, showcasing island's rich food culture.",
    category: "Entertainment News",
    date: "December 13, 2024",
    readTime: "4 min read",
    source: "Food & Culture JA",
    dateTimestamp: new Date("2024-12-13").getTime()
  },
  {
    id: "news-9",
    title: "Education Reform Improves Literacy Rates",
    excerpt: "New teaching methods and technology integration show significant improvement in student reading comprehension across schools.",
    category: "Jamaica News",
    date: "December 12, 2024",
    readTime: "5 min read",
    source: "Education Today JA",
    dateTimestamp: new Date("2024-12-12").getTime()
  },
  {
    id: "news-10",
    title: "Cricket Team Secures Victory in Regional Championship",
    excerpt: "Jamaica's cricket squad delivers outstanding performance, advancing to finals with strong batting and bowling displays.",
    category: "Sports News",
    date: "December 11, 2024",
    readTime: "4 min read",
    source: "Sports Jamaica",
    dateTimestamp: new Date("2024-12-11").getTime()
  },

  // Caribbean News (40 stories)
  {
    id: "news-11",
    title: "Caribbean Climate Alliance Launches New Initiative",
    excerpt: "Regional partnership focuses on climate resilience and adaptation strategies for island nations facing sea level rise.",
    category: "Caribbean News",
    date: "December 10, 2024",
    readTime: "5 min read",
    source: "Caribbean Today",
    dateTimestamp: new Date("2024-12-10").getTime()
  },
  {
    id: "news-12",
    title: "CARICOM Trade Agreement Boosts Regional Commerce",
    excerpt: "New trade facilitation measures increase inter-Caribbean commerce, supporting economic integration and growth.",
    category: "Caribbean News",
    date: "December 9, 2024",
    readTime: "4 min read",
    source: "Caribbean Business",
    dateTimestamp: new Date("2024-12-09").getTime()
  },
  {
    id: "news-13",
    title: "Barbados Announces Digital Currency Pilot Program",
    excerpt: "Island nation becomes first in region to test central bank digital currency, setting precedent for financial innovation.",
    category: "Caribbean News",
    date: "December 8, 2024",
    readTime: "4 min read",
    source: "Caribbean Financial",
    dateTimestamp: new Date("2024-12-08").getTime()
  },
  {
    id: "news-14",
    title: "Trinidad Carnival Preparations Begin Early",
    excerpt: "Mas bands and steelpan orchestras start rehearsals for next year's celebration, promising spectacular performances.",
    category: "Entertainment News",
    date: "December 7, 2024",
    readTime: "3 min read",
    source: "Carnival News",
    dateTimestamp: new Date("2024-12-07").getTime()
  },
  {
    id: "news-15",
    title: "Hurricane Season Review Shows Improved Preparedness",
    excerpt: "Caribbean nations demonstrate enhanced disaster response capabilities, reducing impact of recent tropical systems.",
    category: "Caribbean News",
    date: "December 6, 2024",
    readTime: "5 min read",
    source: "Caribbean Weather",
    dateTimestamp: new Date("2024-12-06").getTime()
  },
  {
    id: "news-16",
    title: "Regional University Collaboration Expands",
    excerpt: "Caribbean universities strengthen partnerships, offering students increased access to specialized programs and research.",
    category: "Caribbean News",
    date: "December 5, 2024",
    readTime: "4 min read",
    source: "Education Caribbean",
    dateTimestamp: new Date("2024-12-05").getTime()
  },
  {
    id: "news-17",
    title: "Caribbean Authors Win International Literary Awards",
    excerpt: "Regional writers gain global recognition for works exploring themes of identity, history, and cultural transformation.",
    category: "Entertainment News",
    date: "December 4, 2024",
    readTime: "3 min read",
    source: "Caribbean Literature",
    dateTimestamp: new Date("2024-12-04").getTime()
  },
  {
    id: "news-18",
    title: "Marine Protected Areas Show Biodiversity Recovery",
    excerpt: "Conservation efforts across Caribbean waters demonstrate positive impact on coral reefs and marine life populations.",
    category: "Caribbean News",
    date: "December 3, 2024",
    readTime: "5 min read",
    source: "Caribbean Environment",
    dateTimestamp: new Date("2024-12-03").getTime()
  },
  {
    id: "news-19",
    title: "Regional Cricket League Attracts International Attention",
    excerpt: "Caribbean Premier League gains global viewership as local talent showcases exceptional skills to worldwide audience.",
    category: "Sports News",
    date: "December 2, 2024",
    readTime: "4 min read",
    source: "Cricket Caribbean",
    dateTimestamp: new Date("2024-12-02").getTime()
  },
  {
    id: "news-20",
    title: "Caribbean Technology Hub Launches in Dominican Republic",
    excerpt: "New innovation center attracts tech startups and international investment, positioning region as digital economy leader.",
    category: "Caribbean News",
    date: "December 1, 2024",
    readTime: "4 min read",
    source: "Tech Caribbean",
    dateTimestamp: new Date("2024-12-01").getTime()
  },

  // International News (40 stories)
  {
    id: "news-21",
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt: "World leaders commit to ambitious carbon reduction targets, with developing nations receiving unprecedented support funding.",
    category: "International News",
    date: "November 30, 2024",
    readTime: "6 min read",
    source: "World News Network",
    dateTimestamp: new Date("2024-11-30").getTime()
  },
  {
    id: "news-22",
    title: "International Space Station Mission Includes Caribbean Experiment",
    excerpt: "Regional scientific project studies microgravity effects on tropical plant species, advancing agricultural research.",
    category: "International News",
    date: "November 29, 2024",
    readTime: "4 min read",
    source: "Space Today",
    dateTimestamp: new Date("2024-11-29").getTime()
  },
  {
    id: "news-23",
    title: "UN Recognizes Caribbean Disaster Preparedness Model",
    excerpt: "United Nations adopts regional hurricane response framework as global standard for small island developing states.",
    category: "International News",
    date: "November 28, 2024",
    readTime: "5 min read",
    source: "UN News",
    dateTimestamp: new Date("2024-11-28").getTime()
  },
  {
    id: "news-24",
    title: "Global Trade Winds Favor Caribbean Renewable Energy",
    excerpt: "International investment flows toward regional solar and wind projects, recognizing strategic geographic advantages.",
    category: "International News",
    date: "November 27, 2024",
    readTime: "4 min read",
    source: "Energy International",
    dateTimestamp: new Date("2024-11-27").getTime()
  },
  {
    id: "news-25",
    title: "World Health Organization Praises Caribbean COVID Response",
    excerpt: "Regional coordination and community engagement models receive international recognition for effective pandemic management.",
    category: "International News",
    date: "November 26, 2024",
    readTime: "5 min read",
    source: "Health Global",
    dateTimestamp: new Date("2024-11-26").getTime()
  },
  {
    id: "news-26",
    title: "International Film Festival Spotlights Caribbean Cinema",
    excerpt: "Regional filmmakers gain global platform as festival dedicates special program to Caribbean storytelling and culture.",
    category: "Entertainment News",
    date: "November 25, 2024",
    readTime: "3 min read",
    source: "Film International",
    dateTimestamp: new Date("2024-11-25").getTime()
  },
  {
    id: "news-27",
    title: "Olympic Committee Announces Caribbean Training Centers",
    excerpt: "International Olympic Committee establishes regional facilities to develop athletic talent across multiple sports disciplines.",
    category: "Sports News",
    date: "November 24, 2024",
    readTime: "4 min read",
    source: "Olympic News",
    dateTimestamp: new Date("2024-11-24").getTime()
  },
  {
    id: "news-28",
    title: "Global Universities Partner with Caribbean Institutions",
    excerpt: "Major international universities establish research collaborations, focusing on climate science and marine biology.",
    category: "International News",
    date: "November 23, 2024",
    readTime: "5 min read",
    source: "Academic World",
    dateTimestamp: new Date("2024-11-23").getTime()
  },
  {
    id: "news-29",
    title: "World Bank Approves Caribbean Infrastructure Funding",
    excerpt: "Multi-billion dollar initiative supports regional transportation, telecommunications, and energy infrastructure development.",
    category: "International News",
    date: "November 22, 2024",
    readTime: "4 min read",
    source: "Financial Times",
    dateTimestamp: new Date("2024-11-22").getTime()
  },
  {
    id: "news-30",
    title: "International Reggae Day Celebrated Globally",
    excerpt: "UNESCO recognition elevates reggae music's cultural significance, with celebrations spanning six continents.",
    category: "Entertainment News",
    date: "November 21, 2024",
    readTime: "3 min read",
    source: "Culture Global",
    dateTimestamp: new Date("2024-11-21").getTime()
  },

  // Entertainment News (40 stories) 
  {
    id: "news-31",
    title: "Bob Marley Biopic Wins International Film Awards",
    excerpt: "Biographical film about reggae legend receives critical acclaim and multiple awards at prestigious international ceremonies.",
    category: "Entertainment News",
    date: "November 20, 2024",
    readTime: "4 min read",
    source: "Entertainment Weekly",
    dateTimestamp: new Date("2024-11-20").getTime()
  },
  {
    id: "news-32",
    title: "Caribbean Music Festival Breaks Attendance Records",
    excerpt: "Multi-day celebration of regional music attracts largest crowd in festival history, featuring diverse genres and artists.",
    category: "Entertainment News",
    date: "November 19, 2024",
    readTime: "3 min read",
    source: "Music Today",
    dateTimestamp: new Date("2024-11-19").getTime()
  },
  {
    id: "news-33",
    title: "Jamaican Dancehall Artist Tops Global Charts",
    excerpt: "Local musician achieves international breakthrough with fusion of traditional dancehall and contemporary production.",
    category: "Entertainment News",
    date: "November 18, 2024",
    readTime: "3 min read",
    source: "Billboard Caribbean",
    dateTimestamp: new Date("2024-11-18").getTime()
  },
  {
    id: "news-34",
    title: "Caribbean Film Industry Receives Government Support",
    excerpt: "Regional governments announce initiatives to boost local film production and provide training for emerging filmmakers.",
    category: "Entertainment News",
    date: "November 17, 2024",
    readTime: "4 min read",
    source: "Film Caribbean",
    dateTimestamp: new Date("2024-11-17").getTime()
  },
  {
    id: "news-35",
    title: "Steel Pan Orchestra Performs at World Music Awards",
    excerpt: "Traditional Caribbean steel pan ensemble receives standing ovation at international music ceremony, showcasing cultural heritage.",
    category: "Entertainment News",
    date: "November 16, 2024",
    readTime: "3 min read",
    source: "World Music",
    dateTimestamp: new Date("2024-11-16").getTime()
  },
  {
    id: "news-36",
    title: "Caribbean Fashion Week Showcases Regional Designers",
    excerpt: "Annual fashion event highlights innovative designs inspired by island culture, attracting international buyers and media.",
    category: "Entertainment News",
    date: "November 15, 2024",
    readTime: "4 min read",
    source: "Fashion Caribbean",
    dateTimestamp: new Date("2024-11-15").getTime()
  },
  {
    id: "news-37",
    title: "Reggae Artist Collaborates with International Stars",
    excerpt: "Cross-cultural musical partnership brings Caribbean sounds to global audience through innovative recording project.",
    category: "Entertainment News",
    date: "November 14, 2024",
    readTime: "3 min read",
    source: "Music Global",
    dateTimestamp: new Date("2024-11-14").getTime()
  },
  {
    id: "news-38",
    title: "Caribbean Literature Festival Attracts Global Authors",
    excerpt: "International writers participate in regional literary celebration, exploring themes of identity and cultural exchange.",
    category: "Entertainment News",
    date: "November 13, 2024",
    readTime: "4 min read",
    source: "Books Today",
    dateTimestamp: new Date("2024-11-13").getTime()
  },
  {
    id: "news-39",
    title: "Local Theater Production Tours International Venues",
    excerpt: "Caribbean theatrical performance receives invitations to prestigious venues worldwide, showcasing regional storytelling traditions.",
    category: "Entertainment News",
    date: "November 12, 2024",
    readTime: "3 min read",
    source: "Theater World",
    dateTimestamp: new Date("2024-11-12").getTime()
  },
  {
    id: "news-40",
    title: "Documentary on Caribbean Culture Wins Emmy Award",
    excerpt: "Film exploring regional traditions and contemporary life receives international recognition for outstanding documentary production.",
    category: "Entertainment News",
    date: "November 11, 2024",
    readTime: "4 min read",
    source: "Documentary News",
    dateTimestamp: new Date("2024-11-11").getTime()
  },

  // Sports News (40 stories)
  {
    id: "news-41",
    title: "Jamaica's Sprint Team Dominates World Athletics",
    excerpt: "National sprinters break multiple records at international competition, continuing island's track and field excellence.",
    category: "Sports News",
    date: "November 10, 2024",
    readTime: "4 min read",
    source: "Athletics Weekly",
    dateTimestamp: new Date("2024-11-10").getTime()
  },
  {
    id: "news-42",
    title: "Caribbean Premier League Expands to New Markets",
    excerpt: "Popular cricket tournament announces expansion plans, bringing Twenty20 action to additional Caribbean territories.",
    category: "Sports News",
    date: "November 9, 2024",
    readTime: "3 min read",
    source: "Cricket News",
    dateTimestamp: new Date("2024-11-09").getTime()
  },
  {
    id: "news-43",
    title: "Young Caribbean Footballer Signs with European Club",
    excerpt: "Talented teenager from regional academy secures professional contract with major European football team.",
    category: "Sports News",
    date: "November 8, 2024",
    readTime: "3 min read",
    source: "Football Caribbean",
    dateTimestamp: new Date("2024-11-08").getTime()
  },
  {
    id: "news-44",
    title: "Regional Swimming Championships Set New Standards",
    excerpt: "Caribbean aquatic athletes achieve personal bests and regional records at annual swimming and diving competition.",
    category: "Sports News",
    date: "November 7, 2024",
    readTime: "4 min read",
    source: "Aquatic Sports",
    dateTimestamp: new Date("2024-11-07").getTime()
  },
  {
    id: "news-45",
    title: "Caribbean Basketball League Launches Youth Program",
    excerpt: "Professional basketball organization introduces development initiative to nurture young talent across the region.",
    category: "Sports News",
    date: "November 6, 2024",
    readTime: "3 min read",
    source: "Basketball Today",
    dateTimestamp: new Date("2024-11-06").getTime()
  },
  {
    id: "news-46",
    title: "Tennis Academy Opens in Barbados",
    excerpt: "World-class tennis training facility welcomes first students, offering professional coaching and development programs.",
    category: "Sports News",
    date: "November 5, 2024",
    readTime: "4 min read",
    source: "Tennis World",
    dateTimestamp: new Date("2024-11-05").getTime()
  },
  {
    id: "news-47",
    title: "Caribbean Sailing Regatta Attracts International Fleet",
    excerpt: "Annual sailing competition draws participants from around the world to compete in challenging Caribbean waters.",
    category: "Sports News",
    date: "November 4, 2024",
    readTime: "3 min read",
    source: "Sailing News",
    dateTimestamp: new Date("2024-11-04").getTime()
  },
  {
    id: "news-48",
    title: "Regional Golf Championship Showcases Island Courses",
    excerpt: "Professional golf tournament highlights spectacular Caribbean golf courses while promoting regional tourism.",
    category: "Sports News",
    date: "November 3, 2024",
    readTime: "4 min read",
    source: "Golf Caribbean",
    dateTimestamp: new Date("2024-11-03").getTime()
  },
  {
    id: "news-49",
    title: "Caribbean Volleyball Team Qualifies for World Championships",
    excerpt: "National volleyball squad secures spot in global competition after impressive performance in regional qualifiers.",
    category: "Sports News",
    date: "November 2, 2024",
    readTime: "3 min read",
    source: "Volleyball World",
    dateTimestamp: new Date("2024-11-02").getTime()
  },
  {
    id: "news-50",
    title: "Boxing Academy Produces Commonwealth Champion",
    excerpt: "Local boxing program celebrates as graduate claims Commonwealth Games gold medal in competitive weight division.",
    category: "Sports News",
    date: "November 1, 2024",
    readTime: "4 min read",
    source: "Boxing News",
    dateTimestamp: new Date("2024-11-01").getTime()
  }

  // Continue with similar patterns for all 200 stories...
  // Adding more stories with varied dates going back further
];

// Generate additional stories to reach 200 total
const generateAdditionalStories = (): NewsStory[] => {
  const categories = ["Jamaica News", "Caribbean News", "International News", "Entertainment News", "Sports News"];
  const sources = ["Jamaica Observer", "Jamaica Gleaner", "Caribbean Today", "World News", "Sports Weekly", "Entertainment Daily"];
  const additionalStories: NewsStory[] = [];
  
  // Get existing titles to avoid duplicates
  const existingTitles = new Set(newsStories.map(story => story.title.toLowerCase()));
  
  const titleTemplates = {
    "Jamaica News": [
      "New Development Project Announced in Kingston Area",
      "Agricultural Innovation Boosts Local Farming Productivity", 
      "Education Ministry Launches Advanced Digital Learning Initiative",
      "Healthcare System Receives Comprehensive Major Upgrade",
      "Transportation Infrastructure Improvements Begin Across Island",
      "Small Business Support Program Successfully Launches",
      "Environmental Conservation Project Significantly Expands",
      "Historic Cultural Heritage Site Completely Restored",
      "Advanced Technology Hub Opens in Spanish Town",
      "Community Development Program Shows Remarkable Success",
      "Youth Employment Initiative Creates New Opportunities",
      "Sustainable Tourism Project Gains International Recognition",
      "Local Manufacturing Sector Experiences Growth",
      "Digital Infrastructure Expansion Reaches Rural Areas",
      "Public Safety Initiative Shows Positive Results"
    ],
    "Caribbean News": [
      "Regional Trade Agreement Significantly Strengthens Economy",
      "Comprehensive Climate Adaptation Strategy Successfully Implemented",
      "Extensive Cultural Exchange Program Continues Expansion",
      "Enhanced Maritime Security Initiative Shows Results", 
      "Strategic Tourism Recovery Program Proves Successful",
      "Educational Collaboration Initiative Continues to Increase",
      "Major Renewable Energy Project Successfully Completed",
      "Comprehensive Disaster Preparedness Training Program Conducted",
      "Important Agricultural Cooperation Agreement Successfully Signed",
      "Innovative Digital Innovation Hub Successfully Established",
      "Regional Banking Initiative Modernizes Financial Services",
      "Inter-island Transportation Links Improve Connectivity",
      "Cultural Heritage Preservation Project Gains Momentum",
      "Regional Health Cooperation Agreement Strengthens Services",
      "Marine Conservation Efforts Show Promising Results"
    ],
    "International News": [
      "Strategic Global Partnership Significantly Benefits Small Islands",
      "Comprehensive International Aid Program Successfully Launched",
      "Major Climate Fund Actively Supports Regional Projects",
      "Enhanced Trade Relations Strengthen with Emerging New Markets",
      "Important Diplomatic Ties Enhanced Through Cultural Exchange",
      "Significant International Investment Flows Continue to Increase",
      "Comprehensive Global Health Initiative Successfully Includes Caribbean",
      "Extensive Educational Exchange Program Continues Expansion",
      "Important Technology Transfer Agreement Successfully Signed",
      "Sustainable Development Goals Show Measurable Progress",
      "International Scientific Collaboration Advances Research",
      "Global Maritime Security Partnership Enhances Protection",
      "World Bank Funding Supports Infrastructure Development",
      "International Cultural Festival Celebrates Caribbean Heritage",
      "Global Climate Research Initiative Includes Regional Studies"
    ],
    "Entertainment News": [
      "Annual Music Festival Successfully Celebrates Caribbean Culture",
      "Local Film Industry Receives Well-Deserved International Recognition",
      "Talented Local Artist Successfully Achieves Global Success",
      "Popular Cultural Festival Attracts International Visitors",
      "Acclaimed Theater Production Tours Successfully Globally",
      "Innovative Fashion Designer Showcases at International Event",
      "Prestigious Literary Festival Features Prominent Caribbean Authors",
      "Contemporary Art Exhibition Opens to Critical Acclaim",
      "Professional Dance Company Performs Successfully Internationally",
      "Local Media Production Company Strategically Expands Operations",
      "International Film Festival Highlights Caribbean Cinema",
      "Music Streaming Platform Features Caribbean Artists",
      "Cultural Documentary Wins International Awards",
      "Art Gallery Opens Featuring Local Contemporary Artists",
      "Literary Prize Recognizes Caribbean Writing Excellence"
    ],
    "Sports News": [
      "Comprehensive Athletic Training Program Successfully Produces Champions",
      "State-of-the-Art Regional Sports Complex Successfully Opens",
      "Youth Development Program Shows Outstanding Results",
      "Professional Athlete Successfully Signs International Contract",
      "Strategic Sports Tourism Initiative Successfully Launched",
      "Professional Coaching Certification Program Proves Successful",
      "Advanced Sports Medicine Center Successfully Established",
      "Important Athletic Scholarship Program Successfully Expanded",
      "International Competition Hosted Successfully with Excellence",
      "Community Sports Program Continues Significant Growth",
      "National Team Qualifies for International Championships",
      "Sports Academy Produces Professional Athletes",
      "Athletic Training Facility Receives Modern Equipment",
      "Regional Competition Showcases Emerging Talent",
      "Sports Development Program Expands to Rural Areas"
    ]
  };
  
  let storyCounter = newsStories.length + 1;
  
  for (let i = storyCounter; i <= 200; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const daysAgo = Math.floor(Math.random() * 365) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    const categoryTitles = titleTemplates[category as keyof typeof titleTemplates];
    let title = categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    
    // Ensure unique title
    let counter = 1;
    const baseTitle = title;
    while (existingTitles.has(title.toLowerCase())) {
      title = `${baseTitle} - Part ${counter}`;
      counter++;
    }
    
    existingTitles.add(title.toLowerCase());
    
    additionalStories.push({
      id: `news-${i}`,
      title: title,
      excerpt: `This is a comprehensive news story about ${title.toLowerCase()}. The story covers important developments and their significant impact on the community and region.`,
      category: category,
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
      source: source,
      dateTimestamp: date.getTime()
    });
  }
  
  return additionalStories;
};

// Create unique stories and remove any potential duplicates by ID
const uniqueStoriesMap = new Map<string, NewsStory>();

// Add all stories to map (this will automatically handle ID duplicates)
[...newsStories, ...generateAdditionalStories()].forEach(story => {
  uniqueStoriesMap.set(story.id, story);
});

// Convert back to array and sort by date
export const allNewsStories = Array.from(uniqueStoriesMap.values())
  .sort((a, b) => b.dateTimestamp - a.dateTimestamp);