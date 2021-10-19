//@ts-nocheck
import React from 'react';
import {
  Icategories,
  IgetAllUserProducts,
  userOffer,
  Imessage,
} from './state/actions';

type IApiService = {
  getUserOffers: (val: number) => any;
  submitUserOffer: (val: userOffer) => any;
  submitAvailableCategories: (val: Icategories[]) => any;
  getOwnUserOffers: (val: number) => any;
  postUserMessage: (val: Imessage) => any;
  topUp: (userId: number, topUp: number) => any;
};

/* Get all user related products */
const ApiService: IApiService = {
  getUserOffers: async (userId) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = userId ? JSON.stringify({ userId: userId }) : undefined;
    console.log('inside get user offers');
    console.log(body);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/buy/getAllProducts`, {
      method,
      body,
      headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },

  submitUserOffer: async (productData) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    console.log('HERE', productData.images);
    const selectedFile = productData.images;

    // to silent ts for delete props
    const deleteImages = async (x: any) => {
      await delete x.images;
    };
    deleteImages(productData);

    // multipart/form-data will turn everything to string
    // Blob will protect that object so its still json
    const json = JSON.stringify(productData);
    //blob basically is a protocol that converts json into binary raw
    const blob = new Blob([json], {
      type: 'application/json',
    });
    // Make it as an object
    let formData = new FormData();
    formData.append('userFile', selectedFile);
    formData.append('userDocument', blob);

    const method = 'POST';
    // const body = productData ? JSON.stringify(productData) : undefined;
    // const defaultHeaders = { 'Content-Type': 'multipart/form-data' };
    // const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/sell/product`, {
      method,
      body: formData, // Bcs it is 'multipart/form-data', in the server it's req.files
      // headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
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

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },

  getOwnUserOffers: async (sellerId) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = sellerId ? JSON.stringify({ sellerId: sellerId }) : undefined;
    console.log('inside get own user offers');
    console.log(body);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/buy/getAllProductsbySeller`, {
      method,
      body,
      headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },
  postUserMessage: async (message) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = message
      ? JSON.stringify({
          senderId: message.senderId,
          receiverId: message.receiverId,
          content: message.content,
        })
      : undefined;
    console.log('inside get own user offers');
    console.log(body);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/user/message`, {
      method,
      body,
      headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },

  putInCart: async (buyerId, productId, orderQuantity) => {
    const BASE_URL = process.env.REACT_APP_HOST;
    const method = 'POST';
    const body =
      buyerId && productId && orderQuantity
        ? JSON.stringify({
            buyerId: buyerId,
            productId: productId,
            orderQuantity: orderQuantity,
          })
        : undefined;
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/user/cart/add`, {
      method,
      body,
      headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },

  buyItem: async (buyerId, orderId) => {
    const BASE_URL = process.env.REACT_APP_HOST;
    const method = 'PUT';
    const body =
      buyerId && orderId
        ? JSON.stringify({ buyerId: buyerId, orderId: orderId })
        : undefined;
    const defaultHeaders = { 'Content-type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/cart/buyItem`, {
      method,
      body,
      headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },

  topUp: async (userId, topUp, sellerId) => {
    console.log('userId in API', userId);
    console.log('topUp in API', topUp);
    console.log('sellerId ', sellerId);
    const BASE_URL = process.env.REACT_APP_HOST;
    const method = 'POST';
    const body =
      userId && topUp
        ? JSON.stringify({
            userId: userId,
            topUpAmount: topUp,
            sellerId: sellerId,
          })
        : undefined;

    const defaultHeaders = { 'Content-type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/payment/checkout`, {
      method,
      body,
      headers,
    });

    const res = await response.json();

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },
};

export default ApiService;
