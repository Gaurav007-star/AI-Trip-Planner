/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PlanCard = ({ place, plan }) => {
  const [photoUrl, setPhotoUrl] = useState("");

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${place?.placeName} nature buildings`,
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
    place && getPlacePhoto();
  }, [place]);


  return (
    <Link
    className="w-[45%] h-[22vh] rounded-[10px]"
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="box">
        <div className="left">
          <img src={photoUrl} alt="place-image" />
        </div>
        <div className="right">
          <div className="r-top">
            <span>{place?.placeName}</span>
          </div>
          <div className="r-middle">
            <p>{place?.placeDetails}</p>
          </div>
          <div className="r-bottom text-red-400">
            <span>{plan?.best_time_to_visit}</span>
            <MdPlace style={{ fontSize: "20px", color: "orangered" }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlanCard;
