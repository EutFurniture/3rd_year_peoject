import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
function Caresoul() {
  return(
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      width="80%"
      height={600}
      src="../../images/h3.jpeg"
      alt="First slide"
    />
    <Carousel.Caption>
    <h2>Low Prices and Best Quality</h2>
      <p style ={{fontSize:'20px'}}>Exceptional Designs for your Exception Ideas</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      width={900}
      height={600}
      src="../../images/sofa5.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h2>Low Prices and Best Quality</h2>
      <p style ={{fontSize:'20px'}}>Decorate your Life with Arts</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 "
      width="80%"
      height={600}
      src="../../images/h14.jpeg"
      alt="Third slide"
    />

    <Carousel.Caption>
    <h2>Low Prices and Best Quality</h2>
      <p style ={{fontSize:'20px'}}>Converting Home into a Better Place to Live</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}
export default Caresoul;