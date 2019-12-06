import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../../store';
import './RightBar.scss';

const RightBar = (props) => {
    const { state } = useContext(Store);
    const [uniqueElements, setUniqueElements] = useState([]);
    const [hoveredGroupName, setHoveredGroupName] = useState({});
    const [clickedGroupName, setClickedGroupName] = useState({});
    const { elements } = state;

    useEffect(() => {
        console.log(elements);
        setUniqueElements(extractAndDistinct(elements));
    }, [state]);


    const extractAndDistinct = (arr) => {
        const groupNames = arr.reduce((acc, element) => {
            const { group_id, group_name } = element;
            return [...acc, { group_id, group_name }]
        }, [])

        const uniq = new Set(groupNames.map(e => JSON.stringify(e)));

        return Array.from(uniq).map(e => JSON.parse(e));
    }

    const mouseOverGroupName = (element) => {
        setHoveredGroupName(element);
        props.overGroupName(element);
    }

    const mouseLeaveGroupName = (element) => {
        props.leaveGroupName(element);
        setHoveredGroupName({});
    }

    const mouseClickGroupName = (element) => {
        console.log(element);
        setClickedGroupName(element);
    }


    return (
        <div className="right-menu">
            <div className="text">
                <h3>Periyodik Tablo</h3>
            </div>
            <div className="description">
                {
                    uniqueElements.map((element, index) => {
                        return (
                            <>
                                {
                                    Object.keys(hoveredGroupName).length > 0 ?
                                    <div key={index} 
                                        className={`items color-bar-${element.group_id} 
                                        ${hoveredGroupName.group_id !== element.group_id && 'blur'}`} 
                                        onMouseOver={() => mouseOverGroupName(element)}
                                        onMouseLeave={() => mouseLeaveGroupName(element)}
                                        onClick={() => mouseClickGroupName(element)}
                                    >{element.group_name}</div> : 
                                    <div key={index} 
                                        className={`items color-bar-${element.group_id}`} 
                                        onMouseOver={() => mouseOverGroupName(element)}
                                        onMouseLeave={() => mouseLeaveGroupName(element)}>{element.group_name}</div>
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RightBar;