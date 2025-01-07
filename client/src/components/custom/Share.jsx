/* eslint-disable react/prop-types */
import { ShareWrapper } from "@/css-sheets/css-styles";
import { FaRegShareFromSquare } from "react-icons/fa6";

const Share = ({choice}) => {
  
  return (
    <ShareWrapper>
      <div className="left">
        <h1>{choice?.place}</h1>
        <div className="info">
          <div>
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            {choice?.days} Day
          </div>
          <div>
            <span role="img" aria-label="money">
              💰
            </span>{" "}
            {choice?.budget} Budget
          </div>
          <div>
            <span role="img" aria-label="traveler">
              🧳
            </span>{" "}
            No. Of Traveler: {choice?.people}
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
