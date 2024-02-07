import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./multiSelect.module.css";
import { FaAngleDown, FaCircleXmark } from "react-icons/fa6";
import MultiSelectItem from "./multiSelectItem";
import { boldifyText } from "../../shared/helpers/text";
import {
  MultiSelectItemModel,
  SelectedItemModel,
} from "../../shared/types/multiSelectItemModel";
import MultiSelectItemLoading from "./loading/multiSelectItemLoading";
import {
  ENTER_KEY_CODE,
  SPACE_KEY_CODE,
  UP_KEY_CODE,
} from "../../shared/constants/keyboardKeys";

interface MultiSelectProps {
  items: MultiSelectItemModel[];
  itemsLoading?: boolean;
  selectedItems?: SelectedItemModel[];
  placeholder?: string;
  clearable?: boolean;
  totalPage?: number;
  currentPage?: number;

  onSearch?: (searchText: string) => void;
  onChangeSelecteds?: (selectedItems: SelectedItemModel[]) => void;
  onChangePage?: (page: number) => void;
}

const MultiSelect: FC<MultiSelectProps> = ({
  items,
  itemsLoading = false,
  selectedItems = [],
  placeholder,
  clearable = true,
  totalPage = 1,
  currentPage = 1,
  onChangeSelecteds,
  onSearch,
  onChangePage,
}) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);

  const showClearButton = useMemo(() => {
    return clearable && searchText.length > 0;
  }, [clearable, searchText]);

  const onSelectItem = useCallback(
    (checked: boolean, item: SelectedItemModel) => {
      if (checked && onChangeSelecteds) {
        onChangeSelecteds([...selectedItems, item]);
      }
      if (!checked && onChangeSelecteds) {
        onChangeSelecteds(selectedItems.filter((x) => x.value !== item.value));
      }
    },
    [selectedItems, onChangeSelecteds]
  );

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.scrollTo(0, 0);
      setSearchText(e.target.value);
      setShowSearchBox(true);
    },
    []
  );

  const onClearSearch = useCallback(() => {
    setSearchText("");
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      let { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
      if (scrollTop + clientHeight >= scrollHeight && currentPage < totalPage) {
        setScrollPosition(scrollTop);
        onChangePage && onChangePage(currentPage + 1);
      }
    },
    [currentPage, totalPage, onChangePage]
  );

  useEffect(() => {
    onSearch && onSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    if (searchBoxRef.current) {
      searchBoxRef.current.scrollTop = scrollPosition;
    }
  }, [items, searchBoxRef.current]);

  return (
    <div className={`${styles.multiselectContainer}`}>
      <div className="relative d-flex flex-row justify-between items-center gap-1">
        <input
          tabIndex={0}
          type="text"
          className={`${styles.search} shadow`}
          placeholder={placeholder}
          value={searchText}
          onChange={onChangeSearch}
          onFocus={() => {
            setShowSearchBox(true);
          }}
        />

        <div>
          <FaAngleDown
            tabIndex={0}
            className={`${styles.dropdownButton} ${
              showSearchBox && styles.open
            }`}
            onClick={() => {
              setShowSearchBox(!showSearchBox);
            }}
            onKeyDown={(e) => {
              if (
                e.keyCode === SPACE_KEY_CODE ||
                e.keyCode === ENTER_KEY_CODE
              ) {
                setShowSearchBox(!showSearchBox);
              }
            }}
          />
          {showClearButton && (
            <FaCircleXmark
              tabIndex={0}
              className={`${styles.clearButton}`}
              onClick={onClearSearch}
              onKeyDown={(e) => {
                if (
                  e.keyCode === SPACE_KEY_CODE ||
                  e.keyCode === ENTER_KEY_CODE
                ) {
                  onClearSearch();
                }
              }}
            />
          )}
        </div>
      </div>

      <div className={`${styles.selectedItemContainer} shadow`}>
        {selectedItems?.map((item, index) => (
          <div key={index} className={`${styles.selectedItem} shadow`}>
            <div className="relative">
              <FaCircleXmark
                className={styles.removeButton}
                onClick={() => {
                  onSelectItem(false, item);
                }}
              />
            </div>
            {item.label}
          </div>
        ))}
      </div>

      <div
        ref={searchBoxRef}
        className={`${styles.searchBox} d-flex flex-col shadow ${
          showSearchBox ? "opacity-1" : "opacity-0"
        }`}
        onScroll={handleScroll}
      >
        {itemsLoading ? (
          <div className="d-flex flex-col gap-1 m-20">
            {Array.from({ length: 5 }).map((_, index) => (
              <MultiSelectItemLoading key={index} />
            ))}
          </div>
        ) : !itemsLoading && items.length < 1 ? (
          <div className="m-20">
            <span>No items found</span>
          </div>
        ) : (
          items.map((item, index) => (
            <MultiSelectItem
              key={index}
              title={boldifyText(searchText, item.label)}
              imageSrc={item.imageSrc}
              description={item.description}
              isSelected={
                selectedItems?.find((x) => x.value === item.value) !== undefined
              }
              onSelect={(checked) => {
                onSelectItem(checked, {
                  value: item.value,
                  label: item.label,
                });
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
