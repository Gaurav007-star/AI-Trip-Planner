/* eslint-disable react/prop-types */
import { HotelWrapper } from "@/css-sheets/css-styles";
import HotelCard from "./HotelCard";

const HotelRecommendations = ({ trip }) => {
  // const { hotel_options } = trip;

  return (
    <HotelWrapper>
      <h1>Hotel Recommendation</h1>

      <div className="hotel-grid">
        {trip?.hotel_options &&
          trip?.hotel_options?.map((hotel, index) => (
            <HotelCard hotel={hotel} key={index} />
          ))}
      </div>
    </HotelWrapper>
  );
};

export default HotelRecommendations;
