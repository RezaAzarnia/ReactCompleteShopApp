import React from 'react'
import './ArticleCard.scss'
const ArticleCard = ({ articlePicture, articleTitle, articleDescription }) => {

    return (
        <div className='ArticleCard'>
            <div className="ArticleImage">
                <img src={articlePicture} alt="" />
            </div>
            <div className="ArticleBody">
                <div className="articleCategory">
                    <span>غذا</span>
                    ,
                    <span>نوشیدنی</span>
                </div>
                <div className="articleTitle">
                    <h3>
                        {articleTitle}
                    </h3>
                </div>
                <div className="articleDescription">
                    <span>
                        {articleDescription}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard