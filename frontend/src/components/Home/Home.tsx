import React from 'react';

import { Carousel } from 'antd';

import Timer from './Timer/Timer';

import Brand1 from '../../assets/brand-1.webp';
import Brand2 from '../../assets/brand-2.webp';
import Brand3 from '../../assets/brand-3.webp';
import Brand4 from '../../assets/brand-4.webp';
import Brand5 from '../../assets/brand-5.webp';
import Brand6 from '../../assets/brand-6.webp';

import Discount from '../../assets/main-bg-2.jpg';

import Serve1 from '../../assets/image-serv-1.webp';
import Serve2 from '../../assets/image-serv-2.webp';
import Serve3 from '../../assets/image-serv-3.webp';

import Slide from './Slide/Slide';

import './Home.css';
import Category from './Category/Category';
import Product from './Product/Product';

import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

import { MouseEventHandler } from 'react';

interface Brand {
    src: string;
    alt: string;
}

interface ArrowProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
}

class Home extends React.Component {
    private brands: Brand[] = [
        { src: Brand1, alt: "Brand1" },
        { src: Brand2, alt: "Brand2" },
        { src: Brand3, alt: "Brand3" },
        { src: Brand4, alt: "Brand4" },
        { src: Brand5, alt: "Brand5" },
        { src: Brand6, alt: "Brand6" }
    ];

    private NextArrow = ({ onClick }: ArrowProps) => (
        <div className="carousel-arrow next-arrow" onClick={onClick}>
            <GoArrowRight />
        </div>
    );

    private PrevArrow = ({ onClick }: ArrowProps) => (
        <div className="carousel-arrow prev-arrow" onClick={onClick}>
            <GoArrowLeft />
        </div>
    );

    render(): JSX.Element {
        return (
            <div>
                <Carousel arrows infinite={false}>
                    <div>
                        <Slide slide="../../../assets/slide-2.jpg" title="20%" description="Discount" subtitle="And free shipping" />
                    </div>
                    <div>
                        <Slide slide="../../../assets/slide-1.jpg" title="SPORT" description="NUTRITION" subtitle="AND WORKOUT SUPPORT" />
                    </div>
                    <div>
                        <Slide slide="../../../assets/slide-3.png" title="PROTEIN" description="MUSCLE FUEL" subtitle="" />
                    </div>
                </Carousel>
                <div className='container'>
                    <h3 className='text-title2 text-center mb-5 mt-5'>SHOP TOP CATEGORIES</h3>
                    <div className="d-flex mb-5">
                        <Category
                            categoryImage="../../../assets/sport-box-1.png"
                            categoryTitle="BUILD MUSCLE"
                            categoriesSubTitle={["Intra-Workouts", "Pre-Workouts", "Muscle Building Stacks", "Creatine", "Post-Workouts", "Protein", "Amino Acids", "Glutamine"]}
                        />
                        <Category
                            categoryImage="../../../assets/sport-box-2.png"
                            categoryTitle="INCREASE ENERGY"
                            categoriesSubTitle={["Herbal Energy Enhancers", "Energy Shots", "Energy Chews", "Energy Gels", "Energy Drinks", "Pre-Workout Supplements", "Non-Stimulant Energy", "Caffeine / Stimulants"]}
                        />
                        <Category
                            categoryImage="../../../assets/sport-box-3.png"
                            categoryTitle="IMPROVE WORKOUT"
                            categoriesSubTitle={["Post-Workout Recovery", "Pre-Workout Supplements", "Creatine", "Creatine"]}
                        />
                        <Category
                            categoryImage="../../../assets/sport-box-4.png"
                            categoryTitle="LOSE FAT"
                            categoriesSubTitle={["Pre-Workout Supplements", "Creatine", "Creatine", "Creatine"]}
                        />
                    </div>
                </div>
                <div style={{ backgroundImage: `url(${Discount})`, width: '100%', minHeight: '620px', paddingBottom: '25px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className='container text-center'>
                        <h1 className='text-title mb-3 pt-5'>DEALS OF THE DAY</h1>
                        <h3 className='text-subtitle'>MUSCLE BUILDING WHEY PROTEIN POWDER</h3>
                        <Timer initialDays={0} initialHours={20} initialMinutes={0} initialSeconds={0} />
                        <Carousel arrows infinite={false}
                            prevArrow={<this.PrevArrow />}
                            nextArrow={<this.NextArrow />}>
                            <div className='d-flex justify-content-center mt-5 mb-5'>
                                <Product width='425px' padding='60px' border={true}  alt='Whey Protein' image='../../../assets/day1.webp' title='Pulse-Pre-Workout' description="31g of Whey Protein with Amino. Whey Protein Blends combines multiple..." price='44.00' />
                                <Product width='425px' padding='60px' border={true}  alt="Whey Protein 2" image='../../../assets/day2.webp' title='INSTANT-OATS-POWDER' description="27g of Whey Protein with Amino. Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout." price='54.00' />
                                <Product width='425px' padding='60px' border={true}  alt="Whey Protein 3" image='../../../assets/day3.webp' title='MASS-TECH-PERFORMANCE' description="Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout. Our nutrition store offers great choice of different nutrition supplements." price='21.00 – $43.00' />
                            </div>
                            <div>
                                <Product width='425px' padding='60px' border={true}  alt='Whey Protein 4' image='../../../assets/day4.webp' title='MUSCLEPHARM CORE FISH OIL' description="Whey Protein Blends combines multiple source of protein to support lean muscle! Great for anytime of the day – especially post-workout." price='15.00 – $43.00' />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className='container'>
                    <h3 className='text-title2 text-center mb-5 mt-5'>TOP BRANDS</h3>
                    <div className="row align-items-center mb-5">
                        {this.brands.map((brand, index) => (
                            <div className="col brand-column" key={index}>
                                <img src={brand.src} alt={brand.alt} />
                            </div>
                        ))}
                    </div>
                    <div className='d-flex justify-content-between mb-5 w-100'>
                        <div className='d-flex p-5 flex-grow-1' style={{ backgroundColor: '#0185ce' }}>
                            <img src={Serve1} alt="Serve1" style={{ height: 50 + '%' }} />
                            <div className="ms-2">
                                <h1 className="text-white text-uppercase font-weight-bold mb-24" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '16px', letterSpacing: '0.7px' }}>MONEY BACK GUARANTEE</h1>
                                <h3 className="text-white" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '15px', letterSpacing: '0.7px' }}>Returns & Exchanges</h3>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1' style={{ backgroundColor: '#ffffff', borderColor: '#e7e8e9', borderWidth: '1px', borderStyle: 'solid', marginLeft: '20px', marginRight: '20px' }}>
                            <img src={Serve2} alt="Serve2" style={{ height: 50 + '%' }} />
                            <div className="ms-2">
                                <h1 className="text-uppercase font-weight-bold mb-24" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '16px', letterSpacing: '0.7px', color: '#171a25' }}>FREE SHIPPING</h1>
                                <h3 style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '15px', letterSpacing: '0.7px', color: '#757b91' }}>On orders over $99. <br />This offer is valid on all our store items.</h3>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1' style={{ backgroundColor: '#171a25' }}>
                            <img src={Serve3} alt="Serve3" style={{ height: 50 + '%' }} />
                            <div className="ms-2">
                                <h1 className="text-white text-uppercase font-weight-bold mb-24" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '16px', letterSpacing: '0.7px', color: '#171a25' }}>3800-2345-6789</h1>
                                <h3 style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '15px', letterSpacing: '0.7px', color: '#757b91' }}>Customer Support
                                    <br />Days a week from 9:00 am to 7:00 pm</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;