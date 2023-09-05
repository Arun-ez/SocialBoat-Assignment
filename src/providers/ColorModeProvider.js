import { createContext, useEffect, useState } from 'react'

export const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {

    const [colorMode, setColorMode] = useState(localStorage.getItem('color_mode') || 'dark');

    const toggleColorMode = () => {

        if (colorMode === 'dark') {
            setColorMode('light');
            localStorage.setItem('color_mode', 'light');
        } else {
            setColorMode('dark');
            localStorage.setItem('color_mode', 'dark');
        }
    }

    useEffect(() => {

        const body = document.body;

        /* handling body styles based on colormode */
        if (colorMode === 'dark') {
            body.style.backgroundColor = 'var(--dark_bg)';
            body.style.color = 'var(--light_bg)';
        } else {
            body.style.backgroundColor = 'var(--light_bg)';
            body.style.color = 'var(--dark_bg)';
        }

    }, [colorMode]);

    return (
        <ColorModeContext.Provider value={{ colorMode, toggleColorMode }} > {children} </ColorModeContext.Provider>
    )
}

export default ColorModeProvider;
