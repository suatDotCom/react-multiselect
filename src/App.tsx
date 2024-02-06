import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";
import MultiSelect from "./components/multiselect/multiSelect";
import { Character } from "./models/character";
import { SelectedItemModel } from "./shared/types/multiSelectItemModel";
import { useGetCharactersWithFilter } from "./hooks/useGetCharactersWithFilter";

const App = () => {
  const [filterText, setFilterText] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searching, setSearching] = useState(false);

  const [characterPage, setCharacterPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [selectedCharacters, setSelectedCharacters] = useState<
    SelectedItemModel[]
  >([]);

  const { characters, pageInfo, charactersLoading } =
    useGetCharactersWithFilter({
      name: filterText,
      page: characterPage,
    });

  const onChangeSelecteds = useCallback((selecteds: SelectedItemModel[]) => {
    setSelectedCharacters(selecteds);
  }, []);

  const filterWithDelay = useCallback(
    (text: string) => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      setTimer(
        setTimeout(() => {
          setFilterText(text);
          setSearching(false);
        }, 1000)
      );
    },
    [timer, setFilterText, setSearching]
  );

  const onSearch = useCallback(
    (text: string) => {
      setSearching(true);
      if (allCharacters.length > 0) {
        setAllCharacters([]);
      }

      if (characterPage != 1) {
        setCharacterPage(1);
      }

      filterWithDelay(text);
    },
    [allCharacters, characterPage, filterWithDelay]
  );

  const characterMultiSelectData = useMemo(() => {
    return allCharacters.map((x) => {
      return {
        value: x.id,
        label: x.name,
        description: x.episode.length + " episodes",
        imageSrc: x.image,
      };
    });
  }, [allCharacters]);

  useEffect(() => {
    if (characters) {
      const newList = [...allCharacters, ...characters];
      const uniqueList = Array.from(new Set(newList.map((x) => x.id))).map(
        (id) => {
          return newList.find((x) => x.id === id);
        }
      );
      setAllCharacters(uniqueList as Character[]);
    }
  }, [characters]);

  return (
    <>
      <img className={styles.rick} width={500} src="/images/rick.png" alt="rick" />
      <div className={`${styles.app} d-flex justify-center items-center`}>
        <div className={styles.multiselectContainer}>
          <MultiSelect
            placeholder="Search character..."
            items={characterMultiSelectData}
            itemsLoading={charactersLoading || searching}
            selectedItems={selectedCharacters}
            onSearch={onSearch}
            onChangeSelecteds={onChangeSelecteds}
            totalPage={pageInfo?.pages}
            currentPage={characterPage}
            onChangePage={(page) => {
              setCharacterPage(page);
            }}
            clearable
          />
        </div>
      </div>
      <img className={styles.morty} width={400} src="/images/morty.png" alt="morty" />

    </>
  );
};

export default App;
