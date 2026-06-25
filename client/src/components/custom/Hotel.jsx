/* eslint-disable react/prop-types */
import HotelCard from "./HotelCard";
import styled from "styled-components";

/* 3-col grid → equal-height cards */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: stretch;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Empty = styled.div`
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 48px 20px; text-align: center;
  border: 1.5px dashed var(--border);
  border-radius: 16px;
  background: color-mix(in srgb, var(--muted) 25%, transparent);

  .icon { font-size: 40px; margin-bottom: 10px; opacity: 0.5; }
  h3 { font-size: 15px; font-weight: 600; margin: 0 0 5px; color: var(--foreground); }
  p  { font-size: 13px; color: var(--muted-foreground); max-width: 280px; line-height: 1.5; margin: 0; }
`;

const HotelRecommendations = ({ trip }) => {
  const hotels = trip?.hotel_options;
  const hasHotels = Array.isArray(hotels) && hotels.length > 0;

  if (!hasHotels) {
    return (
      <Empty>
        <div className="icon">🏨</div>
        <h3>No hotels found</h3>
        <p>We couldn&apos;t find recommendations. Try searching manually on Google.</p>
      </Empty>
    );
  }

  return (
    <Grid>
      {hotels.map((hotel, i) => <HotelCard hotel={hotel} key={i} />)}
    </Grid>
  );
};

export default HotelRecommendations;
