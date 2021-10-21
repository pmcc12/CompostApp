import { useEffect, useState } from 'react';
import '../css/Home.css'
import { Container, Button, Stack, Row, Col, Image, Card, Fade } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import HomeCardComponent from '../components/HomeCardComponent';
import BackgroundImg from '../assets/backgroundHome.jpg'


type Props = {
  authorization: boolean;
};

const Home: React.FC<Props> = ({ authorization }) => {
  let history = useHistory();
  const [open, setOpen] = useState(false)

  const myState = useSelector((state: myReducersTypeof) => state.login);

  useEffect(() => {
    setOpen(true)
  }, [])

  if (!authorization) {
    return <Redirect to="login" />;
  }

  return (
    <div className="home-wrapper">
      <Navigation />

      <Container fluid className="home-container">
          <Row className="home-bg-wrapper">
            <Image
              src={BackgroundImg}
              className="home-img-fluid"
              alt="..."
            />
          </Row>
          <div className="home-card-wrapper">
            <div>
              <Card className="home-card" onClick={()=>history.push("/buy")}>
                <div className="home-card-image-container">
                  <i className="bi bi-bag-fill"></i>
                </div>
                <Card.Body>
                    <Card.Title className="home-card-title" >Buy</Card.Title>
                    <Card.Text className="home-card-text" >
                    Are you up to buy today? Check out our products.
                    </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="home-card" onClick={()=>history.push("/sell")}>
                <div className="home-card-image-container" >
                  <i className="bi bi-cash-coin"></i>                
                </div>
                <Card.Body>
                    <Card.Title className="home-card-title" >Sell</Card.Title>
                    <Card.Text className="home-card-text" >
                    Are you up to sell today? Share now your product!
                    </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="home-card" onClick={()=>history.push("/payments")}>
                <div className="home-card-image-container" >
                  <i className="bi bi-piggy-bank-fill"></i>                
                </div>
                <Card.Body>
                    <Card.Title className="home-card-title" >Payments</Card.Title>
                    <Card.Text className="home-card-text" >
                    Charge your account and start now your shopping!
                    </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="home-card" onClick={()=>history.push("/transactions")}>
                <div className="home-card-image-container" >
                  <i className="bi bi-currency-exchange"></i>
                </div>
                <Card.Body>
                    <Card.Title className="home-card-title" >Transactions</Card.Title>
                    <Card.Text className="home-card-text" >
                    Access your transactions history
                    </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          </Container>

    </div>
  );
};

export default Home;

// return (
//   <div className="home-wrapper" style={{background: 'linear-gradient(0deg, rgba(18,40,15,1) 0%, rgba(34,96,55,1) 18%, rgba(40,122,70,1) 79%);'}}>
//     <Navigation />

//     <Container fluid className="home-container" style={{margin: '0px', padding: '0px', width: '100vw'}}>
//         <Row className="home-bg-wrapper" style={{width:'100vw',height:'80vh', margin:'0px',  position:'relative'}}>
//           <Image
//             src={BackgroundImg}
//             style={{padding: '0px', objectFit: 'cover', width: "100%", height: "100%"}}
//             className="img-fluid"
//             alt="..."
//           />
//         </Row>
//         <div className="home-card-wrapper" style={{display: 'flex', justifyContent:'space-around'}}>
//           <div>
//           <Fade timeout={2000} in={open}>
//             <Card className="home-card" onClick={()=>history.push("/buy")} style={{ width: '15rem', height: '12rem', position:'absolute', bottom:'20px', cursor:'pointer' }}>
//               <div className="home-card-image-container" style={{display: 'flex', justifyContent: 'center'}}>
//                 <i style={{fontSize: '30px'}} className="bi bi-bag-fill"></i>
//               </div>
//               <Card.Body>
//                   <Card.Title className="home-card-title" style={{textAlign: 'center'}}>Buy</Card.Title>
//                   <Card.Text className="home-card-text" style={{textAlign: 'center'}}>
//                   Are you up to buy today? Check out our products.
//                   </Card.Text>
//               </Card.Body>
//             </Card>
//           </Fade>  
//           </div>
//           <div>
//             <Card className="home-card" onClick={()=>history.push("/sell")} style={{ width: '15rem',height: '12rem', position:'absolute', bottom:'20px', cursor:'pointer' }}>
//               <div className="home-card-image-container" style={{display: 'flex', justifyContent: 'center'}}>
//                 <i style={{fontSize: '30px'}} className="bi bi-cash-coin"></i>                
//               </div>
//               <Card.Body>
//                   <Card.Title className="home-card-title" style={{textAlign: 'center'}}>Sell</Card.Title>
//                   <Card.Text className="home-card-text" style={{textAlign: 'center'}}>
//                   Are you up to sell today? Share now your product!
//                   </Card.Text>
//               </Card.Body>
//             </Card>
//           </div>
//           <div>
//             <Card className="home-card" onClick={()=>history.push("/payments")} style={{ width: '15rem',height: '12rem', position:'absolute', bottom:'20px', cursor:'pointer' }}>
//               <div className="home-card-image-container" style={{display: 'flex', justifyContent: 'center'}}>
//                 <i style={{fontSize: "30px"}} className="bi bi-piggy-bank-fill"></i>                
//               </div>
//               <Card.Body>
//                   <Card.Title className="home-card-title" style={{textAlign: 'center'}}>Payments</Card.Title>
//                   <Card.Text className="home-card-text" style={{textAlign: 'center'}}>
//                   Charge your account and start now your shopping!
//                   </Card.Text>
//               </Card.Body>
//             </Card>
//           </div>
//           <div>
//             <Card className="home-card" onClick={()=>history.push("/transactions")} style={{ width: '15rem',height: '12rem', position:'absolute', bottom:'20px', cursor:'pointer' }}>
//               <div className="home-card-image-container" style={{display: 'flex', justifyContent: 'center'}}>
//                 <i style={{fontSize: "30px"}} className="bi bi-currency-exchange"></i>
//               </div>
//               <Card.Body>
//                   <Card.Title className="home-card-title" style={{textAlign: 'center'}}>Transactions</Card.Title>
//                   <Card.Text className="home-card-text" style={{textAlign: 'center'}}>
//                   Access your transactions history
//                   </Card.Text>
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//         </Container>

//   </div>
// );