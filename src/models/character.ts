import { screen } from '@testing-library/react';
import { CharacterGender } from '../shared/constants/character';
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterFilterInput {
  name?: string;
  page?: number;
  status?: string;
  species?: string;
  type?: string
  gender?: CharacterGender;
}
