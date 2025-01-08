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

export const AIPrompt = `Generate Travel plan for Location: {location}, for {days} days for {people} with a {budget} budget, Give me a Hotels options list with Hotel name, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, place details must be small in 10 to 20 words, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location in time format (ex. 20-30 minutes) for {days} days with each day plan with best time in 12 hours format to visit in JSON format" 
`;
