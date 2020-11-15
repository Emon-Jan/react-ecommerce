export const authAdmin = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return false;
  }
  const { loggedInUser } = JSON.parse(user);
  if (!loggedInUser && loggedInUser.role !== "admin") {
    return false;
  }
  return true;
};

export const getToken = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return "";
  }
  const { token } = JSON.parse(user);
  if (!token) {
    return "";
  }
  return token;
};
