import React, { useState } from "react"
import { useAtomValue } from "jotai"
import { textsAtom, categoriesAtom } from "../../states/jotai"
import CategoryAdmin from "../../components/CategoryAdmin"
import { Col } from "reactstrap"
// import { backendAxiosClient } from "../../utility/apiClients"

const AdminProducts = () => {
    const categories = useAtomValue(categoriesAtom)
    // backendAxiosClient.get("category").then(res => console.log(res.data))
    const texts = useAtomValue(textsAtom);
    // const [openedCategories, setOpenedCategories] = 
    useState([])
    return (
        <Col className='w-100 h-100 m-0 p-0'> 
            <div>{texts.products}</div>
            {categories.Category.map(elem => {
               return <CategoryAdmin category={elem}/>
            })}
        </Col>
    )
}

export default AdminProducts