import React from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArticleCard from '../ArticleCard/ArticleCard'
import Slider from '../Slider/Slider'
import './ArtclesSection.scss'
const ArtclesSection = () => {
    const articleData = [
        {
            articlePicture:'/public/post-1.jpg',
            articleTitle: "نوشیدنی جدید",
            category: ["غذا", "نوشیدنی"],
            articleDescription: "این غذا بسیار خوشمزه و لذیذ است و می‌تواند تجربه‌ای لذت‌بخش برای شما باشد."
        },
        {
            articlePicture:'/public/post-3.jpg',
            articleTitle: "غذای خوشمزه",
            category: ["غذا"],
            articleDescription: "این غذا بسیار خوشمزه و لذیذ است و می‌تواند تجربه‌ای لذت‌بخش برای شما باشد."
        },
        {
            articlePicture:'/public/post-2.jpg',
            articleTitle: "دسر شیرین",
            category: ["غذا", "دسر"],
            articleDescription: "دسر شیرین و خوشمزه‌ای که می‌تواند به عنوان پایانی خوب برای هر وعده غذایی باشد."
        }
    ];
    return (
        <div className='articlesWrapper'>
            <div className="container">
                <SectionHeader title="پست های اخیر" />
                <div className="ArticleRow">
                    <Slider
                        Array={articleData}
                        Card={ArticleCard}
                        spaceBetween={20}
                        sizeInfoArray={[
                            { size: 600, slidesPerview: 1 },
                            { size: 990, slidesPerview: 2 },
                            { size: 4000, slidesPerview: 3 }
                        ]}
                        paginationMode
                    />

                </div>
            </div>
        </div>
    )
}

export default ArtclesSection