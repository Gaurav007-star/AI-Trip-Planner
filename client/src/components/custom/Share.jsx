import { ShareWrapper } from "@/css-sheets/css-styles";
import { FaRegShareFromSquare } from "react-icons/fa6";

const Share = () => {
  return (
    <ShareWrapper>
      <div className="left">
        <h1>Tokyo, Japan</h1>
        <div className="info">
          <div>
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            4 Day
          </div>
          <div>
            <span role="img" aria-label="money">
              💰
            </span>{" "}
            Luxury Budget
          </div>
          <div>
            <span role="img" aria-label="traveler">
              🧳
            </span>{" "}
            No. Of Traveler: 2 People
          </div>
        </div>
      </div>

      <div className="right">
        <FaRegShareFromSquare color="black" fontSize={"30px"} className="share-icon"/>
      </div>
    </ShareWrapper>
  );
};

export default Share;
