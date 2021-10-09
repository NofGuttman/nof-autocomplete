import React, { useState, useEffect } from "react";
import { ClassAutoComplete } from "./ClassAutoComplete";
import { useDebounce } from "./useDebounce";

export const CatBreedAutocomplete = () => {
    
    const [catBreeds, setCatBreeds] = useState([]);
    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const debounceCatBreeds = useDebounce(value, 300); // Set the debounce for the search

    const onSearchChange = (event) => {
        setValue(event.target.value);
        setCurrentPage(1);
    }

    const onOptionClick = (value) => {
        setValue(value);
        setCurrentPage(1);
    }

    const onPaginationChange = (changeBy) => {
        const changeToPage = currentPage + parseInt(changeBy);
        setCurrentPage(changeToPage);
    }


    useEffect(() => {
        let url = 'https://api.thecatapi.com/v1/breeds'
        if(value) {
            url = `https://api.thecatapi.com/v1/breeds/search?q=${value}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(result => {
                // format the data as array of values
                const options = result.map( res => res.name);
                setCatBreeds(options);
            })
    }, [debounceCatBreeds])

    return (
        <div className="cat-breeds-autocomplete">
            <ClassAutoComplete 
                label="Cat Breed"
                value={value}
                options={catBreeds}
                searchHandler={onSearchChange}
                optionClickHandler={onOptionClick}
                paginationHandler={onPaginationChange}
                optionsPerPage={10}
                currentPage={currentPage}
            />
        </div>)
}