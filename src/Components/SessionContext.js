import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    sessionToken: null,
    role: null,
    username: null,
    userId: null,
  });

  const updateSession = (newSession) => {
    setSession(prev => ({ ...prev, ...newSession }));
  };

  const clearSession = () => {
    setSession({ sessionToken: null, role: null, username: null });
  };

  return (
    <SessionContext.Provider value={{ session, updateSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};