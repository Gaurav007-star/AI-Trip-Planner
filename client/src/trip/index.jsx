/* eslint-disable react-hooks/exhaustive-deps */

import HotelRecommendations from "@/components/custom/Hotel";
import Share from "@/components/custom/Share";
import { TripWrapper } from "@/css-sheets/css-styles";
import { GetTripById } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Trip = () => {

  const {id} = useParams()
  
  const dispatch = useDispatch();
  const trip = useSelector(state=>state.trip.trip)

  useEffect(()=>{
    dispatch(GetTripById(id))
  },[id])
  
  return <>
    <TripWrapper>
        {/* image section */}
        <div className="image-section">
          <img src="/icon1.jpg" alt="trip-icon" />
        </div>

        {/* share section */}
        <Share choice={trip && trip?.choice}/>

        {/* Hotel-recomendation */}
        <HotelRecommendations trip={trip && trip?.trip}/>
    </TripWrapper>
  </>;
};

export default Trip;
