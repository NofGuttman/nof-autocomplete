import React from "react";
import './Option.css';

export class Option extends React.Component {

    constructor(props) {
        super(props);
    }

    highlightText(text, highlight) {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
                { part }
            </span>)
        } </span>;
    }    

    render() {
        const {children, onClickHandler, value, mark} = this.props;
        return (
            <div className="autocomplete-option"
                onClick={() => onClickHandler(value)}
            >{this.highlightText(children, mark)}</div>
        )
    }
}
