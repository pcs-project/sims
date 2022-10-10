import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SliderImage from '../../scafolding/assets/images/slider.png';
import { Image } from "primereact/image";

function landingPage(){
  return(
            <Carousel>
                <div>
                <Image src={SliderImage}  />
                    
                </div>
                <div>
                <Image src={SliderImage}  />
                  
                </div>
                <div>
                <Image src={SliderImage}  />
                   
                </div>
            </Carousel>
          );
        }
        
export default landingPage;