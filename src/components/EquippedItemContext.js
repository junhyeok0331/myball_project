// src/context/EquippedItemContext.js
import React, { createContext, useContext, useState } from 'react';

const EquippedItemContext = createContext();

export const EquippedItemProvider = ({ children }) => {
  const [equippedItem, setEquippedItem] = useState(null);
  return (
    <EquippedItemContext.Provider value={{ equippedItem, setEquippedItem }}>
      {children}
    </EquippedItemContext.Provider>
  );
};

export const useEquippedItem = () => useContext(EquippedItemContext);
