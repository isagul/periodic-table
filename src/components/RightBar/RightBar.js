import React, { useEffect, useContext, useState, useCallback } from "react";
import { css } from "@emotion/core";
import { PacmanLoader } from "react-spinners";
import { useTranslation, getI18n } from "react-i18next";

import TrFlag from "images/turkey.png";
import EnFlag from "images/united-kingdom.png";

import { Store } from "../../store";
import { GROUPNAMES_TRANSLATE } from "../../constants";
import "./RightBar.scss";

const RightBar = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = getI18n();
  const { state } = useContext(Store);
  const [uniqueElements, setUniqueElements] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState("");
  const [clickedIndex, setClickedIndex] = useState("");
  const [clickedGroupName, setClickedGroupName] = useState({});
  const [isClickedGroupName, setIsClickedGroupName] = useState(false);

  const override = css`
    position: absolute;
    left: 46%;
  `;

  const extractAndDistinct = useCallback((arr) => {
    const groupNames = arr.reduce((acc, element) => {
      const { group_id, group_name } = element;
      return [...acc, { group_id, group_name }];
    }, []);
    const uniq = new Set(groupNames.map((e) => JSON.stringify(e)));
    return Array.from(uniq).map((e) => JSON.parse(e));
  }, []);

  useEffect(() => {
    const { elements } = state;
    setUniqueElements(extractAndDistinct(elements));
  }, [state, extractAndDistinct]);

  const mouseOverGroupName = (groupName, idx) => {
    if (isClickedGroupName === false) {
      setHoveredIndex(idx);
      props.overGroupName(groupName);
    }
  };

  const mouseLeaveGroupName = (groupName) => {
    if (isClickedGroupName === false) {
      props.leaveGroupName(groupName);
      setHoveredIndex("");
    }
  };

  const mouseClickGroupName = (groupName, idx) => {
    if (groupName.group_id === clickedGroupName.group_id) {
      setClickedGroupName({});
      setIsClickedGroupName(false);
      setClickedIndex("");
      setHoveredIndex("");
      props.clickGroupName({});
    } else {
      setClickedGroupName(groupName);
      setIsClickedGroupName(true);
      setClickedIndex(idx);
      setHoveredIndex(idx);
      props.clickGroupName(groupName);
    }
  };

  const setSiteLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="right-menu">
      <div className="right-bar-header">
        <div className="flag-area">
          <img
            src={TrFlag}
            alt="tr-flag"
            width={30}
            height={30}
            onClick={() => setSiteLanguage("tr")}
            className={language === "tr" ? "current-lang" : ""}
          />
          <img
            src={EnFlag}
            alt="en-flag"
            width={30}
            height={30}
            onClick={() => setSiteLanguage("en")}
            className={language === "en" ? "current-lang" : ""}
          />
        </div>
        <h3>{t("projectTitle")}</h3>
      </div>
      {state.loading && (
        <PacmanLoader
          css={override}
          sizeUnit={"px"}
          size={20}
          color={"#36d7b7"}
          loading={state.loading}
        />
      )}
      <div className="description">
        {uniqueElements.map((groupName, index) => {
          return (
            <div
              key={groupName.group_id}
              className={`items color-bar-${groupName.group_id} ${
                hoveredIndex !== "" && index !== hoveredIndex
                  ? "blur"
                  : "no-blur"
              } ${
                clickedIndex !== "" ? index !== clickedIndex && "set" : "no-set"
              }`}
              onMouseOver={() => mouseOverGroupName(groupName, index)}
              onMouseLeave={() => mouseLeaveGroupName(groupName)}
              onClick={() => mouseClickGroupName(groupName, index)}
            >
              {GROUPNAMES_TRANSLATE[groupName.group_id]?.[language]}
            </div>
          );
        })}
      </div>
      <a
        className="github"
        href="https://github.com/isagul/periodic-table"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>GitHub</div>
      </a>
    </div>
  );
};

export default RightBar;
