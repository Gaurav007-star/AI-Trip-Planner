export const travelOptions = [
  {
    id: 1,
    title: "Just Me",
    description: "A sole travels in exploration",
    icon: "✈️",
    people: "1 person"
  },
  {
    id: 2,
    title: "A Couple",
    description: "Two travels in tandem",
    icon: "🥂",
    people: "2 people"
  },
  {
    id: 3,
    title: "Family",
    description: "A group of fun loving adventure",
    icon: "🏡",
    people: "3 to 5 people" // Example: Adjust this number as needed
  },
  {
    id: 4,
    title: "Friends",
    description: "A bunch of thrill-seekers",
    icon: "⛵",
    people: "more than 5 people" // Example: Adjust this number as needed
  }
];

export const budgetOptions = [
  {
    id: 1,
    title: "Cheap",
    description: "Stay conscious of costs",
    icon: "💵"
  },
  {
    id: 2,
    title: "Moderate",
    description: "Keep cost on the average side",
    icon: "💰"
  },
  {
    id: 3,
    title: "Luxury",
    description: "Don't worry about cost",
    icon: "🤑"
  }
];

export const AIPrompt = `Generate a travel plan for Location: {location}, for {days} days for {people} with a {budget} budget.

You MUST respond with ONLY a raw JSON object matching this exact schema — no markdown, no code fences, no extra text:

{
  "location": "string (city/country name)",
  "duration_days": number,
  "budget": "string",
  "traveler_count": number,
  "hotel_options": [
    {
      "hotel_name": "string",
      "hotel_address": "string",
      "price": "string (include currency)",
      "hotel_image_url": "string",
      "geo_coordinates": { "latitude": number, "longitude": number },
      "rating": number,
      "descriptions": "string (1-2 sentences)"
    }
  ],
  "itinerary": [
    {
      "day": number,
      "plan": [
        {
          "time": "string (12-hour format e.g. 09:00 AM)",
          "placeName": "string",
          "placeDetails": "string (10-20 words)",
          "placeImageUrl": "string",
          "geoCoordinates": { "latitude": number, "longitude": number },
          "ticketPricing": "string (include currency or Free)",
          "travelTime": "string (e.g. 20-30 minutes)"
        }
      ]
    }
  ]
}

Include exactly {days} days in the itinerary with 2-4 places per day. Generate realistic hotel_options (2-4 hotels) with believable geo_coordinates near the destination.`
;
