import MyMap from '../components/Map';
import ApiService from '../ApiService';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { Sellers } from '../components/Sellers';

import Navigation from '../components/Navigation';
import {
  Row,
  Col,
  Container,
  Stack,
  Button,
  Image,
  Card,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

type Props = {
  authorization: boolean;
};

export const Buy: React.FC<Props> = ({ authorization }) => {
  const history = useHistory();
  const myState = useSelector((state: myReducersTypeof) => state.login);

  console.log('in buy');
  console.log('myState ', myState);
  console.log('userId ', myState.data.userId);

  // const [productCategoryId, setProductCategoryId] = useState('');
  const [sortedByProducts, setSortedByProducts] = useState([]);

  const handleSellerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // history.push('/details');
    history.push(`/details/${event.currentTarget.value}`);
  };

  const sortProducts = async (buyerId: number, productCategoryId: string) => {
    await ApiService.getUserOffers(buyerId).then((data: []) => {
      console.log('API CALL ', data);
      let sortedProductsArr: [] = [];

      data.map((el) => {
        const catId = (el as any).categories[0].category.categoryId;
        const productCategoryIdNumber = Number(productCategoryId);

        if (catId === productCategoryIdNumber) {
          sortedProductsArr.push(el);
        }
      });
      setSortedByProducts(sortedProductsArr);
      console.log('sortedByProducts ', sortedByProducts);
    });
  };

  if (!authorization) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ minHeight: '400px', paddingTop: '10px' }}>
          <Col
            lg={4}
            md={6}
            sm={12}
            style={{ borderBlock: 'black' }}
            // className="block-example border border-dark"
          >
            <h3>Pick a category</h3>
            <Categories sortProducts={sortProducts} />
          </Col>

          <Col
            lg={4}
            md={6}
            sm={12}
            // className="block-example border border-dark"
          >
            <h3>Nearest suppliers</h3>
            <Sellers handleSellerClick={handleSellerClick} />
          </Col>
          <Col
            lg={4}
            md={6}
            sm={12}
            // className="block-example border border-dark"
          >
            <h3>Seller location</h3>

            <MyMap
              location={{
                availability: true,
                error: false,
                latitude: 37.1245632,
                longitude: -7.9265792,
              }}
              inRegister={false}
              inDetailsOrSell={true}
              inBuy={false}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
