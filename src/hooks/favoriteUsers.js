export const removeFavoriteUser = (user) => {
  console.log("removeFavoriteUser called");
  let favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
  if (favoriteUsers != null) {
    favoriteUsers = favoriteUsers.filter((favoriteUser) => {
      return favoriteUser.login.md5.toString() !== user.login.md5.toString();
    });
  }
  localStorage.setItem("favoriteUsers", JSON.stringify(favoriteUsers));
};

export const addFavoriteUser = (user) => {
  console.log("addFavoriteUser called");
  let favoriteUsers = JSON.parse(localStorage.getItem("favoriteUsers"));
  if (favoriteUsers == null) {
    let newFavoritesUsers = [user];
    localStorage.setItem("favoriteUsers", JSON.stringify(newFavoritesUsers));
  } else {
    favoriteUsers.push(user);
    localStorage.setItem("favoriteUsers", JSON.stringify(favoriteUsers));
  }
};
