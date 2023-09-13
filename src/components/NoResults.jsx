import "../styles/NoResults.css";
import { TbNoteOff } from "react-icons/tb";

const NoResults = () => {
    return (
        <div className="no_results">
            <TbNoteOff fontSize={50} />
            <h2> No Results! </h2>
        </div>
    )
}

export { NoResults }
