import React, { useEffect, useContext, useState } from 'react';
import { Store } from '../../store';
import './RightBar.scss';

const RightBar = (props) => {
    const { state } = useContext(Store);
    const [uniqueElements, setUniqueElements] = useState([]);
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

    return (
        <div className="right-menu">
            <div className="text">
                <h3>Periodic Table</h3>
            </div>
            <div className="description">
                {
                    uniqueElements.map((element, index) => {
                        return (
                            <div key={index} 
                            className={`items color-bar-${element.group_id}`} 
                            onMouseOver={() => props.overGroupName(element)}
                            onMouseLeave={() => props.leaveGroupName(element)}
                            >{element.group_name}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RightBar;