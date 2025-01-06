
import HotelRecommendations from "@/components/custom/Hotel";
import Share from "@/components/custom/Share";
import { TripWrapper } from "@/css-sheets/css-styles";

const Trip = () => {

  return <>
    <TripWrapper>
        {/* image section */}
        <div className="image-section">
          <img src="/icon1.jpg" alt="trip-icon" />
        </div>

        {/* share section */}
        <Share/>

        {/* Hotel-recomendation */}
        <HotelRecommendations/>
    </TripWrapper>
  </>;
};

export default Trip;
