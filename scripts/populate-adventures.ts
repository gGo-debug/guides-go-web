const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const adventures = [
  {
    title: "Mount Rainier Summit Adventure",
    description: "Challenge yourself with this iconic climb to the summit of Mount Rainier. Experience breathtaking views and professional guidance throughout this two-day mountaineering adventure.",
    location: "Mount Rainier National Park, WA",
    duration: "2 days",
    price: 599.99,
    difficulty: "Expert",
    group_size: "4-8 people",
    image_url: "/adventures/rainier.jpg",
    included_items: [
      "Professional guide",
      "Technical gear",
      "Safety equipment",
      "Mountain permits",
      "Group camping gear"
    ],
    required_items: [
      "Hiking boots",
      "Weather-appropriate clothing",
      "Personal camping gear",
      "Headlamp",
      "Water bottles"
    ],
    category: "Mountaineering",
    average_rating: 4.9,
    review_count: 124,
    is_featured: true,
    status: "active"
  },
  {
    title: "Kayaking the San Juan Islands",
    description: "Paddle through the pristine waters of the San Juan Islands, spotting orcas, seals, and eagles while exploring hidden coves and remote beaches.",
    location: "San Juan Islands, WA",
    duration: "Full day",
    price: 199.99,
    difficulty: "Moderate",
    group_size: "2-6 people",
    image_url: "/adventures/kayak.jpg",
    included_items: [
      "Kayak and paddle",
      "Life jacket",
      "Guide",
      "Lunch",
      "Safety equipment"
    ],
    required_items: [
      "Sunscreen",
      "Water shoes",
      "Change of clothes",
      "Water bottle"
    ],
    category: "Kayaking",
    average_rating: 4.8,
    review_count: 89,
    is_featured: true,
    status: "active"
  },
  {
    title: "Olympic National Park Hiking Tour",
    description: "Explore the diverse ecosystems of Olympic National Park, from rainforests to alpine meadows, with an experienced naturalist guide.",
    location: "Olympic National Park, WA",
    duration: "6 hours",
    price: 149.99,
    difficulty: "Easy",
    group_size: "4-10 people",
    image_url: "/adventures/olympic.jpg",
    included_items: [
      "Professional guide",
      "Trail snacks",
      "Park permits",
      "Hiking poles",
      "First aid kit"
    ],
    required_items: [
      "Hiking shoes",
      "Daypack",
      "Rain jacket",
      "Water bottle"
    ],
    category: "Hiking",
    average_rating: 4.7,
    review_count: 156,
    is_featured: false,
    status: "active"
  },
  {
    title: "Rock Climbing at Leavenworth",
    description: "Perfect for both beginners and experienced climbers, this guided climbing adventure in Leavenworth offers routes for all skill levels.",
    location: "Leavenworth, WA",
    duration: "5 hours",
    price: 179.99,
    difficulty: "Moderate",
    group_size: "2-4 people",
    image_url: "/adventures/climbing.jpg",
    included_items: [
      "Climbing gear",
      "Helmet",
      "Harness",
      "Professional guide",
      "Safety equipment"
    ],
    required_items: [
      "Athletic clothing",
      "Climbing shoes (rentable)",
      "Water bottle",
      "Snacks"
    ],
    category: "Rock Climbing",
    average_rating: 4.9,
    review_count: 78,
    is_featured: true,
    status: "active"
  },
  {
    title: "Mountain Biking at Tiger Mountain",
    description: "Experience the thrill of mountain biking on Tiger Mountain's world-class trails, suitable for intermediate to advanced riders.",
    location: "Issaquah, WA",
    duration: "4 hours",
    price: 159.99,
    difficulty: "Challenging",
    group_size: "2-6 people",
    image_url: "/adventures/biking.jpg",
    included_items: [
      "Professional guide",
      "Mountain bike (optional)",
      "Helmet",
      "Basic repair kit",
      "Trail map"
    ],
    required_items: [
      "Athletic clothing",
      "Closed-toe shoes",
      "Water bottle",
      "Personal bike (optional)"
    ],
    category: "Mountain Biking",
    average_rating: 4.8,
    review_count: 92,
    is_featured: false,
    status: "active"
  },
  {
    title: "Snowshoe Adventure at Mount Baker",
    description: "Discover the winter wonderland of Mount Baker on this guided snowshoe tour, perfect for beginners and families.",
    location: "Mount Baker, WA",
    duration: "4 hours",
    price: 129.99,
    difficulty: "Easy",
    group_size: "4-12 people",
    image_url: "/adventures/snowshoe.jpg",
    included_items: [
      "Snowshoes",
      "Poles",
      "Guide",
      "Hot beverages",
      "Trail snacks"
    ],
    required_items: [
      "Winter clothing",
      "Waterproof boots",
      "Gloves",
      "Hat"
    ],
    category: "Winter Sports",
    average_rating: 4.7,
    review_count: 67,
    is_featured: true,
    status: "active"
  }
];

const insertAdventures = async () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing environment variables');
      process.exit(1);
    }
  
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  
    for (const adventure of adventures) {
      try {
        const { data, error } = await supabase
          .from('adventures')
          .insert([adventure])
          .select();
  
        if (error) {
          console.error('Error inserting adventure:', error);
          continue;
        }
  
        console.log('Successfully inserted adventure:', adventure.title);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  // Run the script
  insertAdventures()
    .then(() => {
      console.log('Finished inserting adventures');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });