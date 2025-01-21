import { HeaderWrapper } from "@/css-sheets/css-styles";
import { Button } from "../ui/button";

import { RxCross2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setEmptyTrip } from "@/store/slices/TripSlice";
import { useEffect, useState } from "react";
import { setUser, UserRegister } from "@/store/slices/UserSlice";
import { useGoogleLogin } from "@react-oauth/google";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handelNavigate = () => {
    navigate("/user");
  };

  const gotoCreateTrip = () => {
    navigate("/create-trip");
  };

  const LogoutHandler = () => {
    localStorage.clear();
    dispatch(setEmptyTrip());
    dispatch(setUser());
    navigate("/");
    toast.success("Logout success");
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      dispatch(UserRegister(response)).then(() => {
        setOpenDialog(false);
      });
    },
    onError: (error) => toast.error("Login failed 🥺")
  });

  useEffect(() => {}, [user]);

  // console.log("USER", Object.keys(user).length > 0);

  return (
    <HeaderWrapper>
      <Link to={"/"}>
        <img src="/logo.svg" alt="logoicon" />
      </Link>

      {user && Object.keys(user).length > 0 ? (
        <div className="avatar w-full flex items-center justify-end">
          <Button className="mr-5 bg-orange-500 font-semibold text-black hover:bg-slate-700 hover:text-white hover:scale-105 transition-transform" onClick={gotoCreateTrip}>
            Create tip
          </Button>

          <Button className="" onClick={() => LogoutHandler()}>
            Logout
          </Button>
          <div
            onClick={handelNavigate}
            className="ring-primary ring-offset-base-100 w-[50px] h-[50px] rounded-full ring-slate-800 ring-2 cursor-pointer ml-2"
          >
            <img src={`${user ? user.picture : "https://placehold.co/400"}`} />
          </div>
        </div>
      ) : (
        <Button
          type="submit"
          className=" button"
          onClick={() => setOpenDialog(true)}
        >
          Login
        </Button>
      )}

      {/* dialogue box */}

      <Dialog open={openDialog}>
        <DialogTitle />
        <DialogDescription />
        <DialogContent className="w-max p-10 ">
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
    </HeaderWrapper>
  );
}

export default Header;
