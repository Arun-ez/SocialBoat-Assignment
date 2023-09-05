import "../styles/Logo.css";
import { useNavigate } from "react-router-dom";
import { IoIosFitness } from "react-icons/io"

const Logo = () => {

    const navigate = useNavigate();

    return (
        <div className="logo" onClick={() => navigate('/')}>
            <IoIosFitness className="icon" color="#D69E2E" />
            <p> FitnessCamp </p>
        </div>
    )
}

export { Logo }
