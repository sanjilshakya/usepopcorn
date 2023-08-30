import PropTypes from "prop-types";
import { useState } from "react";

TextExpander.propTypes = {
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default function TextExpander({
  children,
  collapsedNumWords = 30,
  expandButtonText = "Show more",
  collapseButtonText = "Hide",
  buttonColor = "blue",
  expanded = false,
  className = "",
}) {
  const [expand, setExpand] = useState(expanded);
  const displayText = expand
    ? children
    : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";
  return (
    <div className={className}>
      <span>{displayText}</span>
      <button
        onClick={() => setExpand(!expand)}
        style={{ backgroundColor: buttonColor, color: "white" }}
      >
        {expand ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
