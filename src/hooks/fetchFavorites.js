import { useState, useEffect } from "react";

export const fetchFavorites = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavoriteUsers();
  }, []);

  async function fetchFavoriteUsers() {
    console.log("fetchFavoriteUsers called");
    setIsLoading(true);
    const favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
    setIsLoading(false);
    if (favoriteUsers != null) setUsers(favoriteUsers);
  }

  function removeFavoriteUser(user) {
    console.log("removeFavoriteUser called");
    let favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
    if (favoriteUsers != null) {
      favoriteUsers = favoriteUsers.filter((favoriteUser) => {
        return favoriteUser.login.md5.toString() !== user.login.md5.toString();
      });
    }
    localStorage.setItem("favoriteUsers", JSON.stringify(favoriteUsers));
    setUsers(favoriteUsers);
  }

  return { users, isLoading, fetchFavorites, removeFavoriteUser };
};
