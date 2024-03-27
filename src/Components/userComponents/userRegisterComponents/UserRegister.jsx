import { useFormik } from "formik";
import { userSignUpSchema } from "../../../Utils/yupValidations/yupUserValidations";
import { useNavigate } from "react-router-dom";
import { userRegisterGoogle, userSignIn } from "../../../Api/userApi";
import { Button } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/storeSlices/userSlice";
import userRegiImage from '../../../../public/6876640.jpg'
function UserRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

  const googleRegister = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: () => toast.error("Goole login failed"),
  });

  {
    /*  Google login field   */
  }

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          userRegisterGoogle(res.data).then((result) => {
            if (result.data.created) {
              console.log(result);
              dispatch(
                setUserDetails({
                  userName: result.data.name,
                  email: result.data.email,
                  role: "user",
                })
              );
              localStorage.setItem("token", result.data.jwtToken);
              navigate("/user");
            } else {
              toast.error(result.data.message);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [user, dispatch, navigate]);

  const initialValue = {
    userName: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: initialValue,
      validationSchema: userSignUpSchema,
      onSubmit: async (values) => {
        const response = await userSignIn(values);
        if (response.data.created) {
          toast.success(response.data.message, { duration: 10000 });
          setTimeout(function () {
            window.location.reload();
          }, 5000);
        } else {
          toast.error(response.data.message);
        }
      },
    });

  return (
    <div className=" flex flex-col items-center justify-between pt-0 pr-2 sm:pr-5 pb-0 pl-2 sm:pl-5 mt-10 mx-auto max-w-screen-xl xl:px-5 lg:flex-row">
      <div className="flex flex-col items-center w-full pr-2 sm:pr-5  pl-2 sm:pl-5 lg:flex-row">
        <div className="w-full mt-5 sm:mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col items-start justify-start pt-5 sm:pt-10 pr-2 sm:pr-5 pb-5 sm:pb-10 pl-2 sm:pl-5 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-2xl sm:text-4xl font-medium text-center leading-snug font-serif">
                Sign up for an account
              </p>
              <div className="w-full mt-3 sm:mt-6 mr-0 mb-0 ml-0 relative space-y-4 sm:space-y-8">
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-2 sm:-mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Username
                  </p>
                  <input
                    onChange={handleChange}
                    value={values.userName}
                    onBlur={handleBlur}
                    name="userName"
                    type="text"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mt-1 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {errors.userName && touched.userName && (
                    <span className="font-light  text-red-500">
                      {errors.userName}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-2 sm:-mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Email
                  </p>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    type="text"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mt-1 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {errors.email && touched.email && (
                    <div className="font-light text-red-500">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-2 sm:-mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Mobile number
                  </p>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    min={1}
                    name="number"
                    type="number"
                    className="border  placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mt-1 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {errors.number && touched.number && (
                    <div className="font-light  text-red-500">
                      {errors.number}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-2 sm:-mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Password
                  </p>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mt-1 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {errors.password && touched.password && (
                    <div className="font-light  text-red-500">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-2 sm:-mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Confirm Password
                  </p>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mt-1 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="font-light  text-red-500">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Button
                    type="submit"
                    className="w-full inline-block pt-2 pr-3 pb-2 pl-3 text-base sm:text-xl font-medium text-center text-white bg-black rounded-lg transition duration-200 hover:bg-blue-700 ease"
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div className="flex justify-center mt-1">
                <p className="mt-4 block text-center font-sans text-sm font-normal leading-relaxed text-gray-700 ">
                  Already have an account?
                  <a
                    className="font-medium text-pink-500 transition-colors hover:text-blue-700 cursor-pointer"
                    onClick={() => {
                      navigate("/user/login");
                    }}
                  >
                    Login
                  </a>
                </p>
                <div className="flex justify-center items-center">
                  <Button
                    onClick={googleRegister}
                    size="sm"
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 m-2"
                  >
                    <img
                      src="https://freesvg.org/img/1534129544.png"
                      alt="metamask"
                      className="h-6 w-6"
                    />
                    Continue with Google
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <svg
            viewBox="0 0 91 91"
            className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-black-300
              fill-current"
          >
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g>
                  <g>
                    <circle cx="3.261" cy="3.445" r="2.72" />
                    <circle cx="15.296" cy="3.445" r="2.719" />
                    <circle cx="27.333" cy="3.445" r="2.72" />
                    <circle cx="39.369" cy="3.445" r="2.72" />
                    <circle cx="51.405" cy="3.445" r="2.72" />
                    <circle cx="63.441" cy="3.445" r="2.72" />
                    <circle cx="75.479" cy="3.445" r="2.72" />
                    <circle cx="87.514" cy="3.445" r="2.719" />
                  </g>
                  <g transform="translate(0 12)">
                    <circle cx="3.261" cy="3.525" r="2.72" />
                    <circle cx="15.296" cy="3.525" r="2.719" />
                    <circle cx="27.333" cy="3.525" r="2.72" />
                    <circle cx="39.369" cy="3.525" r="2.72" />
                    <circle cx="51.405" cy="3.525" r="2.72" />
                    <circle cx="63.441" cy="3.525" r="2.72" />
                    <circle cx="75.479" cy="3.525" r="2.72" />
                    <circle cx="87.514" cy="3.525" r="2.719" />
                  </g>
                  <g transform="translate(0 24)">
                    <circle cx="3.261" cy="3.605" r="2.72" />
                    <circle cx="15.296" cy="3.605" r="2.719" />
                    <circle cx="27.333" cy="3.605" r="2.72" />
                    <circle cx="39.369" cy="3.605" r="2.72" />
                    <circle cx="51.405" cy="3.605" r="2.72" />
                    <circle cx="63.441" cy="3.605" r="2.72" />
                    <circle cx="75.479" cy="3.605" r="2.72" />
                    <circle cx="87.514" cy="3.605" r="2.719" />
                  </g>
                  <g transform="translate(0 36)">
                    <circle cx="3.261" cy="3.686" r="2.72" />
                    <circle cx="15.296" cy="3.686" r="2.719" />
                    <circle cx="27.333" cy="3.686" r="2.72" />
                    <circle cx="39.369" cy="3.686" r="2.72" />
                    <circle cx="51.405" cy="3.686" r="2.72" />
                    <circle cx="63.441" cy="3.686" r="2.72" />
                    <circle cx="75.479" cy="3.686" r="2.72" />
                    <circle cx="87.514" cy="3.686" r="2.719" />
                  </g>
                  <g transform="translate(0 49)">
                    <circle cx="3.261" cy="2.767" r="2.72" />
                    <circle cx="15.296" cy="2.767" r="2.719" />
                    <circle cx="27.333" cy="2.767" r="2.72" />
                    <circle cx="39.369" cy="2.767" r="2.72" />
                    <circle cx="51.405" cy="2.767" r="2.72" />
                    <circle cx="63.441" cy="2.767" r="2.72" />
                    <circle cx="75.479" cy="2.767" r="2.72" />
                    <circle cx="87.514" cy="2.767" r="2.719" />
                  </g>
                  <g transform="translate(0 61)">
                    <circle cx="3.261" cy="2.846" r="2.72" />
                    <circle cx="15.296" cy="2.846" r="2.719" />
                    <circle cx="27.333" cy="2.846" r="2.72" />
                    <circle cx="39.369" cy="2.846" r="2.72" />
                    <circle cx="51.405" cy="2.846" r="2.72" />
                    <circle cx="63.441" cy="2.846" r="2.72" />
                    <circle cx="75.479" cy="2.846" r="2.72" />
                    <circle cx="87.514" cy="2.846" r="2.719" />
                  </g>
                  <g transform="translate(0 73)">
                    <circle cx="3.261" cy="2.926" r="2.72" />
                    <circle cx="15.296" cy="2.926" r="2.719" />
                    <circle cx="27.333" cy="2.926" r="2.72" />
                    <circle cx="39.369" cy="2.926" r="2.72" />
                    <circle cx="51.405" cy="2.926" r="2.72" />
                    <circle cx="63.441" cy="2.926" r="2.72" />
                    <circle cx="75.479" cy="2.926" r="2.72" />
                    <circle cx="87.514" cy="2.926" r="2.719" />
                  </g>
                  <g transform="translate(0 85)">
                    <circle cx="3.261" cy="3.006" r="2.72" />
                    <circle cx="15.296" cy="3.006" r="2.719" />
                    <circle cx="27.333" cy="3.006" r="2.72" />
                    <circle cx="39.369" cy="3.006" r="2.72" />
                    <circle cx="51.405" cy="3.006" r="2.72" />
                    <circle cx="63.441" cy="3.006" r="2.72" />
                    <circle cx="75.479" cy="3.006" r="2.72" />
                    <circle cx="87.514" cy="3.006" r="2.719" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <svg
            viewBox="0 0 91 91"
            className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-blue-500
              fill-current"
          >
            <g stroke="none" strokeWidth="1" fillRule="evenodd">
              <g fillRule="nonzero">
                <g>
                  <g>
                    <circle cx="3.261" cy="3.445" r="2.72" />
                    <circle cx="15.296" cy="3.445" r="2.719" />
                    <circle cx="27.333" cy="3.445" r="2.72" />
                    <circle cx="39.369" cy="3.445" r="2.72" />
                    <circle cx="51.405" cy="3.445" r="2.72" />
                    <circle cx="63.441" cy="3.445" r="2.72" />
                    <circle cx="75.479" cy="3.445" r="2.72" />
                    <circle cx="87.514" cy="3.445" r="2.719" />
                  </g>
                  <g transform="translate(0 12)">
                    <circle cx="3.261" cy="3.525" r="2.72" />
                    <circle cx="15.296" cy="3.525" r="2.719" />
                    <circle cx="27.333" cy="3.525" r="2.72" />
                    <circle cx="39.369" cy="3.525" r="2.72" />
                    <circle cx="51.405" cy="3.525" r="2.72" />
                    <circle cx="63.441" cy="3.525" r="2.72" />
                    <circle cx="75.479" cy="3.525" r="2.72" />
                    <circle cx="87.514" cy="3.525" r="2.719" />
                  </g>
                  <g transform="translate(0 24)">
                    <circle cx="3.261" cy="3.605" r="2.72" />
                    <circle cx="15.296" cy="3.605" r="2.719" />
                    <circle cx="27.333" cy="3.605" r="2.72" />
                    <circle cx="39.369" cy="3.605" r="2.72" />
                    <circle cx="51.405" cy="3.605" r="2.72" />
                    <circle cx="63.441" cy="3.605" r="2.72" />
                    <circle cx="75.479" cy="3.605" r="2.72" />
                    <circle cx="87.514" cy="3.605" r="2.719" />
                  </g>
                  <g transform="translate(0 36)">
                    <circle cx="3.261" cy="3.686" r="2.72" />
                    <circle cx="15.296" cy="3.686" r="2.719" />
                    <circle cx="27.333" cy="3.686" r="2.72" />
                    <circle cx="39.369" cy="3.686" r="2.72" />
                    <circle cx="51.405" cy="3.686" r="2.72" />
                    <circle cx="63.441" cy="3.686" r="2.72" />
                    <circle cx="75.479" cy="3.686" r="2.72" />
                    <circle cx="87.514" cy="3.686" r="2.719" />
                  </g>
                  <g transform="translate(0 49)">
                    <circle cx="3.261" cy="2.767" r="2.72" />
                    <circle cx="15.296" cy="2.767" r="2.719" />
                    <circle cx="27.333" cy="2.767" r="2.72" />
                    <circle cx="39.369" cy="2.767" r="2.72" />
                    <circle cx="51.405" cy="2.767" r="2.72" />
                    <circle cx="63.441" cy="2.767" r="2.72" />
                    <circle cx="75.479" cy="2.767" r="2.72" />
                    <circle cx="87.514" cy="2.767" r="2.719" />
                  </g>
                  <g transform="translate(0 61)">
                    <circle cx="3.261" cy="2.846" r="2.72" />
                    <circle cx="15.296" cy="2.846" r="2.719" />
                    <circle cx="27.333" cy="2.846" r="2.72" />
                    <circle cx="39.369" cy="2.846" r="2.72" />
                    <circle cx="51.405" cy="2.846" r="2.72" />
                    <circle cx="63.441" cy="2.846" r="2.72" />
                    <circle cx="75.479" cy="2.846" r="2.72" />
                    <circle cx="87.514" cy="2.846" r="2.719" />
                  </g>
                  <g transform="translate(0 73)">
                    <circle cx="3.261" cy="2.926" r="2.72" />
                    <circle cx="15.296" cy="2.926" r="2.719" />
                    <circle cx="27.333" cy="2.926" r="2.72" />
                    <circle cx="39.369" cy="2.926" r="2.72" />
                    <circle cx="51.405" cy="2.926" r="2.72" />
                    <circle cx="63.441" cy="2.926" r="2.72" />
                    <circle cx="75.479" cy="2.926" r="2.72" />
                    <circle cx="87.514" cy="2.926" r="2.719" />
                  </g>
                  <g transform="translate(0 85)">
                    <circle cx="3.261" cy="3.006" r="2.72" />
                    <circle cx="15.296" cy="3.006" r="2.719" />
                    <circle cx="27.333" cy="3.006" r="2.72" />
                    <circle cx="39.369" cy="3.006" r="2.72" />
                    <circle cx="51.405" cy="3.006" r="2.72" />
                    <circle cx="63.441" cy="3.006" r="2.72" />
                    <circle cx="75.479" cy="3.006" r="2.72" />
                    <circle cx="87.514" cy="3.006" r="2.719" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
          <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-2 sm:pr-5">
            <img
              src={userRegiImage}
              className="w-full h-auto lg:h-full max-w-full"
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default UserRegister;
