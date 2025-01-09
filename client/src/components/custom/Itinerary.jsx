/* eslint-disable react/prop-types */
import { VisitWrapper } from "@/css-sheets/css-styles";
import PlanCard from "./PlanCard";
import { useEffect, useState } from "react";
const Itinerary = ({ plan, day }) => {
  const [visitday, setVisitDay] = useState();

  useEffect(() => {
    setVisitDay(day.toUpperCase());
  }, [day]);

  return (
    <VisitWrapper>

      <h2>{visitday}</h2>
      <div className="visit-wrapper">
        {plan?.plan &&
          plan?.plan.map((place, index) => {
            return <PlanCard place={place} plan={plan} key={index} />;
          })}
      </div>
    </VisitWrapper>
  );
};

export default Itinerary;
