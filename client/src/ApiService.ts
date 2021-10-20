import React from 'react';
import {
  Icategories,
  IgetAllUserProducts,
  userOffer,
  Imessage,
  InewChatRoom,
} from './state/actions';

type IApiService = {
  getUserOffers: (val: number) => any;
  submitUserOffer: (val: userOffer) => any;
  submitAvailableCategories: (val: Icategories[]) => any;
  getOwnUserOffers: (val: number) => any;
  postUserMessage: (val: Imessage) => any;
  postNewChatRoom: (val: InewChatRoom) => any;
  getAllChatMessages: (val: number) => any;
  getAllInboxes: (val: number) => any;
  putInCart: (buyerId: number, productId: number, orderQuantity: number) => any;
  buyItem: (buyerId: number, orderId: number) => any;
  topUp: (userId: number, topUp: number, sellerId: number) => any;
  getBalance: (userId: number) => any;
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

    console.log('in submit offer api service', productData.images);
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
  postUserMessage: async (message) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = message
      ? JSON.stringify({
          senderId: message.senderId,
          inboxId: message.inboxId,
          content: message.content,
        })
      : undefined;
    console.log('inside get own user offers');
    console.log(body);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/user/inbox/postMessage`, {
      method,
      body,
      headers,
    });
    const { data, errors } = await response.json();
    if (response.ok) {
      console.log('response in postUserMessage ok');
      console.log(data);
      return data;
    } else {
      return null;
    }
  },

  postNewChatRoom: async (message) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = message
      ? JSON.stringify({ userId1: message.userId1, userId2: message.userId2 })
      : undefined;
    console.log('inside get own user offers');
    console.log(body);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/user/postInbox`, {
      method,
      body,
      headers,
    });
    const { data, errors } = await response.json();
    if (response.ok) {
      console.log('response in get own users ok');
      console.log(data);
      return data;
    } else {
      return null;
    }
  },

  getAllChatMessages: async (inboxId) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'GET';
    console.log('inside get all chat messages from inboxId: ', inboxId);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(
      `${BASE_URL}/api/user/inbox/${inboxId}/getAllMessages`,
      { method, headers }
    );
    const { data, errors } = await response.json();
    if (response.ok) {
      console.log('response in getAllMessages is OK');
      console.log(data);
      return data;
    } else {
      return null;
    }
  },

  getAllInboxes: async (inboxId) => {
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'GET';
    console.log('inside get all chat messages from inboxId: ', inboxId);
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(
      `${BASE_URL}/api/user/${inboxId}/getAllInboxes`,
      { method, headers }
    );
    const { data, errors } = await response.json();
    if (response.ok) {
      console.log('response in getAllInboxes OK');
      console.log(data);
      return data;
    } else {
      return null;
    }
  },

  getOwnUserOffers: async (sellerId) => {
    console.log('sellerId inside getOwnUserOffers', sellerId);
    const BASE_URL = process.env.REACT_APP_HOST;

    const method = 'POST';
    const body = sellerId ? JSON.stringify({ sellerId: sellerId }) : undefined;

    const defaultHeaders = { 'Content-Type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/buy/getAllProductsbySeller`, {
      method,
      body,
      headers,
    });

    const res = await response.json();
    console.log('res ', res);
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

  topUp: async (sellerId, topUp) => {
    console.log('sellerId inside API ', sellerId);
    console.log('topupamount inside API ', topUp);
    const BASE_URL = process.env.REACT_APP_HOST;
    const method = 'POST';
    const body =
      sellerId && topUp
        ? JSON.stringify({
            sellerId: sellerId,
            topUpAmount: topUp,
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

  getBalance: async (userId) => {
    console.log('inside getBalance API ', userId);
    const BASE_URL = process.env.REACT_APP_HOST;
    const method = 'POST';
    const body = userId
      ? JSON.stringify({
          userId: userId,
        })
      : undefined;

    const defaultHeaders = { 'Content-type': 'application/json' };
    const headers = { ...defaultHeaders };
    const response = await fetch(`${BASE_URL}/api/user/balance`, {
      method,
      body,
      headers,
    });

    const res = await response.json();
    console.log('res from getBalance ', res);

    if (res.status) {
      return res.data;
    } else {
      return res;
    }
  },
};

export default ApiService;
