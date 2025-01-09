/* eslint-disable react-hooks/exhaustive-deps */
import UserTrip from "@/components/custom/UserTrip";
import { UserWrapper } from "@/css-sheets/css-styles";
import { FetchTripThunk } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Userpage = () => {
  const user = useSelector((state) => state.user.user);
  const trip = useSelector((state) => state.trip.allTrip);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(FetchTripThunk(user.email));
    }
  }, [user]);

  return (
    <UserWrapper>
      <div className="left">
        <img
          className="user-picture"
          src={user ? user.picture : "https://placehold.co/400"}
        />
        <h1>{user ? `@${user.name}` : ""}</h1>
      </div>

      <div className="right">
        <div className="rtop">
          <h1>My Trips ✈️</h1>
        </div>
        <div className="rbottom">
        {trip && trip.length > 0 ? (
          trip.map((trip, index) => <UserTrip trip={trip} key={index} />)
        ) : (
          <span>Please create trips</span>
        )}
        </div>
      </div>
    </UserWrapper>
  );
};

export default Userpage;
