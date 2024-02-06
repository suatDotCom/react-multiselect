import { CharacterFilterInput } from "../../models/character";
import { BASE_URL } from "./configuration";

export const getCharacterWithFilter = async (filter: CharacterFilterInput) => {
  const { name, status, species, type, gender, page } = filter;

  const queryParams = new URLSearchParams();

  if (name) {
    queryParams.append("name", name);
  }

  if (status) {
    queryParams.append("status", status);
  }

  if (species) {
    queryParams.append("species", species);
  }

  if (gender) {
    queryParams.append("gender", gender);
  }

  if (type) {
    queryParams.append("type", type);
  }

  if (page) {
    queryParams.append("page", page.toString());
    
  }

  const response = await fetch(
    `${BASE_URL}/character/?${queryParams.toString()}`
  );
  const data = await response.json();
  return data;
};
