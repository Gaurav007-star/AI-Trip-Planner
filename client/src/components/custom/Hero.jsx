import { HeroWrapper } from "@/css-sheets/css-styles";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <HeroWrapper>
      <h1>
        <span>Discover your new Adventure with AI:</span>
        <br /> Personalized Itineraries at Your Fingertips
      </h1>

      <h3>
        Unleash your next adventure with personalized travel planning! We craft
        tailored itineraries, so you can enjoy every moment.🚀
      </h3>

      <Link to={"/create-trip"}>
        <Button>Get Started, It's Free</Button>
      </Link>

    <img src="/web.png" alt="site loading..." />


    </HeroWrapper>
  );
}

export default Hero;
