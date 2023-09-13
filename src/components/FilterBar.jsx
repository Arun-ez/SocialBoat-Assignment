import "../styles/FilterBar.css";
import { useContext } from 'react';
import { ColorModeContext } from "../providers/ColorModeProvider";


const FilterBar = ({ value, onChange, options }) => {

    const { colorMode } = useContext(ColorModeContext);

    const onSelect = (tag) => {

        if (!value.has(tag)) {
            onChange((prev) => new Set(prev).add(tag));
            return;
        }

        onChange((prev) => {
            const newValues = new Set(prev);
            newValues.delete(tag);
            return newValues;
        })
    }

    return (
        <div className="filter_bar">
            {Array.from(options).map((tag, idx) => {
                return (
                    <p
                        key={idx}
                        onClick={() => { onSelect(tag) }}
                        className={`${colorMode === 'dark' ?
                            `filterbar-dark ${value.has(tag) ? 'selected-dark' : 'not_selected'}`
                            :
                            `filterbar-light ${value.has(tag) ? 'selected-light' : 'not_selected'}`
                            }`
                        }
                    >
                        {tag}
                    </p>
                )
            })}
        </div>
    )
}

export { FilterBar }
