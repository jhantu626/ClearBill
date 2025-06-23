import {Children, createContext, useContext, useState} from 'react';

const AccessContext = createContext();

const AccessProvider = ({children}) => {
  const [role, setRole] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  return (
    <AccessContext.Provider
      value={{role, setRole, currentUserId, setCurrentUserId}}>
      {children}
    </AccessContext.Provider>
  );
};

const useAccess = () => {
  const context = useContext(AccessContext);
  if (!context) {
    return 'useAccess must be used within a AccessProvider';
  }
  return context;
};

export {useAccess};

export default AccessProvider;
