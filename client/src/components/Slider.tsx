import React from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import CardBox from '../assets/cardbox.jpeg'
import DryLeaves from '../assets/dryleaves.jpg'
import woodShavings from '../assets/woodShavings.jpeg'

function Slider() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex:number, e: any) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
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
      </Carousel>
    );
  }

  export default Slider;