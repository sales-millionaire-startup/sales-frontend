import React from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { categoriesAtom, addCategoryModalAtom, currentCategoryAtom, loaderAtom, openedCategoriesAtom, textsAtom, editCategoryModalAtom, deleteCategoryModalAtom, addProductModalAtom } from "../states/jotai"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";
import { MdAdd, MdDeleteOutline, MdOutlineEdit, MdSettings } from "react-icons/md";
import ProductAdmin from "./ProductAdmin";

const CategoryAdmin = ({ category }) => {
    const [openedCategories, setOpenedCategories] = useAtom(openedCategoriesAtom)
    const texts = useAtomValue(textsAtom)
    const setCurrentCategory = useSetAtom(currentCategoryAtom)
    const setIsAddCategoryModalOpen = useSetAtom(addCategoryModalAtom)
    const setIsAddProductModalOpen = useSetAtom(addProductModalAtom)
    const setIsEditCategoryModalOpen = useSetAtom(editCategoryModalAtom)
    const setIsDeleteCategoryModalOpen = useSetAtom(deleteCategoryModalAtom)
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
      <div className="category" key={category.id}>
        <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
            <h5 className="cursor-pointer m-0 p-0" onClick={() => handleCategoryClick(category.id)}>{category[`name_${language}`] || category.name_ge}</h5>
            <h5 className="cursor-pointer m-0 p-0">
            <UncontrolledDropdown className="m-0 p-0">
                <DropdownToggle className='' style={{backgroundColor: "inherit", border: "none", color: "black"}} onClick={() => setCurrentCategory(category)}>
                    <MdSettings />
                </DropdownToggle>
                <DropdownMenu className='' tag='ul' style={{top: "auto"}}>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsAddCategoryModalOpen(true)
                        }}><MdAdd />{texts.category}</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsEditCategoryModalOpen(true)
                        }}><MdOutlineEdit />{texts.category}</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsDeleteCategoryModalOpen(true)
                        }}><MdDeleteOutline />{texts.category}</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsAddProductModalOpen(true)
                        }}><MdAdd />{texts.product}</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </h5>
        </div>
        <ul className="mt-0 pt-0 mb-0 pb-0">
            {openedCategories?.includes(category.id) && category.childCategories?.map(childCategory => (
                <li key={childCategory.id}>
                    <CategoryAdmin category={childCategory} />
                </li>
            ))}
            {openedCategories?.includes(category.id) && category.products?.map(product => <ProductAdmin product={product} />)}
        </ul>
      </div>
    );
};

export default CategoryAdmin