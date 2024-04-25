import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { addCategoryModalAtom, categoriesAtom, currentCategoryAtom, loaderAtom, textsAtom } from "../states/jotai"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const AddCategoryModal = () => {
    const [isOpen, setIsOpen] = useAtom(addCategoryModalAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const currentCategory = useAtomValue(currentCategoryAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const [categoryData, setCategoryData] = useState({})
    const language = localStorage.getItem("language") || "ge"
    const addCategory = (e) => {
        e.preventDefault()
        const parentMostCategoryId = currentCategory.parentMostCategoryId || currentCategory.id
        const payload = {...categoryData, depth: (currentCategory.depth + 1) || 0, parentCategoryId: currentCategory.id, parentMostCategoryId}
        setLoader(true)
        backendAxiosClient.post("api/category", payload).then(res => {
            if (res.data) {
                setCategories(state => {
                    const tmp = [...state]
                    const index = tmp.findIndex(elem => elem.id === parentMostCategoryId)
                    if (parentMostCategoryId) {
                        tmp[index] = res.data
                        return tmp
                    } else {
                        return [...tmp, {...res.data}]
                    }
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
            <Form onSubmit={addCategory}>
                <FormGroup>
                    <Label for="exampleEmail">
                    {texts.en}
                    </Label>
                    <Input
                    id={`name_${language}`}
                    name={`name_${language}`}
                    placeholder={texts.category}
                    onChange={e => updateCategoryData(e.target.value, `name_${language}`)}
                    />
                </FormGroup>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={addCategory}>{texts.add}</Button>
                </Row>
                </Form>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default AddCategoryModal