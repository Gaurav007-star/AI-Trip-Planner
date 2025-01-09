import { AIPrompt, budgetOptions, travelOptions } from "@/assets/assets";
import { Input } from "@/components/ui/input";
import { CreateTripWrapper } from "@/css-sheets/css-styles";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { TripCreateThunk } from "@/store/slices/TripSlice";
import { UserRegister } from "@/store/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import AIchatSession from "@/aiHandler/Aimodal";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";


function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const trip = useSelector(state=>state.trip.trip)
  
  if(Object.keys(trip).length > 0){
    navigate(`/trip/${trip?._id}`)
  }
  
  const InputHandeler = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const GenerateTrip = async () => {
    // get user value from localstorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOpenDialog(true);
      return;
    } else {
      if (
        !formData?.place ||
        !formData?.people ||
        !formData?.days ||
        !formData?.budget
      ) {
        return toast.error("Please fill the details", {
          className: "h-[12vh]"
        });
      }

      let aiPrompt = AIPrompt.replace("{location}", formData?.place?.label)
        .replace("{days}", formData?.days)
        .replace("{people}", formData?.people)
        .replace("{budget}", formData?.budget);

      try {
        setLoading(true);
        const ai_response = await AIchatSession.sendMessage(aiPrompt);
        const trip = ai_response?.response?.text();
        const data = {
          trip: JSON.parse(trip),
          email: user.email,
          userId:user.id,
          choice: { ...formData, place: formData.place.label }
        };
        dispatch(TripCreateThunk(data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
       
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(UserRegister(response)).then(() => {
        setOpenDialog(false);
        GenerateTrip();
      });
    },
    onError: (error) => console.log(error)
  });

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
              placeholder: "type your destination 🚀",
              onChange: (v) => {
                InputHandeler("place", v);
              }
            }}
          />
          {!formData?.place ? (
            <h4 className="error-text text-red-600 mt-2 tracking-wider">
              Please select a destination 🏖️
            </h4>
          ) : (
            <></>
          )}
        </div>

        <div className="destination ">
          <h2>How many days are you planning your trip?</h2>
          <Input
            placeholder="Ex.3"
            type="number"
            value={formData?.days}
            onChange={(e) => {
              InputHandeler("days", e.target.value);
            }}
          />
          {formData?.days <= 0 || formData?.days > 7 ? (
            <h4 className="error-text text-red-600 mt-2 tracking-wider">
              We only provide 1 to 7 days trip 🙃
            </h4>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* Budget section */}
      <div className="detail-section">
        <h2>What is Your Budget?</h2>
        <div className="detail-box">
          {budgetOptions.map((budget) => {
            return (
              <div
                key={budget.id}
                className={`box ${
                  formData?.budget === budget.title &&
                  "bg-[#edececbb] shadow-md"
                }`}
                onClick={() => InputHandeler("budget", budget.title)}
              >
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
              <div
                key={travel.id}
                className={`box ${
                  formData?.people === travel.people &&
                  "bg-[#edececbb] shadow-md"
                }`}
                onClick={() => InputHandeler("people", travel.people)}
              >
                <div style={{ fontSize: "2rem" }}>{travel.icon}</div>
                <h3>{travel.title}</h3>
                <p>{travel.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="submit-trip mt-10 w-full h-auto flex justify-end text-[16px]">
        {loading ? (
          <div className="disabled w-auto h-auto p-3 flex items-center justify-center bg-black rounded-md">
            <h1 className="loading loading-spinner loading-md bg-orange-500" />
            <h2 className="pl-2 text-white">Loading 😗</h2>
          </div>
        ) : (
          <Button onClick={() => GenerateTrip()}>Generate Trip 🚀</Button>
        )}
      </div>
      {/* Dialogue section */}
      <Dialog open={openDialog}>
        <DialogTitle />
        <DialogDescription />
        <DialogContent className="w-max p-10">
          <div className="croxx bg-white w-full h-[40px] absolute rounded-md z-10 flex justify-end items-center cursor-pointer">
            <RxCross2
              fontSize={"25px"}
              style={{ marginRight: "10px" }}
              onClick={() => setOpenDialog(false)}
            />
          </div>
          <div className="text-center h-auto w-auto mb-6 flex items-center justify-center flex-col">
            <FcGoogle style={{ fontSize: "8vh" }} />
            <h2 className="text-2xl font-bold mt-4 text-black">Welcome back</h2>
            <p className="text-gray-400 text-sm">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up.
              </a>
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button onClick={() => login()}>Sign in with Google</Button>
          </div>
        </DialogContent>
      </Dialog>
    </CreateTripWrapper>
  );
}

export default CreateTrip;
