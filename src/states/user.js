let currentUser = null;

const setUserState = (user) =>{
 currentUser = user;
} 

const getUserState= () =>{
 return currentUser;
}

export {
  setUserState,
  getUserState,
}
