import MyMap from '../components/Map';
import ApiService from '../ApiService';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

  const [productCategoryId, setProductCategoryId] = useState('');
  const [sortedByProducts, setSortedByProducts] = useState([]);

  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buyerId = myState.data.userId;

    setProductCategoryId(event.currentTarget.value);
    sortProducts(buyerId, productCategoryId);
  };

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
            <Container style={{ padding: '5px' }}>
              <Row style={{ minHeight: '200px' }}>
                <Col
                  // className="block-example border border-dark"
                  style={{ padding: '5px' }}
                >
                  <Stack>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://media.wired.com/photos/5b2836690105105e90d02814/16:9/w_2400,h_1350,c_limit/compost-488988734.jpg"
                      />
                      <Card.Body>
                        <Card.Title>Juice Fertilizer</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={1}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://media.wired.com/photos/5b2836690105105e90d02814/16:9/w_2400,h_1350,c_limit/compost-488988734.jpg"
                      />
                      <Card.Body>
                        <Card.Title>Soil Fertilizer</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={2}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://media.wired.com/photos/5b2836690105105e90d02814/16:9/w_2400,h_1350,c_limit/compost-488988734.jpg"
                      />
                      <Card.Body>
                        <Card.Title>Vermicompost</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={3}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://media.wired.com/photos/5b2836690105105e90d02814/16:9/w_2400,h_1350,c_limit/compost-488988734.jpg"
                      />
                      <Card.Body>
                        <Card.Title>Activators for Compost</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={4}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3pIKUajEUBse6s4lOORnSqRRM58E8JFMEA&usqp=CAU"
                      />
                      <Card.Body>
                        <Card.Title>Worms</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={5}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3pIKUajEUBse6s4lOORnSqRRM58E8JFMEA&usqp=CAU"
                      />
                      <Card.Body>
                        <Card.Title>Brown Material</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={6}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant="top"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3pIKUajEUBse6s4lOORnSqRRM58E8JFMEA&usqp=CAU"
                      />
                      <Card.Body>
                        <Card.Title>Compost Case</Card.Title>
                        <Card.Text>Some description here</Card.Text>
                        <Button
                          value={7}
                          variant="primary"
                          onClick={(event) => handleCategoryClick(event)}
                        >
                          Click to select
                        </Button>
                      </Card.Body>
                    </Card>
                  </Stack>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col
            lg={4}
            md={6}
            sm={12}
            // className="block-example border border-dark"
          >
            <h3>Nearest suppliers</h3>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Supplier details</Card.Text>
                <Button
                  variant="primary"
                  value={1}
                  onClick={(event) => handleSellerClick(event)}
                >
                  Select supplier
                </Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>Supplier details</Card.Text>
                <Button variant="primary">Select supplier</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col
            lg={4}
            md={6}
            sm={12}
            // className="block-example border border-dark"
          >
            I AM A BOX IN WHICH A MAP WILL RESIDE
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
