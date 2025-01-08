/* eslint-disable react/prop-types */
import { VisitWrapper } from "@/css-sheets/css-styles";
import { MdPlace } from "react-icons/md";
const Itinerary = ({ plan }) => {
  //   const { itinerary } = trip;
  console.log("DAYee", plan);

  return (
    <VisitWrapper>
      <h1>Place to visit 🚀</h1>
      <h2>Day 1</h2>
      <div className="visit-wrapper">
        {plan?.plan &&
          plan?.plan.map((place, index) => {
            return (
              <div className="box" key={index}>
                <div className="left">
                  <img src="https://via.placeholder.com/300x200" alt="place-image" />
                </div>
                <div className="right">
                  <div className="r-top">
                    <span>{place?.placeName}</span>
                  </div>
                  <div className="r-middle">
                    <p>{place?.placeDetails}</p>
                  </div>
                  <div className="r-bottom">
                    <span>{plan?.best_time_to_visit}</span>
                    <MdPlace style={{fontSize:"20px",color:"orangered"}} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </VisitWrapper>
  );
};

export default Itinerary;
