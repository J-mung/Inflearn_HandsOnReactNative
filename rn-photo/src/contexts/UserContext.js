import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvier = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

UserProvier.propTypes = {
  children: PropTypes.node,
};

const useUserState = () => useContext(UserContext);

export { UserProvier, useUserState };
