/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${hotel?.hotel_name} nature buildings`,
          per_page: 5
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY
        }
      });

      const images = response.data.photos.map((photo) => photo.src.medium);
      setPhotoUrl(images[1]);
    } catch (error) {
      // console.error("Error fetching images from Pexels:", error);
      toast.error(error.message || "Error fetching images from");
    }
  };

  useEffect(() => {
    hotel && getPlacePhoto();
  }, [hotel]);

  return (
    <>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel?.hotel_name +
          "," +
          hotel?.hotel_address
        }
        target="_blank"
      >
        <div className="hotel-card">
          <img src={photoUrl} alt={`Loading...`} />
          <div className="hotel-name">{hotel?.hotel_name}</div>
          <div className="hotel-location">{hotel?.hotel_address}</div>
          <div className="hotel-price">💰 {hotel?.price}</div>
          <div className="hotel-stars">⭐ {hotel?.rating}</div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;
