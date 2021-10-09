import React from "react";
import './Pagination.css';

export class Pagination extends React.Component {
    render() {
        const {currentPage, numberOfItems, numberPerPage, paginationChangeHandler} = this.props;

        const lastIndex = currentPage * numberPerPage;
        const firstIndex = lastIndex - numberPerPage + 1;

        return (
            <div className="pagination-bar">
                <div className="inner-text">{`${firstIndex}-${Math.min(lastIndex, numberOfItems)} of ${numberOfItems}`}</div>

                {firstIndex != 1 && <button className="back-pages pagination-button"
                    onClick={() => paginationChangeHandler(-1)}
                >&#60;</button>}
                
                {lastIndex < numberOfItems && <button className="next-pages pagination-button"
                   onClick={() => paginationChangeHandler(1)}
                >&#62;</button>}
            </div>
        )
    }
}