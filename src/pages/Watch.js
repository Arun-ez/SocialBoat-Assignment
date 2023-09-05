import "../styles/Watch.css";
import { useQuery } from '../hooks/useQuery';

const Watch = () => {

    const source = useQuery().get('src');
    const title = useQuery().get('title');
    const description = useQuery().get('description');
    return (
        <div className='watch'>

            <div>
                <video src={source} controls autoPlay></video>
                <h2> {title} </h2>
                <p> {description} </p>
            </div>
        </div>
    )
}

export default Watch;
