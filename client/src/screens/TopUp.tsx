import MyMap from '../components/Map';
import ApiService from '../ApiService';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sellers } from '../components/Sellers';
import { useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Row, Col, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

type Props = {
  authorization: boolean;
};

export const TopUp: React.FC<Props> = ({ authorization }) => {
  console.log('Hello you are in TopUp');
  return <h1>Hello - you are in TopUp</h1>;
};
