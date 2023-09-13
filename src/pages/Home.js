import "../styles/Home.css";
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../providers/DataContextProvider';
import { FilterBar } from "../components/FilterBar";
import { VideoCard } from "../components/VideoCard";
import { Spinner } from "../components/Spinner";

const Home = () => {

    const limit = 20;
    const { query } = useContext(DataContext);
    const [store, setStore] = useState([]);
    const [data, setData] = useState([]);

    const [filterOptions, setFilterOptions] = useState(new Set());
    const [selected, setSelected] = useState(new Set());

    const [loading, setLoading] = useState(false);

    const search = async () => {

        setLoading(true);

        if (selected.size > 0) {
            let res = store?.filter(({ tags }) => {

                for (let tag of selected) {

                    if (tags.includes(tag)) {
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

            const tagList = new Set();

            results?.forEach(({ tags }) => {
                tags.forEach((tag) => {
                    tagList.add(tag);
                })
            })

            setStore(results);
            setData(results);
            setFilterOptions(tagList);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

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
