import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { Agents } from "./Agents/Agents";
import { Profile } from "./Profile/Profile";
import { Bookings } from "./Bookings/Bookings";
import { AllUsers } from "./AllUsers/AllUsers";
import { AllBookings } from "./AllBookings/AllBookings";
import { AllAppointments } from "./AllAppointments/AllAppointments";
import { NewAgent } from "./NewAgent/NewAgent";
import { NewBooking } from "./NewBooking/NewBooking";
import { AgentAppointments } from "./AgentAppointments/AgentAppointments";
import "./Body.css"
import { Destinations } from "./Destinations/Destinations";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/" element={<Home/>} />
                <Route path="/agents" element={<Agents/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/bookings" element={<Bookings/>} />
                <Route path="/allusers" element={<AllUsers/>} />
                <Route path="/allbookings" element={<AllBookings/>} />
                <Route path="/allappointments" element={<AllAppointments/>} />
                <Route path="/newagent" element={<NewAgent/>} />
                <Route path="/newbooking" element={<NewBooking/>} />
                <Route path="/myappointments" element={<AgentAppointments/>} />
                <Route path="/destinations" element={<Destinations/>} />

            </Routes>
        </>
    )
}