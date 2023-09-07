import "../styles/SearchBar.css";
import { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { ColorModeContext } from "../providers/ColorModeProvider";

const SearchBar = ({ value, onChange }) => {

    const { colorMode } = useContext(ColorModeContext);

    return (
        <div className={`input_group ${colorMode === 'dark' ? 'input-dark' : 'input-light'}`}>
            <input
                value={value}
                onChange={onChange}
                type="text" placeholder="Search"
            />

            <FiSearch fontSize={22} opacity={'70%'} />
        </div>
    )
}

export { SearchBar }
