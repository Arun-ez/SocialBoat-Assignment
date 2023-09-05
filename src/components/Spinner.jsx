import "../styles/Spinner.css";
import { PuffLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className='spinner'>
            <PuffLoader color="#D69E2E" />
        </div>
    )
}

export { Spinner }
