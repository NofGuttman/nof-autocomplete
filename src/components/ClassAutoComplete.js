import React from "react";
import { Option } from "./Option";
import { Pagination } from "./Pagination";
import './ClassAutoComplete.css';

export class ClassAutoComplete extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayOptions: true,
            value: "",
            currentPage: 1,
        }
        this.onOptionClick = this.onOptionClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    onOptionClick(value) {
        console.log(value);
        this.setState({
            value: value,
            displayOptions: false,
            currentPage: 1
        })
    }

    onPaginationChange(changeBy) {
        this.setState({
            currentPage: this.state.currentPage + parseInt(changeBy)
        })
        console.log(changeBy)
    }

    onSearchChange(event) {
        this.setState({
            value: event.target.value,
            currentPage: 1,
            displayOptions: true
        });
    }

    handleClickOutside(event) {
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


    render() {
        const {options, optionsPerPage, label} = this.props;
        const indexOfLastOption = this.state.currentPage * optionsPerPage;
        const indexOfFirstOption = indexOfLastOption - optionsPerPage;
        const totalCurrentOptions = options.filter((option) => option.toLowerCase().includes(this.state.value.toLowerCase()))
        const currentOptions = totalCurrentOptions.slice(indexOfFirstOption, indexOfLastOption);
        return (
            <div className="class-autocomplete" ref={this.wrapperRef}>
                <input className="autocomplete-input"
                    placeholder={label}
                    value={this.state.value}
                    onChange={this.onSearchChange}
                    onClick={this.onInputClick}
                />
                {this.state.displayOptions && <div className="autocomplete-options">
                    {currentOptions.map( option => {
                        return(
                            <Option
                                value={option}
                                mark={this.state.value}
                                onClickHandler={this.onOptionClick}
                            >{option}</Option>
                        )
                    })}
                    {optionsPerPage < totalCurrentOptions.length && <Pagination
                        numberPerPage={optionsPerPage}
                        currentPage={this.state.currentPage}
                        numberOfItems={totalCurrentOptions.length}
                        paginationChangeHandler={this.onPaginationChange}
                    />}
                </div>}
            </div>)
    }
}

ClassAutoComplete.defaultProps = {
    options: []
};
  