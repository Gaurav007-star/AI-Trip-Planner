import { Button } from "../ui/button";
import Modal from "@/components/ui/modal";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { setEmptyTrip } from "@/store/slices/TripSlice";
import { useState } from "react";
import { setUser, UserRegister } from "@/store/slices/UserSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { Menu, X } from "lucide-react";


function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handelNavigate = () => {
    navigate("/user");
    setMobileOpen(false);
  };

  const gotoCreateTrip = () => {
    navigate("/create-trip");
    setMobileOpen(false);
  };

  const LogoutHandler = () => {
    localStorage.clear();
    dispatch(setEmptyTrip());
    dispatch(setUser());
    navigate("/");
    setMobileOpen(false);
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

  const navItems = user && Object.keys(user).length > 0 ? (
    <>
      <Button className="rounded-full w-full sm:w-auto" onClick={gotoCreateTrip}>
        Create Trip
      </Button>
      <Button variant="outline" className="rounded-full w-full sm:w-auto" onClick={LogoutHandler}>
        Logout
      </Button>
      <div
        onClick={handelNavigate}
        className="w-10 h-10 rounded-full border-2 border-border overflow-hidden cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200 shrink-0 mx-auto sm:mx-0"
      >
        {imgError || !user?.picture ? (
          <div className="w-full h-full flex items-center justify-center bg-muted text-foreground text-sm font-semibold select-none">
            {(user?.name?.[0] || user?.email?.[0] || "?").toUpperCase()}
          </div>
        ) : (
          <img
            src={user.picture}
            alt="user avatar"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </>
  ) : (
    <Button className="rounded-full w-full sm:w-auto" onClick={() => { setOpenDialog(true); setMobileOpen(false); }}>
      Login
    </Button>
  );

  return (
    <header className="w-full bg-background/85 border-b border-border sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="py-4 flex items-center justify-between">
          {/* Left Logo */}
          <Link to={"/"} className="flex items-center gap-2 select-none">
            <img src="/logo_demo.png" alt="logoicon" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            {navItems}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="sm:hidden pb-6 pt-2 flex flex-col items-center gap-3 border-t border-border mt-2">
            {navItems}
          </div>
        )}

        {/* dialogue box */}
        <Modal
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Welcome Back"
          description="Sign in to save and access your AI travel itineraries"
          icon={
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-border">
              <FcGoogle className="text-4xl" />
            </div>
          }
        >
          <div className="w-full flex flex-col items-center gap-4 mt-6">
            <Button onClick={() => login()} className="w-full rounded-full py-6 shadow-md">
              <FcGoogle className="text-lg bg-white rounded-full p-0.5" />
              Sign in with Google
            </Button>

            <p className="text-xs text-muted-foreground mt-2">
              Don&rsquo;t have an account?{" "}
              <a href="#" className="text-primary hover:underline font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </Modal>
      </div>
    </header>
  );
}

export default Header;

