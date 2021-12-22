import React, { useEffect, useState, useRef, useCallback } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({
  users,
  isLoading,
  fetchUsers,
  addFavoriteUser,
  removeFavoriteUser,
}) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filters, setFilters] = useState([]);
  const [favoritesUsers, setFavoritesUsers] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Visible");
          fetchUsers(filters);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const heartIconClicked = (user, index) => {
    console.log("heartIconClicked called with index " + index);
    const favoritesUserIndex = favoritesUsers.indexOf(index);
    let newFavoritesUsers = [...favoritesUsers];
    if (favoritesUserIndex === -1) {
      newFavoritesUsers.push(index);
      addFavoriteUser(user);
    } else {
      newFavoritesUsers.splice(favoritesUserIndex, 1);
      removeFavoriteUser(user);
    }
    setFavoritesUsers(newFavoritesUsers);
  };

  // const filterUsers = (filters) => {
  //   console.log("filterUsers called");
  //   console.log("current filters is: ", filters);
  //   if (filters === [] || filters === null || filters.length === 0) {
  //     setFilteredUsers(users);
  //   } else {
  //     let newUsers = users.filter((user) => filters.includes(user?.location.country));
  //     console.log(newUsers);
  //     setFilteredUsers(newUsers);
  //   }
  // };

  const handleFilterChange = (filter) => {
    console.log("handleFilterChange called with arguments: ", filter);
    // console.log("before the change current filters is: ", filters);
    const filterIndex = filters.indexOf(filter);
    let newFilters = [...filters];
    if (filterIndex === -1) {
      newFilters.push(filter);
    } else {
      newFilters.splice(filterIndex, 1);
    }
    setFilters(newFilters);
    // filterUsers(newFilters);
    fetchUsers(newFilters);
  };
  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={() => handleFilterChange("BR")} />
        <CheckBox
          value="AU"
          label="Australia"
          onChange={() => handleFilterChange("AU")}
        />
        <CheckBox value="CA" label="Canada" onChange={() => handleFilterChange("CA")} />
        <CheckBox value="DE" label="Germany" onChange={() => handleFilterChange("DE")} />
        <CheckBox value="DK" label="Denmark" onChange={() => handleFilterChange("DK")} />
      </S.Filters>
      <S.List>
        {/* {console.log(filteredUsers)} */}
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              ref={users.length === index + 1 ? lastUserRef : null}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={
                  index === hoveredUserId || favoritesUsers.includes(index) === true
                }
              >
                <IconButton onClick={() => heartIconClicked(user, index)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
