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
    console.log('allUserProducts ', allUserProducts);
    let sortedProductsArr: any = allUserProducts.filter((el: any) => {
      const catId = (el as any).categories[0].category.categoryId;
      const productCategoryIdNumber = Number(productCategoryId);
      return el.availableQuantity > 0 && catId === productCategoryIdNumber;
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
        <Container>
          {/* One row with one column, this column has a offset in each side of the column (4 left + 4 right) and it has a width(span) of 4 in a 12 positions grid system.. therefore is "centered" */}
          <Row>
            <Col md={{ span: 4, offset: 4 }} sm={{ span: 12 }}>
              <h3 style={{ textAlign: 'center' }}>Pick a category</h3>
            </Col>
          </Row>
          {/* Large screen(lg) will have 6 column elements, medium screen devices (md) will render 4 column elements */}
          <Row
            lg={6}
            md={4}
            sm={2}
            style={{ minHeight: '300px', paddingTop: '10px' }}
          >
            <Categories sortProducts={sortProducts} />
          </Row>
        </Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }} sm={{ span: 12 }}>
            <h3 style={{ textAlign: 'center' }}>Nearest suppliers</h3>
          </Col>
        </Row>
        <Row
          lg={4}
          md={3}
          sm={2}
          style={{ minHeight: '300px', paddingTop: '10px' }}
        >
          <Sellers
            handleSellerClick={handleSellerClick}
            sortedByProducts={sortedByProducts}
          />
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 4 }} sm={{ span: 12 }}>
            <h3 style={{ textAlign: 'center' }}>Supplier Location</h3>
          </Col>
        </Row>
        <Row style={{ paddingTop: '10px' }}>
          <Col
            lg={{ span: 8, offset: 2 }}
            md={{ span: 8, offset: 2 }}
            sm={12}
            style={{ borderBlock: 'black' }}
          >
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

/*
<Row style={{ minHeight: '400px', paddingTop: '10px' }}>
          <Col lg={4} md={6} sm={12} style={{ borderBlock: 'black' }}>
            <h3>Nearest suppliers</h3>
            <Sellers
              handleSellerClick={handleSellerClick}
              sortedByProducts={sortedByProducts}
            />
          </Col>
</Row>
*/
