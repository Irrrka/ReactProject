import React from 'react';

const UserContext = React.createContext({
    logged: false,
    user: null,
    login: () => {},
    logout: () => {},
});

export default UserContext;

