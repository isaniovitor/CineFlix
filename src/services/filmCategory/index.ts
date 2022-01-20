import request from '../request';

export const searchFilmCategory = async (path: string) => {
  try {
    const response = await request.get(path, '', '', '');
    return response;
  } catch {
    return null;
  }
};
