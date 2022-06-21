import React from "react";
import { useTranslation, getI18n } from "react-i18next";

import { GROUPNAMES_TRANSLATE } from "../../constants";
import "./ElementInfo.scss";

const ElementInfo = ({ element }) => {
  const { t } = useTranslation();
  const { language } = getI18n();
  return (
    <div className="element-info" id="elInfo">
      {Object.keys(element).length > 0 && element.hasOwnProperty("el_order") ? (
        <>
          <div className="title">
            <div className={`symbol color-info-${element.group_id}`}>
              {element.name_small}
            </div>
            <div className="name">
              <h3>{language === "en" ? element.name_ing : element.name_tr}</h3>
              <span>{GROUPNAMES_TRANSLATE[element.group_id]?.[language]}</span>
            </div>
          </div>
          <div className="detail">
            <div className="detail-atom">
              <p className="info">{t("energyLevel")}</p>
              <p className={`val color-info-${element.group_id}`}>
                {element.el_order}
              </p>
            </div>
            <div className="detail-atom">
              <p className="info">{t("weight")}</p>
              <p className={`val color-info-${element.group_id}`}>
                {Number.parseFloat(element.molar).toFixed(2)} <span>g/mol</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className={`val-group-name color-info-${element.group_id}`}>
          {GROUPNAMES_TRANSLATE[element.group_id]?.[language]}
        </p>
      )}
    </div>
  );
};

export default ElementInfo;
