import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import FruitIcon2 from '../../Icons/FruitIcon2'
import './WhyUs.scss'
const WhyUs = () => {
    return (
        <div className="whyChooseUsWrapper">
            <div className='container'>
                <SectionHeader title="چرا محصولات ما؟" />
                <div className="whyUsRow">
                    <div className="left-side">
                        <div className="whyusInfo">
                            <div className="info-icon">
                                <FruitIcon2 />
                            </div>
                            <div className="infoTitle">
                                <h3>همیشه تازه</h3>
                            </div>
                            <div className="info-description">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                </p>
                            </div>
                        </div>
                        <div className="whyusInfo">
                            <div className="info-icon">
                                <FruitIcon2 />
                            </div>
                            <div className="infoTitle">
                                <h3>همیشه تازه</h3>
                            </div>
                            <div className="info-description">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="middle-side">
                        <img src="./farmer.png" alt="" />
                    </div>
                    <div className="right-side">
                        <div className="whyusInfo">
                            <div className="info-icon">
                                <FruitIcon2 />
                            </div>
                            <div className="infoTitle">
                                <h3>همیشه تازه</h3>
                            </div>
                            <div className="info-description">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                </p>
                            </div>
                        </div>
                        <div className="whyusInfo">
                            <div className="info-icon">
                                <FruitIcon2 />
                            </div>
                            <div className="infoTitle">
                                <h3>همیشه تازه</h3>
                            </div>
                            <div className="info-description">
                                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyUs