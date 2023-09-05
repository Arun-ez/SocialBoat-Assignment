import "../styles/Navbar.css";
import { useContext, useState } from 'react';
import { ColorModeContext } from "../providers/ColorModeProvider";

import { Logo } from "./Logo";
import { Avatar } from "./Avatar";
import { ThemeToggler } from "./ThemeToggler";

import { FiSearch } from "react-icons/fi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { DataContext } from "../providers/DataContextProvider";

const Navbar = () => {

    const { colorMode } = useContext(ColorModeContext);
    const { user, query, setQuery } = useContext(DataContext);

    const [showSearch, setShowSearch] = useState(false);

    return (
        <nav className={`navbar ${colorMode === 'dark' ? 'nav-dark' : 'nav-light'}`}>

            {showSearch ? (
                <div>
                    <BiLeftArrowAlt fontSize={24} cursor={'pointer'} onClick={() => setShowSearch(false)} />
                    <input
                        value={query}
                        onChange={({ target }) => setQuery(target.value)}
                        type="text" placeholder="Search"
                        className={colorMode === 'dark' ? 'input-dark' : 'input-light'}
                    />
                </div>
            ) : (
                <>
                    <div>
                        <Logo />
                    </div>

                    <div>
                        <input
                            value={query}
                            onChange={({ target }) => setQuery(target.value)}
                            type="text" placeholder="Search"
                            className={colorMode === 'dark' ? 'input-dark' : 'input-light'}
                        />
                    </div>

                    <div>
                        <FiSearch fontSize={22} cursor={'pointer'} onClick={() => setShowSearch(true)} className="search_icon" />
                        <Avatar src={'https://arunshaw.vercel.app/avatar.jpg'} name={user.name} />
                        <ThemeToggler />
                    </div>
                </>
            )}


        </nav>
    )
}

export { Navbar }
