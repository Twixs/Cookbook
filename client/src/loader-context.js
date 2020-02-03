import React, { createContext } from 'react';

export default createContext({
  isLoading: true,
  setLoading: () => {},
});
