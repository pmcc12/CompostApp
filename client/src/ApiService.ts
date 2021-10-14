import React from 'react';
import { Icategories, IgetAllUserProducts, userOffer } from './state/actions';

type IApiService = {
<<<<<<< HEAD
    getUserOffers: (val: number) => any,
    submitUserOffer: (val: userOffer) => any,
    submitAvailableCategories: (val: Icategories[]) => any
}
=======
  getUserOffers: (val: number) => any;
  submitUserOffer: (val: userOffer) => any;
  submitAvailableCategories: (val: Icategories[]) => any;
};
>>>>>>> developement

/* Get all user related products */
const ApiService: IApiService = {
  getUserOffers: async (userId) => {
    const BASE_URL = process.env.REACT_APP_HOST;

<<<<<<< HEAD
    getUserOffers: async (userId) => {
        const BASE_URL = process.env.REACT_APP_HOST;
        
            const method = 'POST';
            const body = userId ? JSON.stringify({userId: userId}) : undefined;
            const defaultHeaders = {'Content-Type': 'application/json'};
            const headers = {...defaultHeaders}
            const response = await fetch(`${BASE_URL}/api/buy/getAllProducts`,{method,body,headers})
=======
    const method = 'GET';
    const body = userId ? JSON.stringify({ userId: userId }) : undefined;
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/buy/getAllProducts`, {
      method,
      body,
      headers,
    });
>>>>>>> developement

    const { data, errors } = await response.json();
    if (response.ok) {
      const finalData = data;
      return data;
    } else {
      return null;
    }
  },

  submitUserOffer: async (productData) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = productData ? JSON.stringify(productData) : undefined;
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/sell/product`, {
      method,
      body,
      headers,
    });

    const { data, errors } = await response.json();
    if (response.ok) {
      const finalData = data;
      return true;
    } else {
      return false;
    }
  },

  submitAvailableCategories: async (availableCategories) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = availableCategories
      ? JSON.stringify(availableCategories)
      : undefined;
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/category`, {
      method,
      body,
      headers,
    });

<<<<<<< HEAD
        const {data, errors} = await response.json()
        if(response.ok){
            const finalData = data
            return true
        }else {
            return false
        }
    },


=======
    const { data, errors } = await response.json();
    if (response.ok) {
      const finalData = data;
      return true;
    } else {
      return false;
    }
  },
>>>>>>> developement
};

export default ApiService;
