import React from "react";
import { ClassAutoComplete } from "./ClassAutoComplete";

export class DogBreedsAutocomplete extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dogBreeds: [],
            filteredSearchResults: [],
            searchBreedValue: "",
            currentPage: 1
        }
        this.mockRestCallSearch = this.mockRestCallSearch.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    mockRestCallSearch = this.debounce((filterString) => {
        // NOTE: this function is not production ready. it should be replaced with a real rest call.
        // This function returns a filtered array of results with a 300ms delay, to work like a rest call.
        // Added debounce function to avoid too many and unnecessary calls.
        const options = this.state.dogBreeds;
        const filtered = options.filter((option) => option.toLowerCase().includes(filterString.toLowerCase()));
        setTimeout(() => {
            this.setState({
                filteredSearchResults: filtered,
                currentPage: 1
            })
        }, 300)
    }, 200)

    onSearchChange(event) {
        const value = event.target.value;
        this.setState({
            searchBreedValue: value
        });
        this.mockRestCallSearch(value);
    }

    onOptionClick(value) {
        this.setState({
            searchBreedValue: value,
            currentPage: 1
        })
        this.mockRestCallSearch(value);
    }

    onPaginationChange(changeBy) {
        this.setState({
            currentPage: this.state.currentPage + parseInt(changeBy)
        })
    }


    async componentDidMount() {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        // get all breeds and capitalize the first letter. not mandatory. just for better feel and look.
        const dogBreeds = Object.keys(data.message).map(breed => breed.charAt(0).toUpperCase() + breed.slice(1))
        this.setState({
            dogBreeds: dogBreeds,
            filteredSearchResults: dogBreeds
        });
    }

    debounce(func, timeout){
        // good old debounce, written in JS instead of using a package e.g 'lodash'
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        }
    }

    render() {
        return (
            <div className="dog-breeds-autocomplete">
                <ClassAutoComplete 
                    label="Dog Breed"
                    value={this.state.searchBreedValue}
                    options={this.state.filteredSearchResults}
                    searchHandler={this.onSearchChange}
                    optionClickHandler={this.onOptionClick}
                    paginationHandler={this.onPaginationChange}
                    optionsPerPage={10}
                    currentPage={this.state.currentPage}
                />
            </div>)
    }
}