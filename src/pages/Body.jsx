import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { Register } from "./Register/Register";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/" element={<Home/>} />
                <Route path="/Register" element={<Register/>} />
                
            </Routes>
        </>
    )
}