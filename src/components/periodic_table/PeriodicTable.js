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
    const [clickedName, setClickedName] = useState({});
    const [isClickedGroupName, setIsClickedGroupName] = useState(false);


    const elementButton = (startIndex, endIndex) => {
        return (
            state.elements.length > 0 &&
            state.elements.slice(startIndex, endIndex).map((element, index) => {
                return (
                        <button
                            className={`color-${element.group_id} ${isAnyHoveredName ? element.group_id === hoveredGroup.group_id ? 'remove-opacity' : 'add-opacity' : 'remove-opacity'}`}
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
        if (isClickedGroupName === false) {
            if (element.id !== 119 && element.id !== 120) {
                setHoveredElement(element);
                setFinalHoveredElement(element);
            }
        }
        
    }

    const handleMouseOverRightBar = (name) => {
        if (isClickedGroupName === false) {
            setHoveredGroup(name);
            setHoveredElement(name, 'group_name');
            setIsAnyHoveredName(true);
        }
        
    }

    const handleMouseLeftRightBar = (name,event) => {
        if (isClickedGroupName === false) {
            setHoveredGroup(finalHoveredElement)
            setHoveredElement(finalHoveredElement)
            setIsAnyHoveredName(false);
        }
        
    }

    const handleClickedRightBar = (name) => {
        if (clickedName.group_id === name.group_id) {
            setIsClickedGroupName(false);
        } else {
            setIsClickedGroupName(true);
            setHoveredGroup(name);
            setHoveredElement(name, 'group_name');
            setIsAnyHoveredName(true);
            setClickedName(name);
        }
        
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
                <ElementInfo element={hoveredElement} />
                <div>
                    {elementButton(12, 18)}
                </div>
            </div>
            <div className="periodic-table">
                {elementButton(18, 90)}
            </div>
            <div className="periodic-table footer">
                {elementButton(90, 120)}
            </div>
            <RightBar
                overGroupName={handleMouseOverRightBar}
                leaveGroupName={handleMouseLeftRightBar}
                clickGroupName={handleClickedRightBar}
            />
            {
                isVisible && modal()
            }
        </div>
    )
}

export default PeriodicTable;