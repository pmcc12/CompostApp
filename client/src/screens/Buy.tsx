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

export const Buy: React.FC<Props> = ({ authorization }) => {
  const history = useHistory();
  const myState = useSelector((state: myReducersTypeof) => state.login);
  const userId = myState.data.userId;

  const [allUserProducts, setAllUserProducts] = useState([]);
  const [sortedByProducts, setSortedByProducts] = useState([]);

  useEffect(() => {
    ApiService.getUserOffers(userId).then((data: []) => {
      setAllUserProducts(data);
    });
  }, []);

  const handleSellerClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    sellerId: number
  ) => {
    history.push(`/details/${sellerId}`);
  };

  const sortProducts = (buyerId: number, productCategoryId: number) => {
    let sortedProductsArr: any = allUserProducts.filter((el) => {
      const catId = (el as any).categories[0].category.categoryId;
      const productCategoryIdNumber = Number(productCategoryId);
      return catId === productCategoryIdNumber;
    });

    setSortedByProducts(sortedProductsArr);
  };

  if (!authorization) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Navigation />
      <Container>
        <Row style={{ minHeight: '400px', paddingTop: '10px' }}>
          <Col lg={4} md={6} sm={12} style={{ borderBlock: 'black' }}>
            <h3>Pick a category</h3>
            <Categories sortProducts={sortProducts} />
          </Col>

          <Col lg={4} md={6} sm={12} style={{ borderBlock: 'black' }}>
            <h3>Nearest suppliers</h3>
            <Sellers
              handleSellerClick={handleSellerClick}
              sortedByProducts={sortedByProducts}
            />
          </Col>
          <Col lg={4} md={6} sm={12} style={{ borderBlock: 'black' }}>
            <h3>Seller location</h3>
            <MyMap
              location={{
                availability: true,
                error: false,
                latitude: myState.data.location.latitude,
                longitude: myState.data.location.longitude,
              }}
              inRegister={false}
              inDetailsOrSell={false}
              inSell={false}
              inBuy={true}
              inDetail={false}
              myProductsArray={sortedByProducts}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
