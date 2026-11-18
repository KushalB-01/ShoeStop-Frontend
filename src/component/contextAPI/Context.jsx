import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { API_URL } from '../../config';

export const productContext = createContext();

const Context = ({ children }) => {
  const [favProList, setFavProductList] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  const getFav = async () => {
    if (!token) {
      setFavProductList([]);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/addfav`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavProductList(response.data);
    } catch (error) {
      console.error('Could not fetch favourites:', error.response?.data || error.message);
    }
  };

  const getcart = async () => {
    if (!token) {
      setCartProducts([]);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/addcart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartProducts(response.data);
    } catch (error) {
      console.error('Could not fetch cart:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getFav();
      getcart();
    } else {
      setFavProductList([]);
      setCartProducts([]);
    }
  }, [token]);

  return (
    <productContext.Provider
      value={{
        favProList,
        setFavProductList,
        cartProduct,
        setCartProducts,
        token,
        setToken,
        getFav,
        getcart,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default Context;