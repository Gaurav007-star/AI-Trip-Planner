/* eslint-disable react-hooks/exhaustive-deps */

import HotelRecommendations from "@/components/custom/Hotel";
import Itinerary from "@/components/custom/Itinerary";
import Share from "@/components/custom/Share";
import { GetTripById } from "@/store/slices/TripSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmerAnimation = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/* ── outer page bg ── */
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: var(--background);
  padding-bottom: 100px;
`;

/* ── centred narrow container (like Linear/Vercel) ── */
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  animation: ${fadeUp} 0.55s ease both;

  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

/* ── hero: contained, rounded, NOT full bleed ── */
const HeroWrap = styled.div`
  max-width: 900px;
  margin: 32px auto 0;
  padding: 0 24px;

  @media (max-width: 600px) {
    padding: 0 16px;
    margin-top: 20px;
  }
`;

const HeroCard = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
  background: var(--muted);
  box-shadow: 0 4px 24px color-mix(in srgb, var(--foreground) 8%, transparent);

  @media (max-width: 600px) {
    height: 240px;
    border-radius: 16px;
  }

  .shimmer {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--border) 25%,
      var(--muted) 50%,
      var(--border) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite ease-in-out;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      transparent 35%,
      rgba(0, 0, 0, 0.62) 100%
    );
    border-radius: 20px;
  }

  .hero-text {
    position: absolute;
    bottom: 24px;
    left: 28px;
    right: 28px;
    animation: ${fadeUp} 0.6s ease 0.1s both;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 4px 12px;
    border-radius: 100px;
    margin-bottom: 8px;
  }

  .hero-title {
    font-size: clamp(1.1rem, 2.8vw, 1.7rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin: 0;
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
    max-width: 580px;
  }
`;

/* ── divider for sections ── */
const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 44px 0 20px;

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: color-mix(in srgb, var(--primary) 8%, transparent);
    color: var(--primary);
    border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 3px 11px;
    border-radius: 100px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .rule {
    flex: 1;
    height: 1px;
    background: var(--border);
    min-width: 20px;
  }
`;

/* ── empty itinerary ── */
const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 24px;
  text-align: center;
  border: 1.5px dashed var(--border);
  border-radius: 16px;
  background: color-mix(in srgb, var(--muted) 25%, transparent);

  .icon { font-size: 44px; margin-bottom: 12px; opacity: 0.55; }
  h3 { font-size: 16px; font-weight: 600; margin: 0 0 6px; color: var(--foreground); }
  p  { font-size: 13px; color: var(--muted-foreground); max-width: 320px; line-height: 1.6; margin: 0; }
`;

const Trip = () => {
  const { id } = useParams();
  const [headingImage, setHeadingImage] = useState("");
  const [headingLoaded, setHeadingLoaded] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip.trip);

  useEffect(() => {
    Object.keys(trip).length > 0 && getPlacePhoto();
  }, [trip]);

  useEffect(() => {
    if (!headingImage) { setHeadingLoaded(false); return; }
    const img = new Image();
    let cancelled = false;
    const show = () => { if (!cancelled) setTimeout(() => setHeadingLoaded(true), 200); };
    img.onload = show; img.onerror = show; img.src = headingImage;
    if (img.complete) show();
    return () => { cancelled = true; };
  }, [headingImage]);

  const getPlacePhoto = async () => {
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        params: {
          query: `${trip?.trip?.location || trip?.choice?.place} travel landscape`,
          per_page: 5
        },
        headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY }
      });
      const images = response.data.photos.map((p) => p.src.large2x);
      setHeadingImage(images[0] || "");
    } catch (err) {
      toast.error(err.message || "Could not load hero image");
    }
  };

  useEffect(() => { dispatch(GetTripById(id)); }, [id]);

  const itinerary = trip?.trip?.itinerary;
  const hasItinerary = Array.isArray(itinerary) && itinerary.length > 0;
  const tripLoaded = trip && Object.keys(trip).length > 0;
  const location = trip?.trip?.location || trip?.choice?.place || "Your Trip";

  return (
    <PageWrapper>

      {/* ── Back button ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <button
          onClick={() => navigate("/user")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pt-8 pb-2"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back
        </button>
      </div>

      {/* ── Hero Image (contained, rounded) ── */}
      <HeroWrap>
        <HeroCard>
          {!headingLoaded && <div className="shimmer" />}
          {headingImage && (
            <img
              src={headingImage}
              alt="Trip destination"
              style={{ display: headingLoaded ? "block" : "none" }}
            />
          )}
          {headingLoaded && (
            <>
              <div className="overlay" />
              <div className="hero-text">
                <div className="hero-badge">✈️ AI Trip Planner</div>
                <h1 className="hero-title">{location}</h1>
              </div>
            </>
          )}
        </HeroCard>
      </HeroWrap>

      {/* ── Content ── */}
      <Container>

        {/* Trip info + share */}
        <Share choice={trip?.choice} />

        {/* Hotels */}
        <SectionLabel>
          <span className="pill">🏨 Stays</span>
          <span className="title">Hotel Recommendations</span>
          <div className="rule" />
        </SectionLabel>
        <HotelRecommendations trip={trip?.trip} />

        {/* Itinerary */}
        <SectionLabel>
          <span className="pill">🗺️ Itinerary</span>
          <span className="title">Places to Visit</span>
          <div className="rule" />
        </SectionLabel>

        {tripLoaded && hasItinerary ? (
          itinerary.map((item, index) => (
            <Itinerary
              key={index}
              day={item.day}
              plan={item.plan}
            />
          ))
        ) : tripLoaded ? (
          <EmptyBox>
            <div className="icon">🗺️</div>
            <h3>No places to visit yet</h3>
            <p>We couldn&apos;t generate specific places for this trip. Try creating a new trip with different preferences.</p>
          </EmptyBox>
        ) : null}

      </Container>
    </PageWrapper>
  );
};

export default Trip;
