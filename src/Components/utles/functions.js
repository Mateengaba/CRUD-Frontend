
// local storage se id get karna ka lia
const getUser = () => {
    const userData = window.atob(localStorage.getItem("user")); //stignyfiy
    const userDataParse = JSON.parse(userData);   
    return userDataParse;
  };
  
  export { getUser };