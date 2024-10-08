import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { categoriesAtom, editCategoryModalAtom, currentCategoryAtom, loaderAtom, textsAtom, flattenedCategoriesAtom } from "../states/jotai"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";
import Select from 'react-select'

const EditCategoryModal = () => {
    const [isOpen, setIsOpen] = useAtom(editCategoryModalAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const currentCategory = useAtomValue(currentCategoryAtom)
    const flattenedCategories = useAtomValue(flattenedCategoriesAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const [categoryData, setCategoryData] = useState({...currentCategory})
    const language = localStorage.getItem("language") || "ge"
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
                    <Label>
                    {texts.category}
                    </Label>
                    <Input
                    id={`name_${language}`}
                    name={`name_${language}`}
                    placeholder={texts.category}
                    defaultValue={currentCategory[`name_${language}`] || currentCategory.name_ge}
                    onChange={e => updateCategoryData(e.target.value, `name_${language}`)}
                    />
                </FormGroup>
                <FormGroup className="">
                    <Select
                        theme={'light'}
                        className=""
                        classNamePrefix='select'
                        placeholder={texts.chooseCategory}
                        options={flattenedCategories.map(elem => { return {value: elem.id, label: elem[`name_${language}`]} })}
                        value={flattenedCategories.map(elem => { return {value: elem.id, label: elem[`name_${language}`]} }).find(elem => elem.value === categoryData.parentCategoryId)}
                        onChange={e => updateCategoryData(e.value, `parentCategoryId`)}
                        isClearable={false}
                    />
                </FormGroup>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={editCategory}>{texts.save}</Button>
                </Row>
                </Form>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default EditCategoryModal