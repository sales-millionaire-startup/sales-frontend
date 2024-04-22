import React, { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { textsAtom, categoriesAtom, addCategoryModalAtom, currentCategoryAtom } from "../../states/jotai"
import CategoryAdmin from "../../components/CategoryAdmin"
import AddCategoryModal from "../../components/AddCategoryModal"
import { Col } from "reactstrap"
import { backendAxiosClient } from "../../utility/apiClients"
import EditCategoryModal from "../../components/EditCategoryModal"
import DeleteCategoryModal from "../../components/DeleteCategoryModal"

const AdminProducts = () => {
    const [categories, setCategories] = useAtom(categoriesAtom)
    useEffect(() => {
        backendAxiosClient.get("api/category").then(res => {
            if (res.data) {
                setCategories(res.data)
            }
        })
    }, [setCategories])
    const texts = useAtomValue(textsAtom);
    const setIsAddCategoryModalOpen = useSetAtom(addCategoryModalAtom)
    const setCurrentCategory = useSetAtom(currentCategoryAtom)
    return (
        <Col className='w-100 h-100 m-0 p-0'> 
            <div>{texts.products}</div>
            {categories?.map(elem => {
               return <CategoryAdmin category={elem} key={elem.id}/>
            })}
            <div className="category mt-1">
                <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
                    <h5 className="cursor-pointer m-0 p-0" onClick={() => {
                        setCurrentCategory({})
                        setIsAddCategoryModalOpen(true)
                    }}>კატეგორიის დამატება</h5>
                </div>
            </div>
            <AddCategoryModal />
            <EditCategoryModal />
            <DeleteCategoryModal />
        </Col>
    )
}

export default AdminProducts