import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../../store';
import './RightBar.scss';

const RightBar = (props) => {
    const { state } = useContext(Store);
    const [uniqueElements, setUniqueElements] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState("");
    const [clickedIndex, setClickedIndex] = useState("");
    const [clickedName, setClickedName] = useState({});
    const [isClickedGroupName, setIsClickedGroupName] = useState(false);

    useEffect(() => {
        const { elements } = state;
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

    const mouseOverGroupName = (name, idx) => {
        if (isClickedGroupName === false) {
            setHoveredIndex(idx);
            props.overGroupName(name);
        }        
    }

    const mouseLeaveGroupName = (name) => {    
        if (isClickedGroupName === false) {
            props.leaveGroupName(name);
            setHoveredIndex("");
        }
    }

    const mouseClickGroupName = (name, idx) => {
        if (name.group_id === clickedName.group_id) {
            setIsClickedGroupName(false);
            setClickedIndex("");
            props.clickGroupName(name);
        } else {
            setIsClickedGroupName(true);
            props.clickGroupName(name);
            setClickedName(name);
            setClickedIndex(idx);
            setHoveredIndex(idx);
        }                
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
                            <div key={element.group_id}
                                className={`items color-bar-${element.group_id} ${hoveredIndex !== "" && index !== hoveredIndex ? 'blur' : 'no-blur'} ${clickedIndex !== "" ? index !== clickedIndex && 'set' : 'no-set'}`}
                                onMouseOver={() => mouseOverGroupName(element, index)}
                                onMouseLeave={() => mouseLeaveGroupName(element)}
                                onClick={() => mouseClickGroupName(element, index)}
                            >{element.group_name}</div>
                        )
                    })
                }
            </div>
            <a className="github" href="https://github.com/isagul/periodic-table" target="_blank" rel="noopener noreferrer">
                <div>View on GitHub</div>
            </a>
            <p className="project-info">This project inspired by <a href="https://github.com/edisdev/periodic-table" target="_blank" rel="noopener noreferrer">this</a></p>
        </div>
    )
}

export default RightBar;