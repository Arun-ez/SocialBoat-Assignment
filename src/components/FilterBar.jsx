import "../styles/FilterBar.css";
import { useContext } from 'react';
import { ColorModeContext } from "../providers/ColorModeProvider";

const FilterBar = ({ value, onChange, onFilter, options }) => {

    const { colorMode } = useContext(ColorModeContext);

    const onSelect = (tag) => {

        let newValues;

        if (!value.has(tag)) {
            newValues = new Set(value);
            newValues.add(tag);
        } else {
            newValues = new Set(value);
            newValues.delete(tag);
        }

        onChange(newValues);
        onFilter(newValues);
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
