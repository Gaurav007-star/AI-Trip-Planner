import { HeaderWrapper } from "@/css-sheets/css-styles";
import { Button } from "../ui/button";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import { setUser } from "@/store/slices/UserSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setEmptyTrip } from "@/store/slices/TripSlice";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handelNavigate = () =>{
    navigate("/user")
  }

  const LogoutHandler = () =>{
    localStorage.clear()
    dispatch(setEmptyTrip())
    dispatch(setUser())
    toast.success("Logout success")
  }
  
  return (
    <HeaderWrapper>
      <img src="/logo.svg" alt="logoicon" />

      {user ? (
        <div className="avatar flex items-center">
          <Button onClick={()=>LogoutHandler()}>Logout</Button>
          <div onClick={handelNavigate} className="ring-primary ring-offset-base-100 w-[50px] h-[50px] rounded-full ring-slate-800 ring-2 cursor-pointer ml-2">
            <img src={`${user.picture}`} />
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(true)}>Login</Button>
      )}

      {isOpen && (
        <Dialog open={isOpen}>
          <DialogTitle />
          <DialogDescription />
          <DialogContent className="w-max p-10">
            <div className="croxx bg-white w-full h-[40px] absolute rounded-md z-10 flex justify-end items-center cursor-pointer">
              <RxCross2
                fontSize={"25px"}
                style={{ marginRight: "10px" }}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="text-center h-auto w-auto mb-6 flex items-center justify-center flex-col">
              <FcGoogle style={{ fontSize: "8vh" }} />
              <h2 className="text-2xl font-bold mt-4 text-black">
                Welcome back
              </h2>
              <p className="text-gray-400 text-sm">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Sign up.
                </a>
              </p>
            </div>
            <div className="w-full flex justify-center items-center">
              <Button>Sign in with Google</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </HeaderWrapper>
  );
}

export default Header;
