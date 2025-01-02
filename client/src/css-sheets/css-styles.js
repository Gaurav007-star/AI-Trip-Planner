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

    h1{
        font-size: 7vh;
    }

    span{
        color: #c4c4c4;
        margin-top: 2vh;
    }

    .choices{
        width: 100%;
        height: auto;
        margin-top: 15vh;
        display: flex;
        flex-direction: column;
        gap: 5vh;
        margin-bottom: 10vh;
    }

    .choices .destination{
        width: 100%;
        height: auto;
    }

    .choices .destination h2{
        font-size: 2.5vh;
        margin-bottom: 10px;
    }

    .detail-section{
        width: 100%;
        height: auto;
    }

    .detail-section h2{
        font-size: 2.5vh;
        margin-bottom: 5px;
    }

    .detail-section .detail-box{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        width: 100%;
        justify-content: space-between;
        padding: 3vh 0;
        margin-bottom: 5vh;
    }

    .detail-section .detail-box .box{
        border: 1px solid #ddd;
        border-radius:8px;
        padding: 20px;
        text-align: center;
        font-size: 100%;
        width: 18vw;
        height: 23vh;
        box-shadow: 0 0 5px #ddd;
        transition: transform 330ms ease-in-out;
        cursor: pointer;
    }

    .detail-section .detail-box .box:hover{
        box-shadow: 4px 4px 1px #dbdbdb;
        transform: scale(1.05);
        border: 2px solid #dbdbdb;
    }
    

    @media (max-width:800px) {
        *{
            transition: all 0.2s linear;
        }
        .detail-section .detail-box .box{
            flex: 1 1 auto;
            font-size: 14px;
        }
    }


`

