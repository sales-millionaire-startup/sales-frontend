import React, { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { textsAtom, categoriesAtom, addCategoryModalAtom, currentCategoryAtom, unitsAtom } from "../../states/jotai"
import CategoryAdmin from "../../components/CategoryAdmin"
import AddCategoryModal from "../../components/AddCategoryModal"
import { Col } from "reactstrap"
import { backendAxiosClient } from "../../utility/apiClients"
import EditCategoryModal from "../../components/EditCategoryModal"
import DeleteCategoryModal from "../../components/DeleteCategoryModal"
import AddProductModal from "../../components/AddProductModal"
import DeleteProductModal from "../../components/DeleteProductModal"
import EditProductModal from "../../components/EditProductModal"

const AdminProducts = () => {
    const [categories, setCategories] = useAtom(categoriesAtom)
    const setUnits = useSetAtom(unitsAtom)
    useEffect(() => {
        backendAxiosClient.get("api/category").then(res => {
            if (res.data) {
                setCategories(res.data)
            }
        })
        backendAxiosClient.get("api/unit-element").then(res => {
            if (res.data) {
                setUnits(res.data)
            }
        })
    }, [setCategories, setUnits])
    const texts = useAtomValue(textsAtom);
    const setIsAddCategoryModalOpen = useSetAtom(addCategoryModalAtom)
    const setCurrentCategory = useSetAtom(currentCategoryAtom)
    return (
        <Col className='w-100 h-100 m-0 p-0'> 
            <h4>{texts.products}</h4>
            {categories?.map(elem => {
               return <CategoryAdmin category={elem} key={elem.id}/>
            })}
            <div className="category mt-1">
                <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
                    <h6 className="cursor-pointer m-0 p-0" onClick={() => {
                        setCurrentCategory({})
                        setIsAddCategoryModalOpen(true)
                    }}>{texts.addCategory}</h6>
                </div>
            </div>
            <AddCategoryModal />
            <EditCategoryModal />
            <DeleteCategoryModal />
            <AddProductModal />
            <EditProductModal />
            <DeleteProductModal />
        </Col>
    )
}

export default AdminProducts