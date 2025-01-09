/* eslint-disable react-hooks/exhaustive-deps */

import HotelRecommendations from "@/components/custom/Hotel";
import Itinerary from "@/components/custom/Itinerary";
import Share from "@/components/custom/Share";
import { TripWrapper } from "@/css-sheets/css-styles";
import { GetTripById } from "@/store/slices/TripSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Trip = () => {
  const { id } = useParams();
  const [headingImage, setHeadingImage] = useState("");

  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.trip);

  useEffect(() => {
    Object.keys(trip).length > 0 && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${trip?.trip?.trip_details?.location} nature buildings`,
          per_page: 5
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY
        }
      });

      const images = response.data.photos.map((photo) => photo.src.original);
      setHeadingImage(images[1]);
    } catch (error) {
      // console.error("Error fetching images from Pexels:", error);
      toast.error(error.message || "Error fetching images from");
    }
  };

  useEffect(() => {
    dispatch(GetTripById(id));
  }, [id]);

  return (
    <>
      <TripWrapper>
        {/* image section */}
        <div className="image-section">
          <img src={`${headingImage}`} alt="Loading..." />
        </div>

        {/* share section */}
        <Share choice={trip && trip?.choice} />

        {/* Hotel-recomendation */}
        <HotelRecommendations trip={trip && trip?.trip} />

        {/* Ininerary */}
        <h1>Place to visit 🚀</h1>
        {Object.keys(trip).length > 0 &&
          Object.keys(trip?.trip?.itinerary).map((day, index) => {
            return (
              <Itinerary
                key={index}
                day={day}
                plan={trip?.trip?.itinerary[day]}
              />
            );
          })}
      </TripWrapper>
    </>
  );
};

export default Trip;
