import React from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { categoriesAtom, currentCategoryAtom, loaderAtom, textsAtom, deleteCategoryModalAtom } from "../states/jotai"
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const DeleteCategoryModal = () => {
    const [isOpen, setIsOpen] = useAtom(deleteCategoryModalAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const currentCategory = useAtomValue(currentCategoryAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const language = localStorage.getItem("language") || "en"
    const deleteCategory = (e) => {
        e.preventDefault()
        const parentMostCategoryId = currentCategory.parentMostCategoryId || currentCategory.id
        setLoader(true)
        backendAxiosClient.delete(`api/category/${currentCategory.id}`).then(res => {
            if (res.data) {
                setCategories(state => {
                    const tmp = [...state]
                    const index = tmp.findIndex(elem => elem.id === parentMostCategoryId)
                    if (!currentCategory.parentCategoryId) {
                        tmp.splice(index, 1)
                    } else {
                        tmp[index] = res.data
                    }
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
                    <h4 className="d-flex justify-content-center">{texts.deleteWarningText} {currentCategory[`name_${language}`]}?</h4>
                </Row>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2 m-2" color="dark"  onClick={deleteCategory}>{texts.yes}</Button>
                    <Button className="w-fit-content p-2 m-2" color="dark"  onClick={() => setIsOpen(false)}>{texts.no}</Button>
                </Row>
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default DeleteCategoryModal