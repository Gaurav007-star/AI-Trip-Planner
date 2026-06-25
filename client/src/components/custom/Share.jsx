/* eslint-disable react/prop-types */
import { FiShare2 } from "react-icons/fi";
import { MdCalendarToday, MdPeople, MdAccountBalanceWallet } from "react-icons/md";
import {
  WhatsappShareButton, WhatsappIcon,
  FacebookShareButton, FacebookIcon,
} from "react-share";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  margin-top: 16px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  animation: ${fadeUp} 0.45s ease 0.05s both;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }

  .location-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-foreground);
    margin: 0;
  }

  .location-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--foreground);
    margin: 0;
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--muted-foreground);
    background: var(--background);
    border: 1px solid var(--border);
    padding: 4px 12px;
    border-radius: 100px;
    white-space: nowrap;

    svg { font-size: 13px; color: var(--primary); flex-shrink: 0; }
  }

  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 9px 18px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--background);
    color: var(--foreground);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, transform 0.18s;
    flex-shrink: 0;
    white-space: nowrap;

    svg { font-size: 15px; }

    &:hover {
      background: var(--foreground);
      color: var(--background);
      border-color: var(--foreground);
      transform: translateY(-1px);
    }
  }

  .share-panel {
    display: flex;
    gap: 10px;
    padding: 10px 6px 4px;
  }
`;

const Share = ({ choice }) => {
  const shareUrl = window.location.href;
  if (!choice) return null;

  return (
    <Bar>
      <div className="info">
        <p className="location-label">Destination</p>
        <p className="location-name">{choice?.place || "—"}</p>
        <div className="chips">
          {choice?.days && (
            <span className="chip"><MdCalendarToday />{choice.days} {parseInt(choice.days) === 1 ? "Day" : "Days"}</span>
          )}
          {choice?.budget && (
            <span className="chip"><MdAccountBalanceWallet />{choice.budget} Budget</span>
          )}
          {choice?.people && (
            <span className="chip"><MdPeople />{choice.people}</span>
          )}
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="share-btn">
            <FiShare2 /> Share
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded-xl border border-border bg-card shadow-lg p-1"
        >
          <div className="share-panel">
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={40} borderRadius={10} />
            </WhatsappShareButton>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} borderRadius={10} />
            </FacebookShareButton>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </Bar>
  );
};

export default Share;
