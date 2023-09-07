import "../styles/Home.css";
import { useContext, useEffect, useMemo, useState } from 'react'
import { DataContext } from '../providers/DataContextProvider';
import { VideoCard } from "../components/VideoCard";
import { Spinner } from "../components/Spinner";

const Home = () => {

    const limit = 20;
    const { query } = useContext(DataContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = useMemo(() => async () => {

        setLoading(true);

        try {
            let response = await fetch(`${process.env.REACT_APP_API}/assignmentVideos?q=${query || 'shine'}&numResults=${limit}`);
            let { results } = await response.json();
            setData(results);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }, [query])

    /* Infinite Scroll */
    const loadMore = async () => {
        setLoading(true);

        try {
            let response = await fetch(`${process.env.REACT_APP_API}/assignmentVideos?q=${query || 'fun'}&numResults=${limit}`);
            let { results } = await response.json();
            setData((prevResults) => [...prevResults, ...results]);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    const onScroll = () => {
        let total_height = window.innerHeight;
        let container_scroll_height = document.documentElement.scrollHeight;
        let scroll_top = document.documentElement.scrollTop;
        if (total_height + scroll_top + 2 > container_scroll_height) {
            loadMore();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => { window.removeEventListener('scroll', onScroll) };
    }, [])

    useEffect(() => {
        let timerId = null;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            search()
        }, 500);

        return () => { clearTimeout(timerId) }
    }, [search]);

    return (
        <main>
            <div className="heading">
                {query ? (
                    <h3> Search result for '{query}' </h3>
                ) : (
                    <h3> Recomended Videos for you </h3>
                )}

            </div>

            <div className='results'>
                {data?.map((elm, idx) => {
                    return (
                        <VideoCard data={elm} key={idx} />
                    )
                })}
            </div>

            {loading && (
                <Spinner />
            )}



        </main>
    )
}

export default Home;
