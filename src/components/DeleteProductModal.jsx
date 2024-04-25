import React from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { categoriesAtom, currentCategoryAtom, loaderAtom, textsAtom, deleteProductModalAtom, currentProductAtom } from "../states/jotai"
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const DeleteProductModal = () => {
    const [isOpen, setIsOpen] = useAtom(deleteProductModalAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const currentCategory = useAtomValue(currentCategoryAtom)
    const currentProduct = useAtomValue(currentProductAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const language = localStorage.getItem("language") || "ge"
    const deleteProduct = (e) => {
        e.preventDefault()
        const parentMostCategoryId = currentCategory.parentMostCategoryId || currentCategory.id
        setLoader(true)
        backendAxiosClient.delete(`api/product/${currentProduct.id}`).then(res => {
            if (res.data) {
                setCategories(state => {
                    const tmp = [...state]
                    const index = tmp.findIndex(elem => elem.id === parentMostCategoryId)
                    tmp[index] = res.data
                    return tmp
                })
            }
        }).finally(() => setLoader(false))
        setIsOpen(false)
    }

    return (
    <Modal 
        isOpen={isOpen}
        backdrop={true}
        toggle={() => setIsOpen(!isOpen)}
        className='modal-dialog-centered'
    >
        <ModalHeader toggle={() => setIsOpen(!isOpen)}/>  
        <ModalBody className="d-flex justify-content-center">
            <Col>
                <Row className="justify-content-center">
                    <h4 className="d-flex justify-content-center">{texts.deleteWarningText} {currentProduct[`name_${language}`] || currentProduct.name_ge}?</h4>
                </Row>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2 m-2" color="dark"  onClick={deleteProduct}>{texts.yes}</Button>
                    <Button className="w-fit-content p-2 m-2" color="dark"  onClick={() => setIsOpen(false)}>{texts.no}</Button>
                </Row>
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default DeleteProductModal