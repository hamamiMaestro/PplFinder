import React from "react";
import Text from "components/Text";
import FavoriteUsersList from "components/FavoriteUsersList";
// import { fetchFavorites, removeFavoriteUser } from "hooks";
import { fetchFavorites } from "hooks";

import * as S from "./style";

const Favorites = () => {
  // const { users, isLoading } = fetchFavorites();
  const { users, isLoading, removeFavoriteUser } = fetchFavorites();

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites Page
          </Text>
        </S.Header>
        <FavoriteUsersList
          users={users}
          isLoading={isLoading}
          removeFavoriteUser={removeFavoriteUser}
        />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
