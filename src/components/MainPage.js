import React from "react";
import "./MainPage.css";
import { ClassAutoComplete } from "./ClassAutoComplete";

export class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dogBreeds: []
        }
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
                    options={this.state.dogBreeds}
                    optionsPerPage={10}
                />
            </div>)
    }
}