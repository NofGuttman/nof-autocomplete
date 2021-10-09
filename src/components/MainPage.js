import React from "react";
import "./MainPage.css";
import { ClassAutoComplete } from "./ClassAutoComplete";

export class MainPage extends React.Component {
    
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
    }

    mockRestCallSearch(event) {
        const searchString = event.target.value;
        const options = this.state.dogBreeds;
        const filtered = options.filter((option) => option.toLowerCase().includes(searchString.toLowerCase()));
        console.log(filtered);
        this.setState({
            searchBreedValue: searchString
        })
        setTimeout(() => {
            this.setState({
                filteredSearchResults: filtered,
                currentPage: 1
            })
        }, 500);
    }

    onOptionClick(value) {
        this.setState({
            searchBreedValue: value,
            currentPage: 1
        })
        console.log(value);
    }

    onPaginationChange(changeBy) {
        this.setState({
            currentPage: this.state.currentPage + parseInt(changeBy)
        })
    }


    async componentDidMount() {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        this.setState({
            dogBreeds: Object.keys(data.message)
        });
    }

    render() {
        return (
            <div className="main-page">
                <h1>This is a class components using only class components</h1>
                <ClassAutoComplete 
                    label="Pick a Breed"
                    options={this.state.filteredSearchResults}
                    searchHandler={this.mockRestCallSearch}
                    optionClickHandler={this.onOptionClick}
                    paginationHandler={this.onPaginationChange}
                    value={this.state.searchBreedValue}
                    optionsPerPage={10}
                    currentPage={this.state.currentPage}
                />
            </div>)
    }
}