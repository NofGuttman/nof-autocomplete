import React from "react";
import "./MainPage.css";
import { ClassAutoComplete } from "./ClassAutoComplete";
import { DogBreedsAutocomplete } from "./DogBreedsAutocomplete";

export class MainPage extends React.Component {
    
    render() {
        return (
            <div className="main-page">
                <h1>This is a class components using only class components</h1>
                <DogBreedsAutocomplete />
            </div>)
    }
}