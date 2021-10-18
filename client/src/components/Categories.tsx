import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { Button, Card, Image, Stack } from 'react-bootstrap';
import { compostCategories } from '../CompostCategories';
import {Col} from 'react-bootstrap';


interface props {
  sortProducts: (buyerId: number, productCategoryId: number) => void;
}

export const Categories = (props: props) => {
  const myState = useSelector((state: myReducersTypeof) => state.login);

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    productCategoryId: number
  ) => {
    console.log('handleCategoryClick()');
    const buyerId = myState.data.userId;
    props.sortProducts(buyerId, productCategoryId);
  };

/*
xs= 0-767 pixels.
sm = 768-991 pixels.
md = 992-1199 pixels.
lg = 1200 pixels and up
*/

  return (
    <>
      {compostCategories.map((compostCategory) => {
        /* Each column element on the large screens (lg) will ocupy 2 positions in a total of 12 available on the grid system, (md) will ocupy 3 positions and small devices 6 positions*/
        return (
          <Col lg={2} md={3} sm={6} style={{ borderBlock: 'black' }}>
            <Stack gap={1} className="col-lg-5 mx-auto">
              <div className="mx-auto" style={{cursor: 'pointer', width: '72px'}} onClick={(event) =>
                    handleCategoryClick(event as any, compostCategory.eventNumber)}>
                <Image src={compostCategory.pic} roundedCircle/>
              </div>
            </Stack>
            <Stack className="col-md-12 mx-auto">
              <h5 style={{textAlign: 'center'}}>{compostCategory.title}</h5>
            </Stack>
          </Col>
          // <Card style={{ width: '14rem' }}>
          //   {/* <Card.Img src={compostCategory.pic}/> */}
          //   <Card.Body>
          //     <Card.Title>{compostCategory.title}</Card.Title>
          //     <Card.Text>Some description here</Card.Text>
          //   </Card.Body>
          // </Card>
        );
      })}
    </>
  );
};
