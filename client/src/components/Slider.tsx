import React from "react";
import { Carousel } from "react-bootstrap";
import { useState, useRef } from "react";
import CardBox from '../assets/cardbox.jpeg'
import DryLeaves from '../assets/dryleaves.jpg'
import woodShavings from '../assets/woodShavings.jpeg'
import { type } from "os";

type Props = {
  setOfferByIndex: React.Dispatch<React.SetStateAction<any>>,
  offerAmount: number
}

/*
->preciso de saber o tamanho do array: numero (para fazer mapping dos items do carrousel)
->preciso do setIndex para alterar o indice do item disponibilizado
->preciso de controlar
*/
const Slider: React.FC<Props> = ({setOfferByIndex, offerAmount}) => {
    const [index, setIndex] = useState(0);

    //create a dummy array just for rendering
    let myDummyArray = [...Array(offerAmount)]

    console.log(myDummyArray);

    const handleSelect = (selectedIndex:number, e: any) => {
      setIndex(selectedIndex);
      setOfferByIndex(selectedIndex);
    };
  // doctorsGeoJSON.features.map((feature) => (
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        
        {myDummyArray.map((item, index) => (
          index % 3 === 0 ? 
          (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={CardBox}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Card Box</h3>
              <p>Very reliable and clean Card box</p>
            </Carousel.Caption>
          </Carousel.Item>
          ) 
          : 
          ( index % 3 === 1 ? 
            (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={DryLeaves}
                alt="Second slide"
              />
      
              <Carousel.Caption>
                <h3>Dry Leaves</h3>
                <p>Dry Leaves from the Olympus itself prime trees </p>
              </Carousel.Caption>
            </Carousel.Item>
            )
            : 
            (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={woodShavings}
                  alt="Third slide"
                />
        
                <Carousel.Caption>
                  <h3>Wood Shaving</h3>
                  <p>From the most rare wood ever</p>
                </Carousel.Caption>
              </Carousel.Item>
  
            )
          )
        ))
        
        }
      </Carousel>
    );
  }

  export default Slider;