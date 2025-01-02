import { budgetOptions, travelOptions } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTripWrapper } from "@/css-sheets/css-styles";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [placeDetails, setPlaceDetails] = useState();
  const [days, setDays] = useState();

  const FormHandler = () =>{
    
  }
  
  return (
    <CreateTripWrapper>
      <h1>Tell us your travel preferences 🚁</h1>
      <span>
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </span>

      {/* Choices input sections */}
      <div className="choices">
        <div className="destination">
          <h2>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              placeDetails,
              placeholder: "type your destination 🚀",
              onChange: (v) => {
                setPlaceDetails(v);
              }
            }}
          />
        </div>

        <div className="destination">
          <h2>How many days are you planning your trip?</h2>
          <Input
            placeholder="Ex.3"
            type="number"
            onChange={(e) => {
              setDays(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Budget and plan section */}
      <div className="detail-section">
        <h2>What is Your Budget?</h2>
        <div className="detail-box">
          {budgetOptions.map((budget) => {
            return (
              <div key={budget.id} className="box">
                <div style={{ fontSize: "2rem" }}>{budget.icon}</div>
                <h3>{budget.title}</h3>
                <p>{budget.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* plan section */}

      <div className="detail-section">
        <h2>Who do you plan on traveling with on your next adventure?</h2>
        <div className="detail-box">
          {travelOptions.map((travel) => {
            return (
              <div key={travel.id} className="box">
                <div style={{ fontSize: "2rem" }}>{travel.icon}</div>
                <h3>{travel.title}</h3>
                <p>{travel.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="submit-trip mt-10 w-full h-auto flex justify-end ">
        <Button>Generate Trip 🎉</Button>
      </div>
    </CreateTripWrapper>
  );
}

export default CreateTrip;
