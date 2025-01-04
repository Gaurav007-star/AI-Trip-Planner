import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const login = useGoogleLogin({
    onSuccess: (response) => console.log(response),
    onError: (error) => console.log(error)
  });

  return (
    <>
      <div className="wrapper  w-screen h-[85vh] flex justify-center items-center  backdrop-blur-3xl">
        <div className="h-max w-max rounded-3xl flex items-center justify-center z-20">
          <div className="p-10 relative rounded-3xl shadow-2xl backdrop-blur-lg w-full flex flex-col items-center justify-center">
            <div className="icon w-full flex justify-end mb-5"></div>
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
            <div className="">
              <Button onClick={() => login()}>Sign in with Google</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
