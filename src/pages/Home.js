import "../styles/Home.css";
import { useContext, useEffect, useMemo, useState } from 'react'
import { DataContext } from '../providers/DataContextProvider';
import { FilterBar } from "../components/FilterBar";
import { VideoCard } from "../components/VideoCard";
import { Spinner } from "../components/Spinner";

const Home = () => {

    const limit = 20;
    const { query } = useContext(DataContext);
    const [store, setStore] = useState([]);
    const [data, setData] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async () => {

        setLoading(true);

        if (selected.length > 0) {
            let res = store?.filter(({ tags }) => {

                for (let i = 0; i < selected.length; i++) {

                    if (tags.includes(filterOptions[selected[i]])) {
                        return true;
                    }
                }

                return false;
            })

            setData(res);
            setLoading(false);

            return;
        }

        try {
            let response = await fetch(`${process.env.REACT_APP_API}/assignmentVideos?q=${query || 'shine'}&numResults=${limit}`);
            let { results } = await response.json();

            const set = new Set();

            results?.forEach(({ tags }) => {
                tags.forEach((tag) => {
                    set.add(tag);
                })
            })

            const tagList = Array.from(set);

            setStore(results);
            setData(results);
            setFilterOptions(tagList);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    /* Infinite Scroll */
    const loadMore = async () => {
        // setLoading(true);

        // try {
        //     let response = await fetch(`${process.env.REACT_APP_API}/assignmentVideos?q=${query || 'fun'}&numResults=${limit}`);
        //     let { results } = await response.json();
        //     setData((prevResults) => [...prevResults, ...results]);
        // } catch (error) {
        //     console.log(error);
        // }

        // setLoading(false);
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
    }, [query]);

    useEffect(() => {
        search();
    }, [selected])

    return (
        <main>
            <div className="heading">
                {query ? (
                    <h3> Search result for '{query}' </h3>
                ) : (
                    <h3> Recomended Videos for you </h3>
                )}
            </div>

            <FilterBar value={selected} onChange={setSelected} options={filterOptions} />

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
