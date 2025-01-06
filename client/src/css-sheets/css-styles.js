import styled from "styled-components";

export const HeaderWrapper = styled.h1`
  /* background-color: red; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2vh 0;

  img {
    width: 10vw;
    background-position: center;
    background-size: cover;
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
  align-items: center;
  padding: 2vh 13vw;

  .image-section {
    width: 100%;
    height: 60vh;
    border-radius: 30px;
    /* background-color: beige; */
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
    width: 25%;
    height: 100%;
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .left .user-picture {
    width: 80%;
    height: 45vh;
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
    width: 75%;
    height: 100%;
    /* background-color: goldenrod; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5vw;
    overflow-y: scroll;
    padding: 10px 0;
  }

  .right .trip-box {
    width: 17vw;
    height: 40vh;
    background-color: bisque;
    border-radius: 20px;
    text-align: center;
    /* border: 2px solid black; */
    box-shadow: 0 0 10px #a8a8a8;
  }

  .right .trip-box img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
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
  margin-top: 10px;

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
  }

  .hotel-card {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 15vw;
    height: auto;
    flex: 1 1 10vw;
    transition: all 0.2s ease-in-out;
  }

  .hotel-card:hover {
    box-shadow: 0 0 10px #e2e2e2;
    cursor: pointer;
    transform: scale(1.02);
  }

  .hotel-card img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .hotel-name {
    font-size: 18px;
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
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  .hotel-stars {
    font-size: 14px;
    color: #ffcc00;
  }
`;
