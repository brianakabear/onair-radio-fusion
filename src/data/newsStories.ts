import img1 from "@/assets/news/reggae-1.asset.json";
import img2 from "@/assets/news/reggae-2.asset.json";
import img3 from "@/assets/news/reggae-3.asset.json";
import img4 from "@/assets/news/reggae-4.asset.json";
import img5 from "@/assets/news/reggae-5.asset.json";
import img6 from "@/assets/news/reggae-6.asset.json";
import img7 from "@/assets/news/reggae-7.asset.json";
import img8 from "@/assets/news/reggae-8.asset.json";
import img9 from "@/assets/news/reggae-9.asset.json";

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

// Reggae and dancehall news from established Caribbean and international outlets.
// Every entry is credited to the publication that reported it.
export const newsStories: NewsStory[] = [
  {
    id: "reggae-1",
    image: img1.url,
    title: "Beenie Man Heads to Zimbabwe's Kadoba Festival and Teases New Track 'Burn It'",
    excerpt: "The dancehall veteran announced the single alongside his Kadoba Festival appearance, framing the release around unity and saying music knows no borders.",
    category: "International News",
    date: "October 10, 2026",
    readTime: "3 min read",
    source: "DancehallMag",
    dateTimestamp: new Date("2026-10-10").getTime()
  },
  {
    id: "reggae-2",
    image: img2.url,
    title: "Anthony B Serves Up 'The Best' From His Upcoming 'World of Love' Album",
    excerpt: "The conscious reggae star rolled out the single with a low-key post crediting the network of producers and imprints behind it, including Jazzwad and Ineffable Records.",
    category: "Entertainment News",
    date: "October 9, 2026",
    readTime: "4 min read",
    source: "DancehallMag",
    dateTimestamp: new Date("2026-10-09").getTime()
  },
  {
    id: "reggae-3",
    image: img3.url,
    title: "Prezident Brown Releases Full-Length Album 'Hook, Line and Sinker!'",
    excerpt: "The Jamaican chanter's new collection gathers songs written across his career, each built around his signature formula of a light hook over a heavier message.",
    category: "International News",
    date: "October 9, 2026",
    readTime: "3 min read",
    source: "EIN Presswire",
    dateTimestamp: new Date("2026-10-09").getTime()
  },
  {
    id: "reggae-4",
    image: img4.url,
    title: "Mr Platinum Honours St Lucian Legend Hubert 'Breeze' Fevrier on 'Buttercup 26'",
    excerpt: "The reggae artiste pairs warm melodies with a family tribute, embedding his father's June 26 birthday into the title of the single and album.",
    category: "Caribbean News",
    date: "October 9, 2026",
    readTime: "4 min read",
    source: "Jamaica Observer",
    dateTimestamp: new Date("2026-10-09").getTime()
  },
  {
    id: "reggae-5",
    image: img5.url,
    title: "Masicka Sets Forever1NE Music Festival for Caymanas Park on December 19",
    excerpt: "Dancehall's biggest night at the race track: the Portmore star will headline his own festival for the first time, with Zimi Entertainment and Magnum backing the show.",
    category: "Entertainment News",
    date: "October 7, 2026",
    readTime: "5 min read",
    source: "Jamaica Gleaner",
    dateTimestamp: new Date("2026-10-07").getTime()
  },
  {
    id: "reggae-6",
    image: img6.url,
    title: "Gary 'Nesta' Pine Returns After Ten Years With 'Back to Roots'",
    excerpt: "The former Wailers frontman's third album arrives September 30, produced by Paul Kastick and featuring a cover of Hall & Oates' 'She's Gone'.",
    category: "Jamaica News",
    date: "October 7, 2026",
    readTime: "4 min read",
    source: "Jamaica Observer",
    dateTimestamp: new Date("2026-10-07").getTime()
  },
  {
    id: "reggae-7",
    image: img7.url,
    title: "Spragga Benz Launches 'Endeavors Reloaded' With Cocoa Tea's Final Recording",
    excerpt: "The expanded edition of his 2025 album gathered Sizzla, Sean Paul, Tarrus Riley, Agent Sasco, Stonebwoy, Echo Minott and the late Cocoa Tea for its launch at Jammin' On The Oasis.",
    category: "Entertainment News",
    date: "October 4, 2026",
    readTime: "5 min read",
    source: "Jamaica Gleaner",
    dateTimestamp: new Date("2026-10-04").getTime()
  },
  {
    id: "reggae-8",
    image: img8.url,
    title: "Tilibop and Sizzla Kalonji Fire Back Together on 'Dem Nuh Ready'",
    excerpt: "The single previews Tilibop's 11-song project and finds the St Mary-born, New York-based singer trading verses with the veteran reggae star.",
    category: "Entertainment News",
    date: "October 4, 2026",
    readTime: "3 min read",
    source: "DancehallMag",
    dateTimestamp: new Date("2026-10-04").getTime()
  },
  {
    id: "reggae-9",
    image: img9.url,
    title: "Italian Reggae Artist MadElaine Enlists Jamaican Legends for New Album",
    excerpt: "Recorded at Tuff Gong with vocals cut at Mixing Lab, Anchor Recordings and Harry J Studios, the 14-track set features Max Romeo, Cedric Myton, Queen Ifrica, Luciano and Linval Thompson.",
    category: "International News",
    date: "October 3, 2026",
    readTime: "4 min read",
    source: "Jamaica Observer",
    dateTimestamp: new Date("2026-10-03").getTime()
  }
];

const uniqueStoriesMap = new Map<string, NewsStory>();

newsStories.forEach(story => {
  uniqueStoriesMap.set(story.id, story);
});

export const allNewsStories = Array.from(uniqueStoriesMap.values())
  .sort((a, b) => b.dateTimestamp - a.dateTimestamp);
