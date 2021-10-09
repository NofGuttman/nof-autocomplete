import React from "react";
import { Option } from "./Option";
import { Pagination } from "./Pagination";
import './ClassAutoComplete.css';

export class ClassAutoComplete extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            displayOptions: true,
            // value: this.props.value,
            currentPage: 1,
        }
        // this.onOptionClick = this.onOptionClick.bind(this);
        // this.onSearchChange = this.onSearchChange.bind(this);
        // this.onPaginationChange = this.onPaginationChange.bind(this);
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

    // onOptionClick(value) {
    //     this.setState({
    //         value: value,
    //         displayOptions: false,
    //         currentPage: 1
    //     })
    // }

    // onPaginationChange(changeBy) {
    //     this.setState({
    //         currentPage: this.state.currentPage + parseInt(changeBy)
    //     })
    // }

    // onSearchChange(event) {
    //     this.setState({
    //         value: event.target.value,
    //         currentPage: 1,
    //         displayOptions: true
    //     });
    // }

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
        const {options, value, searchHandler, optionsPerPage, label, optionClickHandler, currentPage, paginationHandler} = this.props;
        const indexOfLastOption = currentPage * optionsPerPage;
        const indexOfFirstOption = indexOfLastOption - optionsPerPage;
        const totalCurrentOptions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()))
        const currentOptions = totalCurrentOptions.slice(indexOfFirstOption, indexOfLastOption);
        return (
            <div className="class-autocomplete" ref={this.wrapperRef}>
                <input className="autocomplete-input"
                    placeholder={label}
                    value={value}
                    onChange={searchHandler}
                    // onChange={this.onSearchChange}
                    onClick={this.onInputClick}
                />
                {this.state.displayOptions && <div className="autocomplete-options">
                    {currentOptions.map( option => {
                        return(
                            <Option
                                value={option}
                                mark={value}
                                onClickHandler={optionClickHandler}
                            >{option}</Option>
                        )
                    })}
                    {optionsPerPage < totalCurrentOptions.length && <Pagination
                        numberPerPage={optionsPerPage}
                        currentPage={currentPage}
                        numberOfItems={totalCurrentOptions.length}
                        paginationChangeHandler={paginationHandler}
                    />}
                </div>}
            </div>)
    }
}

ClassAutoComplete.defaultProps = {
    options: []
};
  