import styled from "styled-components";

export const HeaderWrapper = styled.h1`
  /* background-color: red; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2vh 0;
  position: relative;

  img {
    width: 10vw;
    background-position: center;
    background-size: cover;
  }

  .button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
  }
`;

export const HeroWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 7vh;
  padding: 0 5vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 8vh;
    text-align: center;
  }

  h1 span {
    font-size: 7vh;
    color: #ff7d00;
    text-shadow: 0 0 3px #ff9635;
  }

  h3 {
    text-align: center;
    font-size: 16px;
    color: #c4c4c4;
    margin: 5vh 0;
  }

  img {
    width: 90%;
    height: 90%;
  }

  @media (max-width: 768px) {
    * {
      transition: all 0.2s linear;
    }
    h1 {
      font-size: 4vh;
    }

    h1 span {
      font-size: 3vh;
    }
    h3 {
      font-size: 10px;
    }
  }
`;

export const CreateTripWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 2vh 15vw;
  margin-top: 5vh;

  h1 {
    font-size: 7vh;
  }

  span {
    color: #c4c4c4;
    margin-top: 2vh;
  }

  .choices {
    width: 100%;
    height: auto;
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    gap: 5vh;
    margin-bottom: 10vh;
  }

  .choices .destination {
    width: 100%;
    height: auto;
  }

  .choices .destination h2 {
    font-size: 2.5vh;
    margin-bottom: 10px;
  }

  .detail-section {
    width: 100%;
    height: auto;
  }

  .detail-section h2 {
    font-size: 2.5vh;
    margin-bottom: 5px;
  }

  .detail-section .detail-box {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
    padding: 3vh 0;
    margin-bottom: 5vh;
  }

  .detail-section .detail-box .box {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    font-size: 100%;
    width: 18vw;
    height: 23vh;
    box-shadow: 0 0 5px #ddd;
    transition: transform 330ms ease-in-out;
    cursor: pointer;
  }

  .detail-section .detail-box .box:hover {
    box-shadow: 4px 4px 1px #dbdbdb;
    transform: scale(1.05);
    border: 2px solid #dbdbdb;
  }

  @media (max-width: 800px) {
    * {
      transition: all 0.2s linear;
    }
    .detail-section .detail-box .box {
      flex: 1 1 auto;
      font-size: 14px;
    }
  }
`;

export const TripWrapper = styled.div`
  width: 100%;
  height: auto;
  /* background-color: rebeccapurple; */
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2vh 13vw;

  .image-section {
    width: 100%;
    height: 60vh;
    border-radius: 30px;
    /* background-color: beige; */
  }

  h1 {
    font-size: 24px;
    margin-top: 5vh;
  }

  .image-section img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
`;

export const UserWrapper = styled.div`
  width: 100%;
  height: 85vh;
  /* background-color: beige; */
  display: flex;

  .left {
    width: 20%;
    height: 100%;
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .left .user-picture {
    width: 80%;
    height: 40vh;
    border-radius: 20px;
    border: 2px solid black;
    box-shadow: -5px 4px 0 black;
  }

  .left h1 {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    padding: 10px;
    /* background-color: royalblue; */
  }

  .right .rtop {
    width: 100%;
    height: 7%;
  }

  .right .rbottom {
    width: 100%;
    height: 93%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 20px;
    padding: 10px;
  }

  .right .rtop h1 {
    font-size: 24px;
  }

  .right .trip-box {
    width: 15vw;
    height: 35vh;
    border-radius: 20px;
    text-align: center;
    border: 4px solid orange;
    padding: 5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    margin: 5px;
  }

  .right .trip-box:hover {
    transform: scale(1.02);
    border: none;
    box-shadow: -5px 4px 0 orange;
    border: none;
  }

  .right .trip-box img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  .right .trip-box h1 {
    margin-top: 10px;
  }

  @media (max-width: 855px) {
    .right {
      width: 80%;
    }
    .right .trip-box {
      flex: 1 1 auto;
    }

    .right .trip-box h1 {
      margin-top: 5px;
      font-size: 12px;
    }
  }
`;

