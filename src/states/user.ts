let currentUser: UserType;

const getUserState = (): UserType => {
    return currentUser;
}

const setUserState = (user: UserType) => {
    currentUser = user;
}

export {getUserState, setUserState}