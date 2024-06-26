import React from "react"
import { useAtom, useSetAtom } from "jotai"
import { categoriesAtom, currentCategoryAtom, loaderAtom, openedCategoriesAtom } from "../states/jotai"
import { backendAxiosClient } from "../utility/apiClients";
import ProductClient from "./ProductClient";

const CategoryClient = ({ category }) => {
    const [openedCategories, setOpenedCategories] = useAtom(openedCategoriesAtom)
    const setCurrentCategory = useSetAtom(currentCategoryAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const language = localStorage.getItem("language") || "ge"
    const setLoader = useSetAtom(loaderAtom)
    const handleCategoryClick = (id) => {
        if (openedCategories.includes(id)) {
            setOpenedCategories(openedCategories.filter(elem => elem !== id))
        } else {
            if (!category.parentCategoryId && !category.childCategories) {
                setLoader(true)
                backendAxiosClient.get(`api/category/${category.id}?depth=${category.maxDepth}`).then(res => {
                    if (res.data) {
                        setCategories(state => {
                            const tmp = [...state]
                            const index = tmp.findIndex(elem => elem.id === category.id)
                            tmp[index] = res.data
                            return tmp
                        })
                    }
                    setOpenedCategories([...openedCategories, id])
                }).finally(() => setLoader(false))
            } else {
                setOpenedCategories([...openedCategories, id])
            }
        }
    }
    return (
      <div className="category mt-3" key={category.id}>
        <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center" onClick={() => setCurrentCategory(category)}>
            <h5 className="cursor-pointer m-0 p-0" onClick={() => handleCategoryClick(category.id)}>{category[`name_${language}`] || category.name_ge}</h5>
        </div>
        <ul className="mt-0 pt-0 mb-0 pb-0">
            {openedCategories?.includes(category.id) && category.childCategories?.map(childCategory => (
                <li key={childCategory.id}>
                    <CategoryClient category={childCategory} />
                </li>
            ))}
            {openedCategories?.includes(category.id) && category.products?.map(product => <ProductClient product={product} key={product?.id}/>)}
        </ul>
      </div>
    );
};

export default CategoryClient