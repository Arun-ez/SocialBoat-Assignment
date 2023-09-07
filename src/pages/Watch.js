import "../styles/Watch.css";
import { useQuery } from '../hooks/useQuery';
import { useEffect } from "react";

const Watch = () => {

    const source = useQuery().get('src');
    const title = useQuery().get('title');
    const description = useQuery().get('description');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className='watch'>
            <div>
                <video src={source} controls autoPlay></video>
                <h2> {title} </h2>
                <p> {description} </p>
            </div>
        </main>
    )
}

export default Watch;
