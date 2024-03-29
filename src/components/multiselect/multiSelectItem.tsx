import React, { useCallback, useMemo } from "react";
import styles from "./multiSelectItem.module.css";
import {
  SPACE_KEY_CODE,
} from "../../shared/constants/keyboardKeys";

interface MultiSelectItemProps {
  imageSrc?: string;
  title: string;
  description?: string;
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
}
const MultiSelectItem: React.FC<MultiSelectItemProps> = ({
  imageSrc,
  title,
  description,
  isSelected = false,
  onSelect,
}) => {
  const rickSound = useMemo(() => new Audio("/sounds/rick_bitch.mp3"), []);

  const onSelectItem = useCallback(() => {
    onSelect && onSelect(!isSelected);
    rickSound.play();
  }, [onSelect, rickSound]);

  return (
    <div
      key={title}
      className={`${styles.multiselectItem}`}
      onClick={onSelectItem}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.keyCode == SPACE_KEY_CODE) {
          e.preventDefault();
          onSelectItem();
        }
      }}
    >
      <div className="d-flex flex-row gap-1 items-center">
        <div className={`${styles.checkbox}`}>
          <input tabIndex={-1} type="checkbox" checked={isSelected} />
          <span className={`${styles.checkmark}`} />
        </div>

        <img src={imageSrc} className={styles.image} />

        <div className="d-flex flex-col">
          <span
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title }}
          ></span>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </div>
  );
};
export default MultiSelectItem;
