import React, { Component } from 'react';
import Carousel from 'react-grid-carousel';


export default class Gallery extends Component {
    render() {
        return (
            <div className="gallery">
                <Carousel cols={1} rows={1} gap={10} loop autoplay={3000} hideArrow={true} showDots={true}>
                    <Carousel.Item>
                        <div className="gallery__photo">
                            <img alt="store" width="100%" src="/images/gallery1.jpg" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="gallery__photo">
                            <img alt="store" width="100%" src="/images/gallery2.jpg" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="gallery__photo">
                            <img alt="store" width="100%" src="/images/gallery3.jpg" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="gallery__photo">
                            <img alt="store" width="100%" src="/images/gallery4.jpg" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="gallery__photo">
                            <img alt="store" width="100%" src="/images/gallery5.jpg" />
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
          )
    }
}

