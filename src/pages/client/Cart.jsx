import React from "react"
import { useAtomValue } from "jotai"
import { textsAtom, userAtom } from "../../states/jotai"
import { Col } from "reactstrap"
import AddProductToCartModal from "../../components/AddProductToCartModal"
import ProductCart from "../../components/ProductCart"

const Cart = () => {
    const user = useAtomValue(userAtom)
    const texts = useAtomValue(textsAtom);
    return (
        <Col className='w-100 h-100 m-0 p-0'> 
            <h4>{texts.cart}</h4>
            {user?.cart?.cartItems?.map(elem => {
               return <ProductCart product={elem} key={elem.id}/>
            })}
            <AddProductToCartModal />
        </Col>
    )
}

export default Cart