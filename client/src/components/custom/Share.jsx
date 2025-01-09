/* eslint-disable react/prop-types */
import { ShareWrapper } from "@/css-sheets/css-styles";
import { FaRegShareFromSquare } from "react-icons/fa6";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon
} from "react-share";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Share = ({ choice }) => {

  const shareUrl = window.location.href

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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaRegShareFromSquare
              color="black"
              fontSize={"30px"}
              className="share-icon outline-none"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="shadow-lg p-2 gap-5">
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={"50px"} borderRadius={"50%"} className="mr-2"/>
            </WhatsappShareButton>

            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={"50px"} borderRadius={"50%"} className=""/>
            </FacebookShareButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ShareWrapper>
  );
};

export default Share;
