/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { MdPlace, MdConfirmationNumber, MdTimer } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  height: 148px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  animation: ${fadeUp} 0.38s ease both;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px color-mix(in srgb, var(--foreground) 9%, transparent);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  .img-strip {
    position: relative;
    width: 160px;
    flex-shrink: 0;
    background: var(--muted);
    overflow: hidden;
  }

  .img-strip img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  &:hover .img-strip img { transform: scale(1.07); }

  .img-strip .no-img {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; opacity: 0.25;
  }

  .time-tag {
    position: absolute;
    bottom: 7px; left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.58);
    backdrop-filter: blur(6px);
    color: #fff;
    font-size: 9px; font-weight: 700;
    padding: 2px 7px;
    border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.15);
    white-space: nowrap;
  }

  .content {
    flex: 1;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 3px;
    overflow: hidden;
  }

  .place-name {
    font-size: 12px;
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.3;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .place-desc {
    font-size: 10.5px;
    color: var(--muted-foreground);
    line-height: 1.45;
    flex: 1;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--border);
    align-items: center;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 500;
    color: var(--muted-foreground);
    background: var(--background);
    border: 1px solid var(--border);
    padding: 2px 7px;
    border-radius: 6px;
    white-space: nowrap;

    svg { font-size: 11px; color: var(--primary); }
  }

  .map-chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 600;
    color: var(--primary);
    padding: 2px 7px;
    border-radius: 6px;
    border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
    background: color-mix(in srgb, var(--primary) 7%, transparent);
    margin-left: auto;
    white-space: nowrap;
    transition: all 0.18s ease;

    svg { font-size: 11px; }

    &:hover { background: var(--primary); color: var(--primary-foreground); }
  }
`;

const PlanCard = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchPhoto = async () => {
    try {
      const res = await axios.get("https://api.pexels.com/v1/search", {
        params: { query: `${place?.placeName} travel landmark`, per_page: 4 },
        headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
      });
      const imgs = res.data.photos;
      setPhotoUrl(imgs[0]?.src?.medium || "");
    } catch (e) {
      toast.error(e.message || "Image fetch failed");
    }
  };

  useEffect(() => { place && fetchPhoto(); }, [place]);

  useEffect(() => {
    if (!photoUrl) { setLoaded(false); return; }
    const img = new Image();
    let dead = false;
    const done = () => { if (!dead) setTimeout(() => setLoaded(true), 120); };
    img.onload = done; img.onerror = done; img.src = photoUrl;
    if (img.complete) done();
    return () => { dead = true; };
  }, [photoUrl]);

  const q = place?.geoCoordinates
    ? `${place.geoCoordinates.latitude},${place.geoCoordinates.longitude}`
    : place?.placeName;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q || "")}`;

  return (
    <Link to={mapsUrl} target="_blank" style={{ textDecoration: "none", display: "block" }}>
      <Card>
        {/* Image strip */}
        <div className="img-strip">
          {!loaded && !photoUrl && <div className="no-img">🏛️</div>}
          {!loaded && photoUrl && <Skeleton className="size-full rounded-none absolute inset-0" />}
          {photoUrl && (
            <img src={photoUrl} alt={place?.placeName} style={{ display: loaded ? "block" : "none" }} />
          )}
          {place?.time && <div className="time-tag">{place.time}</div>}
        </div>

        {/* Content */}
        <div className="content">
          <p className="place-name">{place?.placeName}</p>
          {place?.placeDetails && <p className="place-desc">{place.placeDetails}</p>}

          <div className="chips">
            {place?.ticketPricing && (
              <span className="chip"><MdConfirmationNumber />{place.ticketPricing}</span>
            )}
            {/* JSON field: travelTime */}
            {place?.travelTime && (
              <span className="chip"><MdTimer />{place.travelTime}</span>
            )}
            <span className="map-chip"><MdPlace />Map</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PlanCard;
