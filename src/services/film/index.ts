import request from '../request';

export const searchFilms = async (
  path: string,
  query: string,
  filter: string,
  index: number,
) => {
  try {
    const response = await request.get(path, query, filter, index);
    return response;
  } catch {
    return null;
  }
};
