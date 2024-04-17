import React from "react"
import Product from "./ProductAdmin";
import { useAtom, useAtomValue } from "jotai"
import { openedCategoriesAtom, textsAtom } from "../states/jotai"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const CategoryAdmin = ({ category }) => {
    const [openedCategories, setOpenedCategories] = useAtom(openedCategoriesAtom)
    const texts = useAtomValue(textsAtom)
    const handleCategoryClick = (id) => {
        if (openedCategories.includes(id)) {
            setOpenedCategories(openedCategories.filter(elem => elem !== id))
        } else {
            setOpenedCategories([...openedCategories, id])
        }
    }
    return (
      <div className="category">
        {texts.gela}
        <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
            <h5 className="cursor-pointer m-0 p-0" onClick={() => handleCategoryClick(category.id)}>{category.name}</h5>
            <h5 className="cursor-pointer m-0 p-0">
            <UncontrolledDropdown className="">
                <DropdownToggle className='' style={{backgroundColor: "inherit", border: "none", color: "black"}}>
                    +
                </DropdownToggle>
                <DropdownMenu className='' tag='ul' style={{top: "auto"}}>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            // switchLanguage(elem)
                        }}>კატეგორია</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            // switchLanguage(elem)
                        }}>პროდუქტი</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </h5>
        </div>
        <ul className="mt-0 pt-0 mb-0 pb-0">
            {openedCategories?.includes(category.id) && category.childCategories.map(childCategory => (
                <li key={childCategory.id}>
                    <CategoryAdmin category={childCategory} />
                </li>
            ))}
            {openedCategories?.includes(category.id) && category.products.map(product => (
                // <li key={product.id}>
                    <Product product={product} />
                // </li>
            ))}
        </ul>
      </div>
    );
};

export default CategoryAdmin