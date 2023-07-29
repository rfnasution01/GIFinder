import { API } from "./API";

export const getGifBySearch = (params) => API.get(`/search`, { params: params });

export const getGifByTrending = (params) => API.get(`/trending`, {params: params });

