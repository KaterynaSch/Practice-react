import { Link } from "react-router-dom";
import HomePage from "./HomePage";

export default function NotFoundPage() {
    return (
        <>
            <p>Page not found. Please turn to the  
                <Link to="/" element={<HomePage/>}>Home Page</Link>
            </p>
        </>
    )
};