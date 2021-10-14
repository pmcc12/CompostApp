import { useState } from 'react';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { Col, Row, Container, Button, Card, Stack } from 'react-bootstrap';

export const Categories = (props: any) => {
  //fix TYPE of props!!!!!!!!
  const myState = useSelector((state: myReducersTypeof) => state.login);
  const [productCategoryId, setProductCategoryId] = useState('');

  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buyerId = myState.data.userId;

    setProductCategoryId(event.currentTarget.value);
    props.sortProducts(buyerId, productCategoryId);
  };

  return (
    <>
      <Col
        lg={4}
        md={6}
        sm={12}
        style={{ borderBlock: 'black' }}
        // className="block-example border border-dark"
      >
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
      ></Col>
    </>
  );
};
