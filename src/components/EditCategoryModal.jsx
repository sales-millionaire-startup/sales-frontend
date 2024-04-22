import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { categoriesAtom, editCategoryModalAtom, currentCategoryAtom, loaderAtom, textsAtom } from "../states/jotai"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const EditCategoryModal = () => {
    const [isOpen, setIsOpen] = useAtom(editCategoryModalAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const currentCategory = useAtomValue(currentCategoryAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const [categoryData, setCategoryData] = useState({...currentCategory})
    const editCategory = (e) => {
        e.preventDefault()
        const parentMostCategoryId = currentCategory.parentMostCategoryId || currentCategory.id
        setLoader(true)
        backendAxiosClient.put(`api/category/${currentCategory.id}`, categoryData).then(res => {
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
    const updateCategoryData = (value, item) => {
        setCategoryData(state => { return {...state, [item]: value}})
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
            <Form onSubmit={editCategory}>
                <FormGroup>
                    <Label for="exampleEmail">
                    {texts.en}
                    </Label>
                    <Input
                    id="name_en"
                    name="name_en"
                    placeholder={texts.category}
                    onChange={e => updateCategoryData(e.target.value, "name_en")}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    {texts.ge}
                    </Label>
                    <Input
                    id="name_ge"
                    name="name_ge"
                    placeholder={texts.category}
                    onChange={e => updateCategoryData(e.target.value, "name_ge")}
                    />
                </FormGroup>
                {/* <Button>
                    Submit
                </Button> */}
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={editCategory}>{texts.add}</Button>
                </Row>
                </Form>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default EditCategoryModal