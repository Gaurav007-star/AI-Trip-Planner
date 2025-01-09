/* eslint-disable react-hooks/exhaustive-deps */
import { UserWrapper } from "@/css-sheets/css-styles";
import { FetchTripThunk } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Userpage = () => {
  const user = useSelector((state) => state.user.user);
  const trip = useSelector((state) => state.trip.allTrip);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(FetchTripThunk(user.email));
    }
  }, [user]);

  const GoToTripPage = (id) =>{
    console.log(id);
    
    navigate(`/trip/${id}`)
  }

  // console.log("TRIP:",trip[0]._id);

  return (
    <UserWrapper>
      <div className="left">
        <img
          className="user-picture"
          src={user ? user.picture : `/icon1.jpg`}
        />
        <h1>{user ? `@${user.name}` : ""}</h1>
      </div>
      <div className="right">
        {trip && trip.length > 0 ? (
          trip.map((trip, index) => (
            <div key={index} className="trip-box" onClick={()=>GoToTripPage(trip?._id)}>
              <img src={`${trip.trip?.trip_details?.location_image_url}`} alt="location image" />
              <h1>{trip.trip?.trip_details?.location}</h1>
            </div>
          ))
        ) : (
          <span>Please create trips</span>
        )}
      </div>
    </UserWrapper>
  );
};

export default Userpage;
