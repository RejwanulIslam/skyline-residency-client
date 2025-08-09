import Carousel, { CarouselItem } from "./Carousel";

export default function AutoCarousel() {
    const Slide = ({ number,url }) => (
        <div>
            <img src={url} />
        </div>
    );
    return (
        <Carousel>
            <CarouselItem>
               <Slide number={1}
               url="https://i.ibb.co.com/HLvzHzVP/Lucid-Origin-A-modern-residential-apartment-building-with-a-sl-3.jpg"
               ></Slide> 
            </CarouselItem>
            <CarouselItem>
               <Slide number={2}
               url="https://i.ibb.co.com/pYZ2Qg3/Lucid-Origin-A-modern-residential-apartment-building-with-a-sl-2.jpg"
               ></Slide> 
            </CarouselItem>
            <CarouselItem>
               <Slide number={3}
               url="https://i.ibb.co.com/23D80fQy/Lucid-Origin-A-modern-residential-apartment-building-with-a-sl-1.jpg"></Slide> 
            </CarouselItem>
            <CarouselItem>
               <Slide number={4}
               url="https://i.ibb.co.com/xS721VG9/Lucid-Origin-A-modern-residential-apartment-building-with-a-sl-0.jpg"></Slide> 
            </CarouselItem>
        </Carousel>
    )
}
