import "./AllBookings.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllBookings } from "../../Services/apiCalls";

export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (bookings.length === 0) {
      bringAllBookings(token).then((res) => {
        setBookings(res.results);
      });
    }
  }, []);

  console.log(bookings);
  return ("aqui van los bks");
};
