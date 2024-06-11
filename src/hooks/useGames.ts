import { GameQuery } from "../App";
import { useQuery } from "@tanstack/react-query";
import apiClient, { FetchResponse } from "../services/api-client";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            search: gameQuery.searchText,
            ordering: gameQuery.sortOrder,
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
          },
        })
        .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, //24h
  });

export default useGames;
