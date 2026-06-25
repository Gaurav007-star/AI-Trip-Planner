/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  /* stretch to grid row height so all cards are equal */
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px color-mix(in srgb, var(--foreground) 10%, transparent);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  /* ── image ── */
  .img-box {
    position: relative;
    width: 100%;
    height: 160px;
    flex-shrink: 0;
    overflow: hidden;
    background: var(--muted);
  }

  .img-box img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &:hover .img-box img { transform: scale(1.06); }

  .img-box .shimmer-el {
    width: 100%; height: 100%;
    background: linear-gradient(90deg, var(--border) 25%, var(--muted) 50%, var(--border) 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite ease-in-out;
  }

  .img-box .no-img {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 36px; opacity: 0.3;
  }

  /* price badge top-right of image */
  .price-badge {
    position: absolute;
    top: 10px; right: 10px;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    color: #fff;
    font-size: 11px; font-weight: 700;
    padding: 3px 9px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.18);
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  /* ── body ── */
  .body {
    padding: 14px 16px 16px;
    display: flex;
    flex-direction: column;
    flex: 1;               /* fills card height */
    gap: 4px;
  }

  .name {
    font-size: 14px;
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .addr {
    font-size: 11px;
    color: var(--muted-foreground);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  .desc {
    font-size: 11px;
    color: var(--muted-foreground);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;               /* push footer to bottom */
    margin: 2px 0 0;
  }

  /* ── footer row ── */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: var(--foreground);
  }

  .stars { color: #f59e0b; font-size: 12px; letter-spacing: -1px; }

  .map-btn {
    font-size: 11px;
    font-weight: 600;
    color: var(--primary);
    padding: 3px 10px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--primary) 22%, transparent);
    background: color-mix(in srgb, var(--primary) 7%, transparent);
    transition: all 0.18s ease;
    white-space: nowrap;

    &:hover {
      background: var(--primary);
      color: var(--primary-foreground);
      border-color: var(--primary);
    }
  }
`;

/* simple star renderer */
const Stars = ({ rating }) => {
  if (!rating) return null;
  const full = Math.floor(rating);
  const empty = 5 - Math.round(rating);
  return (
    <span className="rating">
      <span className="stars">
        {"★".repeat(Math.round(rating))}
        <span style={{ opacity: 0.25 }}>{"★".repeat(Math.max(0, empty))}</span>
      </span>
      <span>{rating}</span>
    </span>
  );
};

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchPhoto = async () => {
    try {
      const res = await axios.get("https://api.pexels.com/v1/search", {
        params: { query: `${hotel?.hotel_name} hotel`, per_page: 4 },
        headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
      });
      const imgs = res.data.photos;
      setPhotoUrl(imgs[0]?.src?.medium || "");
    } catch (e) {
      toast.error(e.message || "Image fetch failed");
    }
  };

  useEffect(() => { hotel && fetchPhoto(); }, [hotel]);

  useEffect(() => {
    if (!photoUrl) { setLoaded(false); return; }
    const img = new Image();
    let dead = false;
    const done = () => { if (!dead) setTimeout(() => setLoaded(true), 120); };
    img.onload = done; img.onerror = done; img.src = photoUrl;
    if (img.complete) done();
    return () => { dead = true; };
  }, [photoUrl]);

  const q = hotel?.geo_coordinates
    ? `${hotel.geo_coordinates.latitude},${hotel.geo_coordinates.longitude}`
    : `${hotel?.hotel_name} ${hotel?.hotel_address}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  return (
    <Link to={mapsUrl} target="_blank" style={{ textDecoration: "none", display: "flex", height: "100%" }}>
      <Card>
        {/* Image */}
        <div className="img-box">
          {!loaded && !photoUrl && <div className="no-img">🏨</div>}
          {!loaded && photoUrl && <div className="shimmer-el" />}
          {photoUrl && <img src={photoUrl} alt={hotel?.hotel_name} style={{ display: loaded ? "block" : "none" }} />}
          {hotel?.price && <span className="price-badge">{hotel.price}</span>}
        </div>

        {/* Body */}
        <div className="body">
          <p className="name">{hotel?.hotel_name}</p>
          {hotel?.hotel_address && <p className="addr">📍 {hotel.hotel_address}</p>}
          {hotel?.descriptions && <p className="desc">{hotel.descriptions}</p>}

          <div className="footer">
            <Stars rating={hotel?.rating} />
            <span className="map-btn">View Map ↗</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default HotelCard;
