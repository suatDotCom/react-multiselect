import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import {
  getCharacterWithFilter,
} from "../services/rickAndMortyApi/characters";
import { Character, CharacterFilterInput } from "../models/character";
import { ApiResponseType, PageInfo } from "../shared/types/apiResponseType";

const fetcher = async (_key: string, filter: CharacterFilterInput) => {
  const response: ApiResponseType<Character[]> = await getCharacterWithFilter(
    filter
  );

  return response;
};

export const useGetCharactersWithFilter = (filter: CharacterFilterInput) => {
  const swrKey = createSWRKey(filter);
  const { data, isValidating, error } = useSWR(
    swrKey,
    () => {
      return fetcher(swrKey, filter);
    },
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (error) {
      throw new Error("Error fetching characters");
    }
  }, [error]);

  return {
    pageInfo: data?.info || ({} as PageInfo),
    characters: data?.results || [],
    charactersLoading: isValidating,
  };
};

export const reloadAllCharactersByPage = (filter: CharacterFilterInput) => {
  mutate(createSWRKey(filter));
};

const createSWRKey = (filter: CharacterFilterInput) => {
  return `charactersWithFilter-${filter.name}-${filter.status}-${filter.species}-${filter.type}-${filter.gender}-${filter.page}`;
};
