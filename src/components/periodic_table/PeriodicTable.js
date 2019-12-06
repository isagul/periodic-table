import React, { useContext, useState } from 'react';
import { Store } from '../../store';
import './PeriodicTable.scss';
import ElementInfo from '../element_info/ElementInfo';
import RightBar from '../right_bar/RightBar';

const PeriodicTable = () => {
    const { state } = useContext(Store);
    const [hoveredElement, setHoveredElement] = useState({});
    const [finalHoveredElement, setFinalHoveredElement] = useState({});
    const [hoveredGroup, setHoveredGroup] = useState({});
    const [isAnyHoveredName, setIsAnyHoveredName] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [clickedElement, setClickedElement] = useState({});


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
                                    onClick={() => setShow(true, element)}
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
                                    onClick={() => setShow(true, element)}
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

    function setShow(value, element){          
        if (element === null) {
            setIsVisible(value);
        } else {
            if (element.id !== 119 && element.id !== 120) {
                setClickedElement(element);
                setIsVisible(value);
            }  
        }  
    }

    function getHoveredElement(element) {
        if (element.id !== 119 && element.id !== 120) {
            setHoveredElement(element);
            setFinalHoveredElement(element);
        }
    }

    const handleMouseOverRightBar = (element) => {
        setHoveredGroup(element);
        setHoveredElement(element, 'group_name');
        setIsAnyHoveredName(true);
        document.getElementById('elInfo').style.top = "6vw";
    }

    const handleMouseLeftRightBar = () => {
        setHoveredGroup(finalHoveredElement)
        setHoveredElement(finalHoveredElement)
        setIsAnyHoveredName(false);
        document.getElementById('elInfo').style.top = "3rem";
    }

    const modal = () =>{
        return (
            <div className="modal-mask">
                <div className="modal-wrapper">
                    <div className={`modal-container color-${clickedElement.group_id}`}>
                        <div className="modal-header">
                            <button 
                                className={`modal-default-button color-modal-${clickedElement.group_id}`} onClick={() => setShow(false, null)}>
                                    x
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="info">
                                <div className="head">
                                    <h3 className="name">{clickedElement.name_ing}</h3>
                                    <h3 className="group_name">{clickedElement.group_name}</h3>
                                </div>
                                <h1 className="name_small">{clickedElement.name_small}</h1>
                                <div className="detail">
                                <h5 className="molar">{clickedElement.molar}<em> g / mol</em></h5>
                                <h5 className={`number color-modal-${clickedElement.group_id}`}>{clickedElement.el_order}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
            {
                isVisible && modal()
            }
        </div>
    )
}

export default PeriodicTable;