export const ShareWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  /* background-color: #e2e2e2; */

  .left {
    width: 80%;
    height: auto;
    gap: 1rem;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .left .info {
    width: 100%;
    height: 100%;
  }

  .left h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  .left .info div {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background-color: #e2e2e2;
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;

    svg {
      font-size: 1.2rem;
      color: #666;
    }
  }

  .right {
    width: 20%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  }

  .right .share-icon {
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  .right .share-icon:hover {
    transform: scale(1.1);
  }
`;

export const HotelWrapper = styled.div`
  width: 100%;
  margin-top: 5vh;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .hotel-grid {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    justify-content: start;
  }

  .hotel-card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 20vw;
    height: 55vh;
    flex: 1 1 auto;
    transition: all 0.2s ease-in-out;
    padding: 15px;
  }

  .hotel-card:hover {
    box-shadow: 0 0 10px #e2e2e2;
    cursor: pointer;
    transform: scale(1.02);
  }

  .hotel-card img {
    width: 100%;
    height: 25vh;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .hotel-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;

    width: 100%;
  }

  .hotel-location {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }

  .hotel-price {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  .hotel-stars {
    font-size: 14px;
    color: #ffcc00;
  }

  @media (max-width: 940px) {
    .hotel-card {
      width: 30vw;
      height: 50vh;
    }

    .hotel-card img {
      width: 100%;
      height: 20vh;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .hotel-name {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
      width: 100%;
    }

    .hotel-location {
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
    }

    .hotel-price {
      font-size: 10px;
    }

    .hotel-stars {
      font-size: 10px;
      color: #ffcc00;
    }
  }

  @media (max-width: 715px) {
    .hotel-grid {
      background-color: red;
      gap: 7px;
      width: 70vw;
    }
    .hotel-card {
      width: 22vw;
      height: 35vh;
    }

    .hotel-card img {
      width: 100%;
      height: 15vh;
      border-radius: 10px;
      margin-bottom: 10px;
    }

    .hotel-name {
      font-size: 10px;
      font-weight: bold;
      margin-bottom: 5px;
      width: 100%;
    }

    .hotel-location {
      font-size: 9px;
      color: #666;
      margin-bottom: 10px;
    }

    .hotel-price {
      font-size: 9px;
    }

    .hotel-stars {
      font-size: 10px;
      color: #ffcc00;
    }
  }
`;

export const VisitWrapper = styled.div`
  width: 100%;
  height: auto;
  /* background-color: beige; */
  margin-top: 5vh;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h2 {
    font-weight: 500;
    margin-bottom: 10px;
  }

  .visit-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .visit-wrapper .box {
    display: flex;
    border: 2px solid black;
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 2px #212121;
    flex: 1 1 auto;
  }

  .visit-wrapper .box:hover {
    box-shadow: 5px 5px 1px #ff7d00;
    cursor: pointer;
    transform: scale(1.01);
  }

  .visit-wrapper .box .left {
    width: 30%;
    height: 100%;
  }

  .visit-wrapper .box .left img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 2px solid black;
  }

  .visit-wrapper .box .right {
    width: 70%;
    height: 100%;
    padding: 0 5px;
    display: flex;
    flex-direction: column;
  }

  .visit-wrapper .box .right .r-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }

  .visit-wrapper .box .right .r-middle {
    font-size: 11px;
    font-weight: 600;
    height: 60%;
    width: 100%;
    line-height: 14px;
  }

  .visit-wrapper .box .right .r-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .visit-wrapper .box .right .r-bottom span {
    font-size: 11px;
  }

  @media (max-width: 800px) {
    .visit-wrapper .box .left img {
      width: 100%;
      height: 70%;
      border-radius: 10px;
      border: 2px solid black;
    }

    .visit-wrapper .box .right .r-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    .visit-wrapper .box .right .r-middle {
      font-size: 10px;
      font-weight: 600;
      height: 60%;
      width: 100%;
      line-height: 12px;
    }

    .visit-wrapper .box .right .r-bottom span {
      font-size: 10px;
    }

    .visit-wrapper .box {
      height: 17vh;
    }
  }
`;
