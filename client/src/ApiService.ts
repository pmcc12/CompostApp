import React from 'react';
import { Icategories, IgetAllUserProducts, userOffer } from './state/actions';

type IApiService = {
    getUserOffers: (val: number) => any,
    submitUserOffer: (val: userOffer) => any,
    submitAvailableCategories: (val: Icategories[]) => any,
    getOwnUserOffers: (val: number) => any,
}

/* Get all user related products */
const ApiService: IApiService = {

    getUserOffers: async (userId) => {
        const BASE_URL = process.env.REACT_APP_HOST;
        
        const method = 'POST';
        const body = userId ? JSON.stringify({userId: userId}) : undefined;
        console.log('inside get user offers');
        console.log(body)
        const defaultHeaders = {'Content-Type': 'application/json'};
        const headers = {...defaultHeaders}
        const response = await fetch(`${BASE_URL}/api/buy/getAllProducts`,{method,body,headers})

        const { data, errors } = await response.json();
        if (response.ok) {
            console.log('response ok');
            console.log(data);
            return data;
        } else {
            return null;
        }
    },

  submitUserOffer: async (productData) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    console.log("HERE", productData.images)
    const selectedFile = productData.images;

    // to silent ts for delete props
    const deleteImages = async (x: any) => {
        await delete x.images; 
    }
    deleteImages(productData)

    // multipart/form-data will turn everything to string
    // Blob will protect that object so its still json
    const json = JSON.stringify(productData);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    // Make it as an object
    let formData = new FormData();
    formData.append("userFile", selectedFile)
    formData.append("userDocument", blob);
    

    const method = 'POST';
    // const body = productData ? JSON.stringify(productData) : undefined;
    // const defaultHeaders = { 'Content-Type': 'multipart/form-data' };
    // const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/sell/product`, {
      method,
      body: formData, // Bcs it is 'multipart/form-data', in the server it's req.files
      // headers,
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

        const {data, errors} = await response.json()
        if(response.ok){
            const finalData = data
            return true
        }else {
            return false
        }
    },

    getOwnUserOffers: async (userId) => {
      const BASE_URL = process.env.REACT_APP_HOST;
      
      const method = 'POST';
      const body = userId ? JSON.stringify({sellerId: userId}) : undefined;
      console.log('inside get own user offers');
      console.log(body)
      const defaultHeaders = {'Content-Type': 'application/json'};
      const headers = {...defaultHeaders}
      const response = await fetch(`${BASE_URL}/api/buy/getAllProductsbySeller`,{method,body,headers})

      const { data, errors } = await response.json();
      if (response.ok) {
          console.log('response in get own users ok');
          console.log(data);
          return data;
      } else {
          return null;
      }
  }

};

export default ApiService;
