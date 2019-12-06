import React from 'react';
import './ElementInfo.scss';

const ElementInfo = ({ element }) => {
    return (
        <div className="element-info" id="elInfo">
            {
                Object.keys(element).length > 0 && element.hasOwnProperty('el_order') ?
                <>
                    <div className="title">
                        <div className={`symbol color-info-${element.group_id}`}>
                            {element.name_small}
                        </div>
                        <div className="name">
                            <h3>{element.name_ing}</h3>
                            <span>{element.group_name}</span>
                        </div>
                    </div>
                    <div className="detail">
                        <div className="detail-atom">
                            <p className="info">Atom Numarası</p>
                            <p className={`val color-info-${element.group_id}`}>{element.el_order}</p>
                        </div>
                        <div className="detail-atom">
                            <p className="info">Atom Kütlesi</p>
                            <p className={`val color-info-${element.group_id}`}>{Number.parseFloat(element.molar).toFixed(2)} <span>g/mol</span></p>
                        </div>
                    </div> 
                </> : 
                <p className={`val-group-name color-info-${element.group_id}`}>{element.group_name}</p>
            }
        </div>
    )
}

export default ElementInfo;