import { useLocation } from "react-router-dom"

const useQuery = (param) => {
    return new URLSearchParams(useLocation().search);
}


export { useQuery }