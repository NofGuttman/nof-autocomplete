import React from "react";
import { Option } from "./Option";
import { Pagination } from "./Pagination";
import './ClassAutoComplete.css';

export class ClassAutoComplete extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayOptions: false,
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
        this.wrapperRef = React.createRef();
    }

    // add and remove listeners for the click outside of the component event.
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        // if the click was outside of the component - the display will turn to false
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                displayOptions: false
            });
        }
    }

    onInputClick() {
        this.setState({
            displayOptions: true
        });
    }

    onOptionClick(value) {
        this.setState({
            displayOptions: false
        });
        this.props.optionClickHandler(value);
    }

    render() {
        const {options, value, searchHandler, optionsPerPage, label, currentPage, paginationHandler} = this.props;

        // vars for pagination configuration:
        const indexOfLastOption = currentPage * optionsPerPage;
        const indexOfFirstOption = indexOfLastOption - optionsPerPage;
        const currentOptions = options.slice(indexOfFirstOption, indexOfLastOption);

        return (
            <div className="class-autocomplete" ref={this.wrapperRef}>
                <input className="autocomplete-input"
                    placeholder={label}
                    value={value}
                    onChange={searchHandler}
                    onClick={this.onInputClick}
                />
                {this.state.displayOptions && <div className="autocomplete-options">
                    {currentOptions.map( option => {
                        return(
                            <Option
                                value={option}
                                mark={value}
                                key={option}
                                onClickHandler={this.onOptionClick}
                            >{option}</Option>
                        )
                    })}
                    {optionsPerPage < options.length && <Pagination
                        numberPerPage={optionsPerPage}
                        currentPage={currentPage}
                        numberOfItems={options.length}
                        paginationChangeHandler={paginationHandler}
                    />}
                </div>}
            </div>)
    }
}

ClassAutoComplete.defaultProps = {
    options: []
};
  