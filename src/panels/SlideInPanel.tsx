import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface SlideInPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SlideInPanel: React.FC<SlideInPanelProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div className={`slide-in-panel ${isOpen ? "open" : ""}`}>
      <div className="slide-in-panel-header">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="slide-in-panel-content">{children}</div>
    </div>
  );
};

export default SlideInPanel;
