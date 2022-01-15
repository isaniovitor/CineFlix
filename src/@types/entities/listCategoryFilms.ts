import type { FilmProps } from './Film';
import type { FilmCategoryProps } from './FilmCategory';

export interface listCategoryFilmsProps {
  category: FilmCategoryProps;
  films: FilmProps[];
  currentPage: number;
}
