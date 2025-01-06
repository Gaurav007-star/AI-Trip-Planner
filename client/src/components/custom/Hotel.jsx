import { HotelWrapper } from "@/css-sheets/css-styles";

const hotels = [
  {
    name: "Mandarin Oriental Tokyo",
    location: "Nihonbashi 1-Chome-2-1 Chuo, Tokyo 103-8328, Japan",
    price: "$1000+",
    stars: "5 stars"
  },
  {
    name: "Imperial Hotel",
    location: "1-1-1 Uchisaiwai-cho, Chiyoda City, Tokyo 100-8558, Japan",
    price: "$800+",
    stars: "5 stars"
  },
  {
    name: "Four Seasons Hotel Tokyo at Marunouchi",
    location: "Marunouchi 1-11-2 Chiyoda, Tokyo 100-0005, Japan",
    price: "$900+",
    stars: "5 stars"
  },
  {
    name: "Park Hyatt Tokyo",
    location: "3-7-1-2 Nishi-Shinjuku, Shinjuku, Tokyo 163-0600, Japan",
    price: "$1200+",
    stars: "5 stars"
  }
];

const HotelRecommendations = () => {
  return (
    <HotelWrapper>
      <h1>Hotel Recommendation</h1>
      <div className="hotel-grid">
        {hotels.map((hotel, index) => (
          <div className="hotel-card" key={index}>
            <img
              src="https://via.placeholder.com/300x200"
              alt={`${hotel.name}`}
            />
            <div className="hotel-name">{hotel.name}</div>
            <div className="hotel-location">{hotel.location}</div>
            <div className="hotel-price">💰 {hotel.price}</div>
            <div className="hotel-stars">⭐ {hotel.stars}</div>
          </div>
        ))}
      </div>
    </HotelWrapper>
  );
};

export default HotelRecommendations;
