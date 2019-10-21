import { useState } from 'react';

// allows for persistent state if page resets
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    /* initial state is either the value already in localStorage if it exists or the
    supplied initial value. Objects are stored as strings so will need to be parsed */
    return item ? JSON.parse(item) : initialValue;
  });

  // set both state and localStorage to setValue()
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
