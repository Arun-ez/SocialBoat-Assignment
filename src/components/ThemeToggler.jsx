import { useContext } from "react";
import "../styles/ThemeToggler.css";
import { ColorModeContext } from "../providers/ColorModeProvider";

import { MdDarkMode, MdSunny } from "react-icons/md";

const ThemeToggler = () => {

    const { colorMode, toggleColorMode } = useContext(ColorModeContext);

    return (
        <div className={`toggler ${colorMode === 'dark' ? 'toggler-dark' : 'toggler-light'}`} onClick={toggleColorMode}>
            <div className="circle">

                {colorMode === 'dark' ? (
                    <MdDarkMode color="black" fontSize={10} />
                ) : (
                    <MdSunny color="white" fontSize={10} />
                )}

            </div>
        </div>
    )
}

export { ThemeToggler }
