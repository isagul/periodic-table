import React, { useContext, useState } from 'react';
import { Store } from '../../store';
import './PeriodicTable.scss';
import ElementInfo from '../element_info/ElementInfo';
import RightBar from '../right_bar/RightBar';

const PeriodicTable = () => {
    const { state } = useContext(Store);
    const [hoveredElement, setHoveredElement] = useState({});
    const [finalElement, setFinalElement] = useState({});
    const [hoveredGroup, setHoveredGroup] = useState({});
    const [isAnyHoveredName, setIsAnyHoveredName] = useState(false);

    const elementButton = (startIndex, endIndex) => {
        return (
            state.elements.length > 0 &&
            state.elements.slice(startIndex, endIndex).map((element, index) => {
                return (
                    <>
                        {
                            Object.keys(hoveredGroup).length > 0 && isAnyHoveredName ?
                                <button
                                    className={`color-${element.group_id} ${element.group_id === hoveredGroup.group_id ? 'remove-opacity' : 'add-opacity'}`}
                                    key={index}
                                    onMouseOver={() => getHoveredElement(element)}>
                                    {
                                        element.molar !== null &&
                                        <p className="molar">{Number.parseFloat(element.molar).toFixed(2)}</p>
                                    }
                                    <p className="group-name">{element.name_small}</p>
                                    <p className="el-order"> {element.el_order}</p>
                                </button> :
                                <button
                                    className={`color-${element.group_id}`}
                                    key={index}
                                    onMouseOver={() => getHoveredElement(element)}>
                                    {
                                        element.molar !== null &&
                                        <p className="molar">{Number.parseFloat(element.molar).toFixed(2)}</p>
                                    }
                                    <p className="group-name">{element.name_small}</p>
                                    <p className="el-order"> {element.el_order}</p>
                                </button>
                        }
                    </>
                )
            })
        )
    }

    function getHoveredElement(element) {
        if (element.id !== 119 && element.id !== 120) {
            setHoveredElement(element);
            setFinalElement(element);
        }
    }

    const handleMouseOverRightBar = (element) => {
        setHoveredGroup(element)
        setHoveredElement(element, 'group_name');
        setIsAnyHoveredName(true);
        document.getElementById('elInfo').style.top = "5vw";
    }

    const handleMouseLeftRightBar = (element) => {
        setHoveredGroup(finalElement)
        setHoveredElement(finalElement)
        setIsAnyHoveredName(false);
        document.getElementById('elInfo').style.top = "0";
    }

    return (
        <div className="periodic-table-component">
            <ElementInfo element={hoveredElement} />
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
            <RightBar 
                overGroupName={handleMouseOverRightBar} 
                leaveGroupName={handleMouseLeftRightBar} 
            />
        </div>

    )
}

export default PeriodicTable;