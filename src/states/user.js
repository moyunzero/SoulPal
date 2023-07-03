let currentUser = null;

const setCurrentUserState = (user) =>{
 currentUser = user;
} 

const getCurrentUserState = () =>{
 return currentUser;
}

export {
 setCurrentUserState,
 getCurrentUserState,
}
