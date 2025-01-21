/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const UserTrip = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();


  const GoToTripPage = (id) => {
    navigate(`/trip/${id}`);
  };


  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${trip?.choice?.place} nature or buildings`,
          per_page: 5
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY
        }
      });

      const images = response.data.photos.map((photo) => photo.src.landscape);
      setPhotoUrl(images[1]);
    } catch (error) {
      // console.error("Error fetching images from Pexels:", error);
      toast.error(error.message || "Error fetching images from");
    }
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <>
      <div className="trip-box" onClick={() => GoToTripPage(trip?._id)}>
        <img src={`${photoUrl}`} alt="location image" />
        <h1>{trip.trip?.trip_details?.location}</h1>
      </div>
    </>
  );
};

export default UserTrip;


