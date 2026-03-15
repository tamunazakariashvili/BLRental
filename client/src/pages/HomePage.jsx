import React from 'react';
import { useEffect, useState, useRef } from "react";
import '../styles/KeyFrames.css'
import Footer from '../components/Footer';

import SliderData from '../components/HeroSlider';
import About from '../components/AboutCard';
import Services from '../components/Services';
import Fleets from '../components/Fleets';
import Categories from '../components/Categories';
import Work from '../components/Work';


const Home = () => {
    
    return (
        <main className='flex flex-col relative items-center  '>

            {/* section1 */}
            <SliderData />
            {/* section2 */}
            <About />
            {/* section 3 */}
            <Services />
            {/* section 4  */}
            <Fleets />

            {/* section 5 */}
            <Categories />

            {/* section 6 */}
            <Work />

            {/* section 7 */}
           

            {/* footer */}
            <Footer />
            

        </main>
    );
};
export default Home;
