import "../styles/FilterBar.css";
import React, { useEffect } from 'react'

const FilterBar = ({ value = [], onChange, options = [] }) => {

    const onSelect = (index) => {

        if (!value.includes(index)) {
            onChange((prev) => [...prev, index]);
            return;
        }

        onChange((prev) => {
            const newValues = [...prev];
            newValues.splice(value.indexOf(index), 1);

            return newValues;
        })
    }

    return (
        <div className="filter_bar">
            {options.map((tag, idx) => {
                return <p key={idx} onClick={() => { onSelect(idx) }} className={value.includes(idx) ? 'selected' : 'not_selected'}  > {tag} </p>
            })}
        </div>
    )
}

export { FilterBar }
