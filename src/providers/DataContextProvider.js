import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Arun Shaw' })
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    }, [query])

    return (
        <DataContext.Provider value={{ user, setUser, query, setQuery }} > {children} </DataContext.Provider>
    )
}

export default DataContextProvider
