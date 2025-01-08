/* eslint-disable react/prop-types */
import { HotelWrapper } from "@/css-sheets/css-styles";
import { Link } from "react-router-dom";

const HotelRecommendations = ({ trip }) => {
  // const { hotel_options } = trip;

  return (
    <HotelWrapper>
      <h1>Hotel Recommendation</h1>

      <div className="hotel-grid">
        {trip?.hotel_options &&
          trip?.hotel_options?.map((hotel, index) => (
            <Link
              to={
                "https://www.google.com/maps/search/?api=1&query=" +
                hotel?.hotel_name +
                "," +
                hotel?.hotel_address
              }
              target="_blank"
              key={index}
            >
              <div className="hotel-card" key={index}>
                <img
                  src="https://via.placeholder.com/300x200"
                  alt={`${hotel.name}`}
                />
                <div className="hotel-name">{hotel?.hotel_name}</div>
                <div className="hotel-location">{hotel?.hotel_address}</div>
                <div className="hotel-price">💰 {hotel?.price}</div>
                <div className="hotel-stars">⭐ {hotel?.rating}</div>
              </div>
            </Link>
          ))}
      </div>
    </HotelWrapper>
  );
};

export default HotelRecommendations;
