import { Song, Event, Booking, Setlist, SongRequest } from './types';

export const SEED_SONGS: Song[] = [
  { id: '1', title: 'Fallen Leaves', artist: 'Autumn Winds', duration: '4:15', genre: 'Acoustic Rock', mood: 'Melancholic', albumArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '2', title: 'Golden Hour', artist: 'Autumn Winds', duration: '3:58', genre: 'Indie Folk', mood: 'Hopeful', albumArt: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '3', title: 'Winds of Change', artist: 'Scorpions Cover', duration: '5:12', genre: 'Classic Rock', mood: 'Epic', albumArt: 'https://images.unsplash.com/photo-1502014822147-1aed80671c0a?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '4', title: 'October Rust', artist: 'Autumn Winds', duration: '4:22', genre: 'Atmospheric', mood: 'Dark', albumArt: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '5', title: 'Harvest Moon', artist: 'Neil Young Cover', duration: '5:03', genre: 'Folk', mood: 'Romantic', albumArt: 'https://images.unsplash.com/photo-1532188978303-48fa2c03bb77?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '6', title: 'Crimson Sky', artist: 'Autumn Winds', duration: '3:45', genre: 'Alt Rock', mood: 'Energetic', albumArt: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '7', title: 'Midnight Rain', artist: 'Autumn Winds', duration: '4:10', genre: 'Indie', mood: 'Chill', albumArt: 'https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '8', title: 'The Long Road Home', artist: 'Autumn Winds', duration: '5:30', genre: 'Country Rock', mood: 'Nostalgic', albumArt: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '9', title: 'Shadows of Yesterday', artist: 'Autumn Winds', duration: '3:55', genre: 'Ballad', mood: 'Sad', albumArt: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '10', title: 'Echoes in the Wind', artist: 'Autumn Winds', duration: '6:05', genre: 'Ambient', mood: 'Dreamy', albumArt: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '11', title: 'Starlight Fades', artist: 'Autumn Winds', duration: '4:00', genre: 'Synthwave', mood: 'Retro', albumArt: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '12', title: 'Broken Compass', artist: 'Autumn Winds', duration: '3:25', genre: 'Folk', mood: 'Lost', albumArt: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '13', title: 'Winter\'s Approach', artist: 'Autumn Winds', duration: '4:45', genre: 'Post-Rock', mood: 'Intense', albumArt: 'https://images.unsplash.com/photo-1483664852095-d6cc6870705d?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '14', title: 'Maple & Ash', artist: 'Autumn Winds', duration: '3:15', genre: 'Acoustic', mood: 'Warm', albumArt: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '15', title: 'Neon Dreams', artist: 'Autumn Winds', duration: '3:50', genre: 'Pop Rock', mood: 'Upbeat', albumArt: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '16', title: 'Silent City', artist: 'Autumn Winds', duration: '4:30', genre: 'Soft Rock', mood: 'Urban', albumArt: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '17', title: 'Driftwood', artist: 'Autumn Winds', duration: '3:40', genre: 'Indie Folk', mood: 'Relaxed', albumArt: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '18', title: 'Amber Lights', artist: 'Autumn Winds', duration: '4:12', genre: 'Alternative', mood: 'Reflective', albumArt: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '19', title: 'Chasing Ghosts', artist: 'Autumn Winds', duration: '5:00', genre: 'Rock', mood: 'Haunting', albumArt: 'https://images.unsplash.com/photo-1505673598505-489e9d5d3632?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '20', title: 'Morning Dew', artist: 'Autumn Winds', duration: '2:55', genre: 'Instrumental', mood: 'Peaceful', albumArt: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '21', title: 'The Last Train', artist: 'Autumn Winds', duration: '4:20', genre: 'Blues Rock', mood: 'Gritty', albumArt: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '22', title: 'Whispering Pines', artist: 'Autumn Winds', duration: '3:33', genre: 'Folk', mood: 'Mysterious', albumArt: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '23', title: 'City of Stars', artist: 'La La Land Cover', duration: '2:45', genre: 'Jazz', mood: 'Romantic', albumArt: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '24', title: 'November Rain', artist: 'Guns N\' Roses Cover', duration: '8:57', genre: 'Hard Rock', mood: 'Epic', albumArt: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '25', title: 'Yellow', artist: 'Coldplay Cover', duration: '4:29', genre: 'Britpop', mood: 'Emotional', albumArt: 'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '26', title: 'Velvet Sky', artist: 'Autumn Winds', duration: '3:50', genre: 'Alternative', mood: 'Dreamy', albumArt: 'https://images.unsplash.com/photo-1510279770292-4b34de9f5c23?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '27', title: 'Rust and Bone', artist: 'Autumn Winds', duration: '4:15', genre: 'Hard Rock', mood: 'Grit', albumArt: 'https://images.unsplash.com/photo-1519508234439-4f23643125c1?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '28', title: 'Mumbai Midnight', artist: 'Autumn Winds', duration: '4:05', genre: 'Fusion', mood: 'Urban', albumArt: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '29', title: 'Saffron Clouds', artist: 'Autumn Winds', duration: '3:30', genre: 'Indie Pop', mood: 'Happy', albumArt: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '30', title: 'Marine Drive Blues', artist: 'Autumn Winds', duration: '5:20', genre: 'Blues', mood: 'Chill', albumArt: 'https://images.unsplash.com/photo-1605218427368-35b017402d7c?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '31', title: 'Chai & Chords', artist: 'Autumn Winds', duration: '2:50', genre: 'Acoustic', mood: 'Cozy', albumArt: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '32', title: 'Vintage Soul', artist: 'Autumn Winds', duration: '3:55', genre: 'Soul', mood: 'Classic', albumArt: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '33', title: 'Electric Autumn', artist: 'Autumn Winds', duration: '4:45', genre: 'Synthwave', mood: 'Energetic', albumArt: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '34', title: 'Paper Boats', artist: 'Autumn Winds', duration: '3:20', genre: 'Folk', mood: 'Nostalgic', albumArt: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '35', title: 'Hollow Heart', artist: 'Autumn Winds', duration: '4:10', genre: 'Ballad', mood: 'Sad', albumArt: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '36', title: 'Sacred Games', artist: 'OST Cover', duration: '3:15', genre: 'Soundtrack', mood: 'Dark', albumArt: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '37', title: 'Skyfall', artist: 'Adele Cover', duration: '4:48', genre: 'Pop', mood: 'Epic', albumArt: 'https://images.unsplash.com/photo-1459749411177-287ce14650db?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '38', title: 'Hotel California', artist: 'Eagles Cover', duration: '6:30', genre: 'Classic Rock', mood: 'Iconic', albumArt: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '39', title: 'Winds of Winter', artist: 'Autumn Winds', duration: '5:05', genre: 'Orchestral', mood: 'Grand', albumArt: 'https://images.unsplash.com/photo-1485550409059-9afb054cada4?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '40', title: 'Neon Lights', artist: 'Autumn Winds', duration: '3:45', genre: 'Pop', mood: 'Party', albumArt: 'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '41', title: 'Silence Speaks', artist: 'Autumn Winds', duration: '2:55', genre: 'Instrumental', mood: 'Calm', albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '42', title: 'Burning Bridges', artist: 'Autumn Winds', duration: '4:30', genre: 'Rock', mood: 'Angry', albumArt: 'https://images.unsplash.com/photo-1461301214746-1e790926d323?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '43', title: 'Sweet Child O Mine', artist: 'Guns N Roses Cover', duration: '5:55', genre: 'Hard Rock', mood: 'Energetic', albumArt: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '44', title: 'Wonderwall', artist: 'Oasis Cover', duration: '4:18', genre: 'Britpop', mood: 'Singalong', albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '45', title: 'Boulevard of Broken Dreams', artist: 'Green Day Cover', duration: '4:20', genre: 'Punk Rock', mood: 'Melancholic', albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '46', title: 'Stairway to Heaven', artist: 'Led Zeppelin Cover', duration: '8:02', genre: 'Classic Rock', mood: 'Legendary', albumArt: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '47', title: 'Comfortably Numb', artist: 'Pink Floyd Cover', duration: '6:22', genre: 'Prog Rock', mood: 'Trippy', albumArt: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '48', title: 'Imagine', artist: 'John Lennon Cover', duration: '3:03', genre: 'Piano Ballad', mood: 'Hopeful', albumArt: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '49', title: 'Bohemian Rhapsody', artist: 'Queen Cover', duration: '5:55', genre: 'Rock Opera', mood: 'Theatrical', albumArt: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '50', title: 'Smells Like Teen Spirit', artist: 'Nirvana Cover', duration: '5:01', genre: 'Grunge', mood: 'Raw', albumArt: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=300&h=300' },
];

// Expanded Cities & Venues Data
export const SEED_CITIES_VENUES: Record<string, string[]> = {
  "Mumbai": ["Hard Rock Café (Worli)", "The Finch (Powai)", "AntiSocial (Khar)", "Bonobo (Bandra)", "Shanmukhananda Hall", "Razzberry Rhinoceros (Juhu)", "NCPA (Nariman Point)", "The Stables (Andheri)", "Cafe Rhythm (Powai)", "Carter Road Promenade"],
  "Delhi": ["The Piano Man Jazz Club", "Auro Kitchen & Bar", "Imperfecto Ruin Pub", "Hard Rock Café (Saket)", "Summer House Café"],
  "Bangalore": ["Fandom at Gilly's Redefined", "Windmills Craftworks", "Hard Rock Café (Whitefield)", "The Humming Tree", "B-Flat Bar"],
  "Pune": ["High Spirits Café", "Hard Rock Café (Koregaon Park)", "Swig", "Da High", "Elephant & Co."],
  "Hyderabad": ["The Moonshine Project", "Hard Rock Café (Hitech City)", "Ext", "Tabula Rasa"],
  "Goa": ["Cohiba Bar & Kitchen", "Tesouro", "Raeeth", "Soro - The Village Pub", "Thalassa"],
  "Chennai": ["Bay 146", "Geoffrey's Pub", "Radio Room", "Black & White"],
  "Kolkata": ["Someplace Else", "Hard Rock Café (Park Street)", "Jamsteady"],
  "Jaipur": ["Forresta Kitchen & Bar", "Palladio", "Club Naila"],
  "Shillong": ["Cloud 9", "The Evening Club", "Café Shillong"]
};

// --- EVENTS GENERATION LOGIC ---

// Fixed UPCOMING events (Important ones)
const UPCOMING_EVENTS: Event[] = [
  { 
    id: 'carter-road-jan18', 
    title: 'Acoustic Night', 
    date: '2025-01-18', 
    location: 'Carter Road, Mumbai', 
    description: 'An intimate evening of acoustic melodies by the sea.', 
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://maps.app.goo.gl/Mumbai'
  },
  { 
    id: 'cafe-rhythm-jan23', 
    title: 'Cafe Rhythm, Powai', 
    date: '2025-01-23', 
    location: 'Powai, Mumbai', 
    description: 'Live band performance featuring our latest tracks.', 
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://maps.app.goo.gl/Powai'
  },
  { 
    id: 'finch-powai', 
    title: 'The Finch, Powai', 
    date: '2025-05-12', 
    location: 'The Finch, Powai, Mumbai', 
    description: 'An evening of cinematic soundscapes and live artistry.', 
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://maps.app.goo.gl/yb1D'
  },
  { 
    id: 'hardrock-worli', 
    title: 'Hard Rock Cafe, Worli', 
    date: '2025-05-18', 
    location: 'Hard Rock Cafe, Worli, Mumbai', 
    description: 'High energy rock night kicking off the new tour leg.', 
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://maps.app.goo.gl/18Jt'
  },
  {
    id: 'nmacc-bkc',
    title: 'Nita Mukesh Ambani Cultural Centre',
    date: '2025-05-25',
    location: 'NMACC, Bandra Kurla Complex',
    description: 'A grand orchestral performance of "Autumn Symphony" in the Grand Theatre.',
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1503095392237-fa19b2461658?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://goo.gl/maps/NMACC'
  },
  {
    id: 'antisocial-khar',
    title: 'AntiSocial Khar',
    date: '2025-06-01',
    location: 'AntiSocial, Khar West',
    description: 'Underground vibes. Raw, electric, and intimate.',
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://goo.gl/maps/AntiSocial'
  },
  {
    id: 'bonobo-bandra',
    title: 'Bonobo Bandra',
    date: '2025-06-15',
    location: 'Bonobo, Bandra West',
    description: 'Rooftop acoustic session under the stars.',
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://goo.gl/maps/Bonobo'
  },
  {
    id: 'stables-andheri',
    title: 'The Stables Andheri',
    date: '2025-06-22',
    location: 'The Stables, Andheri West',
    description: 'Friday Night Rock with special guest appearances.',
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://goo.gl/maps/Stables'
  },
  {
    id: '3-wise-monkeys',
    title: '3 Wise Monkeys',
    date: '2025-06-29',
    location: 'Khar West, Mumbai',
    description: 'Indie night featuring new releases.',
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://maps.google.com/?q=3+Wise+Monkeys+Khar'
  },
  {
    id: 'bombay-adda',
    title: 'Bombay Adda',
    date: '2025-07-05',
    location: 'Santacruz West, Mumbai',
    description: 'A fusion of culinary delights and soulful tunes.',
    status: 'upcoming', 
    imageUrl: 'https://images.unsplash.com/photo-1559333086-b0a56225a93c?auto=format&fit=crop&q=80&w=800&h=400',
    googleMapsLink: 'https://maps.google.com/?q=Bombay+Adda+Santacruz'
  }
];

// Helper to generate history from 2016-2024 (2 shows per month)
const generateHistory = (): Event[] => {
  const history: Event[] = [];
  const startYear = 2016;
  const endYear = 2024;
  const cities = Object.keys(SEED_CITIES_VENUES);
  
  const titles = [
    "Autumn Unplugged", "Monsoon Melodies", "Winter Rock Fest", 
    "Summer Vibes", "The Golden Tour", "City Lights Gig", 
    "Late Night Jam", "Sunday Soul", "Friday Frenzy", 
    "Indie Roots", "Urban Echoes", "Acoustic Nights",
    "Electric Dreams", "Retro Rewind", "Fusion Friday"
  ];

  const images = [
    'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1574391884720-385e98d95dac?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1499364615650-ec387c147984?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=800&h=400',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800&h=400',
  ];

  for (let year = endYear; year >= startYear; year--) {
    for (let month = 11; month >= 0; month--) { // Dec to Jan
      // 2 shows per month
      for (let i = 0; i < 2; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const venues = SEED_CITIES_VENUES[city];
        const venue = venues[Math.floor(Math.random() * venues.length)];
        const titlePrefix = titles[Math.floor(Math.random() * titles.length)];
        const day = 10 + (i * 14) + Math.floor(Math.random() * 3); // Approx mid and end month
        
        // Pad month/day for ISO string
        const monthStr = (month + 1).toString().padStart(2, '0');
        const dayStr = day.toString().padStart(2, '0');

        history.push({
          id: `hist-${year}-${monthStr}-${i}`,
          title: `${titlePrefix} @ ${venue.split('(')[0].trim()}`,
          date: `${year}-${monthStr}-${dayStr}`,
          location: `${venue}, ${city}`,
          description: `Live performance at ${venue} during our ${year} tour leg.`,
          status: 'past',
          imageUrl: images[Math.floor(Math.random() * images.length)],
          googleMapsLink: 'https://maps.google.com'
        });
      }
    }
  }
  return history;
};

// Combine Fixed Upcoming with Generated History
export const SEED_EVENTS: Event[] = [...UPCOMING_EVENTS, ...generateHistory()];


export const SEED_BOOKINGS: Booking[] = [
  { id: 'b1', clientName: 'Elena Gilbert', email: 'elena@mysticfalls.com', eventType: 'Anniversary', date: '2025-05-20', budget: '$5000', status: 'pending', details: 'Looking for a band that understands the sorrow and beauty of eternity.' },
  { id: 'b2', clientName: 'Damon Salvatore', email: 'damon@boardinghouse.com', eventType: 'Private Party', date: '2024-10-31', budget: '$10000', status: 'approved', details: 'Classy, bourbon, dark atmosphere.' },
];

export const SEED_REQUESTS: SongRequest[] = [
  { id: 'r1', songTitle: 'Wake Me Up When September Ends', artistName: 'Green Day', userMessage: 'Fits the season perfectly.', status: 'pending', eventId: 'finch-powai' },
  { id: 'r2', songTitle: 'Yellow', artistName: 'Coldplay', userMessage: 'For the stars.', status: 'rejected', eventId: 'finch-powai' },
];

export const SEED_SETLISTS: Setlist[] = [
  { id: 's1', name: 'Melancholy Dreams', vibe: 'Atmospheric', createdDate: '2024-10-01', songs: [SEED_SONGS[0], SEED_SONGS[3]] }
];

// Expanded Award Data (Detailed)
export const SEED_AWARDS = [
  "Strawberry Fields (Bengaluru) - Band / Battle of Bands competition open to college bands.",
  "Alcheringa (IIT Guwahati) - Solo singing (“Voice of Alcheringa”), rock band competition (“Rock-o-Phonix”).",
  "Kashiyatra (IIT (BHU) Varanasi) - Has “Bandish” (solo/duet/group singing) + “Crosswindz” (rock band) categories.",
  "Ragam (NIT Calicut) - Includes solo events and group/band events (“Swara Raaga”, “Amplified”).",
  "Pradharshini (Kilpauk Medical College, Chennai) - Features solo singing, duet singing, instrumentals among many other cultural events.",
  "Battle of Bands – SRCC Crossroads 2025 (Delhi) - A dedicated band competition at SRCC college.",
  "Battle of Bands – IIIT Delhi Esya25 - Band competition, team size 4-8.",
  "Battle of Bands (SargamFest) - Explicit rules for college bands.",
  "Solo Singing Competition – Swaradhara (Rishihood University) - College-student solo singing competition.",
  "Melange – Solo Singing Competition (Jaipuria Institute of Management) - Solo singing open to college students.",
  "Solo/Group Singing Competition – Arya College - Solo & group singing competition at a college level.",
  "Mithibai Kshitij (Mumbai) - Large inter-collegiate fest; includes performing arts including singing/band.",
  "Flare (PDPU Ahmedabad) - Festival includes “AtMoshSphere – Battle of Bands” + music events.",
  "Duet Singing Competition (MM College) - Duet singing competition at college level.",
  "Solo/Duet Singing – EKATRA Fest - Inter-college fest event: solo/duet singing & group singing.",
  "Oasis (BITS Pilani) - Large college festival known for band/rock competitions.",
  "Incident (NITK Surathkal) - College fest with band / music competition components.",
  "Culrav (MNNIT Allahabad) - Includes “Voice of Culrav / Band” events (singing & band).",
  "Waves (BITS Goa) - Includes “Sea Rock / Battle of Bands” — band competition.",
  "Band‑It Festival (India) - Performance competition (band + solo singing) for younger participants.",
  "Gravity 2k25 (Jaipuria Institute of Management Noida) - Melange – Solo Singing Competition.",
  "Solo Singing Competition – DSJC - Example of college solo singing competition.",
  "Intra‑College Singing Competition – Vedanta College - Intra-college solo singing event.",
  "Inter‑College Singing Competition – The Voice of Bharat (Season 2) - Larger competition, open to college students.",
  "Inter‑School Singing Competition – Spectrum 2025 - Includes solo, duet & choir singing.",
  "Homegrown Circuit Showcase - Featured in college-band circuit lists.",
  "Amplified – Band Competition at Ragam - Band-music competition within the Ragam fest.",
  "Rock‑o‑Phonix – Rock Band Competition at Alcheringa - Specific band/rock competition within Alcheringa festival.",
  "Bandish – Singing Competition at Kashiyatra - Solo/duet/group singing event at Kashiyatra.",
  "Crosswindz – Rock Music Competition at Kashiyatra - Band-rock music competition within same festival."
];