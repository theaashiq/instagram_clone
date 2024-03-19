import React  from 'react'
import { Avatar } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import "swiper/css/navigation";
import "swiper/css";
import './story.css'
import storydata from './dataStory';
//import Carousel from 'react-grid-carousel';

const Story = () => {
  return (
    <div className='story-container'>
      <div className='stories' style={{width: 500}}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={6}
            spaceBetween={1} >
            
            {storydata.map((data) => (
            <SwiperSlide>
              <div key={data.id} className='story'>
                <div className='border-gradient'>
                  <div className='avatar'><Avatar src={data.profile} sx={{ width: 54, height: 54 }}/></div></div>
                <center><p>{data.username}</p></center>
              </div>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </div>   
  )}
export default Story
