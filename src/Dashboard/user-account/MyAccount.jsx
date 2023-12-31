import { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import userImg from "../../assets/images/doctor-img01.png";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "./../../hooks/useFetchData";
import { BASE_URL } from "../../../config";

const MyAccount = async () => {
  const { dispatch } = useContext(authContext);
  const [tabs, setTabs] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = await useFetchData(`${BASE_URL}/users/profile/me`);

  console.log(userData, "userdata");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userImg}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] font-bold text-headingColor">
                  Anthony Chuks
                </h3>
                <p className="text-[14px] text-textColor leading-6 font-medium">
                  xyz@example.com
                </p>
                <p className="text-[14px] text-textColor leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-headingColor text-[18px] leading-8">
                    B+
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] text-[16px] text-white p-3 leading-7 rounded-md"
                >
                  Logout
                </button>
                <button className="w-full mt-4 bg-red-600 text-[16px] text-white p-3 leading-7 rounded-md">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTabs("bookings")}
                  className={`${
                    tabs === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTabs("settings")}
                  className={` ${
                    tabs === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tabs === "bookings" && <MyBookings />}
              {tabs === "settings" && <Profile />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
