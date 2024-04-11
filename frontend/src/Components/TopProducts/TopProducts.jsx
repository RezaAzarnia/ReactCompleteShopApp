import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import TabpaneButton from '../TabpaneButton/TabpaneButton';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import MilkIcon from '../../Icons/MilkIcon'
import MeatIcon from '../../Icons/MeatIcon';
import CofeeCupIcon from '../../Icons/CofeeCupIcon';
import VegtavleIcon from '../../Icons/VegtavleIcon';
import FruitIcon from '../../Icons/FruitIcon';
import NutsIcon from '../../Icons/NutsIcon';
import './TopProducts.scss';

const TopProducts = () => {

    const products = useSelector((state) => state.products.products);

    const iscons = [
        { categoryName: 'میوه', icon: <FruitIcon /> },
        { categoryName: 'سبزیجات', icon: <VegtavleIcon /> },
        { categoryName: 'آجیل', icon: <NutsIcon /> },
        { categoryName: 'گوشت و ماهی', icon: <MeatIcon /> },
        { categoryName: 'قهوه', icon: <CofeeCupIcon /> },
        { categoryName: 'شیر و خامه', icon: <MilkIcon /> },
    ]

    const categories = useMemo(() => {
        const pureCategories = [...new Set(products?.map(item => item.category))]
        const categoriesObject = pureCategories.map(item => {
            return {
                title: item,
                icon: iscons.find(ic => ic.categoryName == item)?.icon
            }
        })
        return categoriesObject
    }, [products]);

    const [activeCategory, setActiveCategory] = useState(categories[0].title);

    const filteredProducts = useMemo(() => {
        return products?.filter(product => product.category === activeCategory.title)
    }, [products, activeCategory]);

    useEffect(() => {
        setActiveCategory(categories[0]);
    }, [categories]);

    const CreateTabPaneButtons = useCallback(() => {
        return categories.map((category, index) => {
            return <TabpaneButton
                title={category.title}
                icon={category.icon && category.icon}
                key={index + 1}
                onClick={() => setActiveCategory(category)}
                active={category.title === activeCategory.title}
            />
        })
    }, [activeCategory])
    return (
        <>
            {products.length > 0 && (
                <div className='container'>
                    <div className="TopProductsWrapper">
                        <SectionHeader title="محصولات برتر" />
                        <div className="tabpane-wrapper">
                            <div className="tabPane-row">
                                <CreateTabPaneButtons />
                            </div>
                        </div>
                        {filteredProducts.length > 0 && (
                            <div className="TopProductsCardsWrraper">
                                {filteredProducts.slice(0, 4).map(product => (
                                    <ProductCard {...product} key={product.id} />
                                ))}
                            </div>
                        )}
                        {filteredProducts.length > 4 && (
                            <div className="seeAll-button">
                                <Button to={`/shop/${filteredProducts[0].category}`} title='مشاهده همه' />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(TopProducts);
