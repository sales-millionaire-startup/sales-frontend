import React, { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { textsAtom, categoriesAtom, unitsAtom } from "../../states/jotai"
import { Col } from "reactstrap"
import { backendAxiosClient } from "../../utility/apiClients"
import CategoryClient from "../../components/CategoryClient"
import AddProductToCartModal from "../../components/AddProductToCartModal"

const ClientProducts = () => {
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
    return (
        <Col className='w-100 h-100 m-0 p-0'> 
            <h4>{texts.products}</h4>
            {categories?.map(elem => {
               return <CategoryClient category={elem} key={elem.id}/>
            })}
            <AddProductToCartModal />
        </Col>
    )
}

export default ClientProducts