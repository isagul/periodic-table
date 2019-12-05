import React, { useContext } from 'react';
import { Store } from '../../store';
import './PeriodicTable.scss';

const PeriodicTable = () => {
    const { state } = useContext(Store);

    const elementButton = (startIndex, endIndex) => {
        return (
            state.elements.length > 0 &&
            state.elements.slice(startIndex, endIndex).map((element, index) => {
                return <button key={index}>{element.name_small}</button>
            })
        )
    }

    return (
        <div className="periodic-table-component">
            <div className="periodic-table">
                {elementButton(0, 2)}
            </div>
            <div className="periodic-table">
                <div>
                    {elementButton(2, 4)}
                </div>
                <div>
                    {elementButton(4, 10)}
                </div>
            </div>
            <div className="periodic-table">
                <div>
                    {elementButton(10, 12)}
                </div>
                <div>
                    {elementButton(12, 18)}
                </div>
            </div>
            <div className="periodic-table">
                {elementButton(18, 90)}
            </div>
            <div className="periodic-table-footer">
                {elementButton(90, 120)}
            </div>

        </div>
    )
}

export default PeriodicTable;