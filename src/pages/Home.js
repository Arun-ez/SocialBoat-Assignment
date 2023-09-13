import "../styles/Home.css";
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../providers/DataContextProvider';
import { FilterBar } from "../components/FilterBar";
import { VideoCard } from "../components/VideoCard";
import { Spinner } from "../components/Spinner";
import { NoResults } from "../components/NoResults";

const Home = () => {

    const limit = 20;
    const { query } = useContext(DataContext);
    const [store, setStore] = useState([]);
    const [data, setData] = useState([]);

    const [filterOptions, setFilterOptions] = useState(new Set());
    const [selected, setSelected] = useState(new Set());

    const [loading, setLoading] = useState(true);

    const search = useCallback(async () => {

        setLoading(true);

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
            setSelected(new Set());
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }, [query])

    const filter = (selected) => {

        if (!selected.size) {
            setData(store);
            return;
        }

        let results = store?.filter(({ tags }) => {

            for (let tag of selected) {

                if (tags.includes(tag)) {
                    return true;
                }
            }

            return false;
        })

        setData(results);
    }

    useEffect(() => {
        let timerId = null;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            search()
        }, 500);

        return () => { clearTimeout(timerId) }
    }, [query, search]);

    return (
        <main>
            <div className="heading">
                {query ? (
                    <h3> Search result for '{query}' </h3>
                ) : (
                    <h3> Recomended Videos for you </h3>
                )}
            </div>

            <FilterBar value={selected} onChange={setSelected} onFilter={filter} options={filterOptions} />

            {data?.length ? (

                <div className='results'>
                    {data.map((elm, idx) => {
                        return (
                            <VideoCard data={elm} key={idx} />
                        )
                    })}
                </div>

            ) : (

                loading ? (
                    <Spinner />
                ) : (
                    <NoResults />
                )

            )}



        </main>
    )
}

export default Home;
