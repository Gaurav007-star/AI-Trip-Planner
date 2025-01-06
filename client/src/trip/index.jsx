/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { TripWrapper } from "@/css-sheets/css-styles";
import { FetchTripThunk } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Trip = () => {
  const user = useSelector((state) => state.user.user);
  const trip = useSelector(state=>state.trip.trip)
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(user);
    
    if (user) {
      dispatch(FetchTripThunk(user.id));
    }
  }, [user]);

  return <>
    <TripWrapper>

    </TripWrapper>
  </>;
};

export default Trip;
