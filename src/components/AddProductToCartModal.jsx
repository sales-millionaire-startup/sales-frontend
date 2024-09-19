import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { addProductModalAtom, cartAtom, currentProductAtom, loaderAtom, textsAtom, userAtom } from "../states/jotai"
import { Button, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const AddProductToCartModal = () => {
    const [isOpen, setIsOpen] = useAtom(addProductModalAtom)
    const [cart, setCart] = useAtom(cartAtom)
    const currentProduct = useAtomValue(currentProductAtom)
    const texts = useAtomValue(textsAtom)
    const user = useAtomValue(userAtom)
    const setLoader = useSetAtom(loaderAtom)
    const language = localStorage.getItem("language") || "ge"
    const [specificationValues, setSpecificationValues] = useState({})
  
    const addProduct = (e) => {
        e.preventDefault()
        const payload = {productId: currentProduct.id, specifications: Object.keys(specificationValues).map(key => { return { specificationId: key, value: specificationValues[key] }})}
        setLoader(true)
        console.log(payload)
        if (user.cart) {
            backendAxiosClient.post(`api/cart/${user.cart.id}`, payload).then(res => {
                if (res.data) {
                    setCart([...cart, {...res.data}])
                }
            }).finally(() => setLoader(false))
        }
        setIsOpen(false)
    }
    

    return (
    <Modal 
        isOpen={isOpen}
        backdrop={true}
        toggle={() => setIsOpen(!isOpen)}
        className='modal-dialog-centered modal-w-75'
    >
        <ModalHeader toggle={() => setIsOpen(!isOpen)}/>  
        <ModalBody className="d-flex justify-content-center">
            <Col>
                <Row className="m-0 mt-2 mb-5 p-0">
                    <h5 className="d-flex justify-content-center m-0 p-0">{currentProduct[`name_${language}`]}</h5>
                </Row>
                {currentProduct?.imageUrl &&
                <Row className="d-flex justify-content-center m-5">
                    <img src={currentProduct.imageUrl} style={{width: "200px"}} alt="Product"/>
                </Row>
                }
                {currentProduct?.specifications?.map((elem, index) => {
                    return (
                        <Row key={index} className="mt-2 mb-2">
                            <Col className="col-3 d-flex align-middle">
                                <h5 className="m-0 p-0 d-flex align-items-center">
                                    {elem[`name_${language}`] || elem.name_ge}
                                </h5>
                            </Col>
                            <Col className="col-3 d-flex align-middle">
                                <Input
                                    id={`name_${language}`}
                                    name={`name_${language}`}
                                    placeholder={elem[`name_${language}`] || elem.name_ge}
                                    onChange={e => setSpecificationValues({...specificationValues, [elem.id] : e.target.value})}
                                />
                            </Col>
                            <Col className="col-3 d-flex align-middle">
                                <h5 className="m-0 p-0 d-flex align-items-center">
                                    {elem.unitElement[`name_${language}`] || elem.unitElement.name_ge}
                                </h5>
                            </Col>
                        </Row>
                    )
                })}
                <Row className='justify-content-center mt-2'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={addProduct}>{texts.addToCart}</Button>
                </Row>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default AddProductToCartModal