import React from "react";
import "./MainPage.css";
import { DogBreedsAutocomplete } from "./DogBreedsAutocomplete";
import { CatBreedAutocomplete } from "./CatBreedAutocomplete";

export class MainPage extends React.Component {
    
    render() {
        return (
            <div className="main-page">
                <h2>This is a class components using only class components</h2>
                <DogBreedsAutocomplete />
                <br />
                <h2>This is a functional components using hooks</h2>
                <CatBreedAutocomplete /> 
            </div>)
    }
}