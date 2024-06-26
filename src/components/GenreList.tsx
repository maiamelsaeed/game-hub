import {
  HStack,
  List,
  ListItem,
  Image,
  Button,
  Heading,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";
import GenreListSkeleton from "./GenreListSkeleton";

const GenreList = () => {
  const { data, error, isLoading } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (isLoading) {
    return (
      <List>
        {skeletons.map((skeleton) => (
          <GenreListSkeleton key={skeleton} />
        ))}
      </List>
    );
  }

  return (
    <List>
      <Heading fontSize="2xl" marginTop={2} marginBottom={3}>
        Genres
      </Heading>
      {data?.results.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              objectFit="cover"
              src={getCroppedImageUrl(genre.image_background)}
            />
            <Button
              fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
              onClick={() => setSelectedGenreId(genre.id)}
              fontSize="lg"
              variant="link"
              whiteSpace="normal"
              textAlign="left"
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
