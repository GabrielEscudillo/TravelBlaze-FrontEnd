import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Register } from "./Register/Register";
import { Login } from "./Login/Login";
import { Agents } from "./Agents/Agents";
import { Profile } from "./Profile/Profile";
import { Bookings } from "./Bookings/Bookings";

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


                
            </Routes>
        </>
    )
}