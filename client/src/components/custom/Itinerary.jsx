/* eslint-disable react/prop-types */
import PlanCard from "./PlanCard";
import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const DaySection = styled.div`
  margin-bottom: 32px;
  animation: ${fadeUp} 0.45s ease both;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;

  .day-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--primary);
    color: var(--primary-foreground);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 5px 14px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .sep {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .stops {
    font-size: 12px;
    color: var(--muted-foreground);
    white-space: nowrap;
    flex-shrink: 0;
    font-weight: 500;
  }
`;

/* strict 2-col grid — cards have fixed height so no stretch needed */
const PlaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyDay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 18px;
  border: 1.5px dashed var(--border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--muted) 20%, transparent);
  color: var(--muted-foreground);
  font-size: 13px;
`;

const Itinerary = ({ plan, day }) => {
  const label = day !== undefined && day !== null ? `Day ${day}` : "Day";
  const hasPlaces = Array.isArray(plan) && plan.length > 0;

  return (
    <DaySection>
      <DayHeader>
        <span className="day-tag">📅 {label}</span>
        <div className="sep" />
        {hasPlaces && (
          <span className="stops">{plan.length} {plan.length === 1 ? "stop" : "stops"}</span>
        )}
      </DayHeader>

      {hasPlaces ? (
        <PlaceGrid>
          {plan.map((place, i) => (
            <PlanCard place={place} key={i} />
          ))}
        </PlaceGrid>
      ) : (
        <EmptyDay>
          <span>📍</span>
          <span>No places listed for this day.</span>
        </EmptyDay>
      )}
    </DaySection>
  );
};

export default Itinerary;
