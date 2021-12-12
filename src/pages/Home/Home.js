import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { addFavoriteUser, usePeopleFetch, removeFavoriteUser } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          fetchUsers={fetchUsers}
          addFavoriteUser={addFavoriteUser}
          removeFavoriteUser={removeFavoriteUser}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
