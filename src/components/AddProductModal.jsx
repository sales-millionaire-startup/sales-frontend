import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { addProductModalAtom, categoriesAtom, currentCategoryAtom, loaderAtom, textsAtom, unitsAtom } from "../states/jotai"
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendFileClient } from "../utility/apiClients";
import { MdDeleteOutline } from "react-icons/md";

const AddProductModal = () => {
    const [isOpen, setIsOpen] = useAtom(addProductModalAtom)
    const setCategories = useSetAtom(categoriesAtom)
    const currentCategory = useAtomValue(currentCategoryAtom)
    const units = useAtomValue(unitsAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const [productData, setProductData] = useState({ specifications: []})
    const language = localStorage.getItem("language") || "ge"
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [lastActiveSpecIndex, setLastActiveSpecIndex] = useState();
  
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const addProduct = (e) => {
        e.preventDefault()
        const payload = {...productData, categoryId: currentCategory?.id}
        delete payload.file 
        const formDataPayload = new FormData();
        formDataPayload.append('file', productData.file);
        formDataPayload.append('data', JSON.stringify(payload))
        setLoader(true)
        backendFileClient.post("api/product", formDataPayload).then(res => {
            if (res.data) {
                setCategories(state => {
                    const tmp = [...state]
                    const parentMostCategoryId = currentCategory.parentMostCategoryId || currentCategory.id
                    const index = tmp.findIndex(elem => elem.id === parentMostCategoryId)
                    tmp[index] = res.data
                    return tmp
                })
            }
        }).finally(() => setLoader(false))
        setProductData({ specifications: []})
        setIsOpen(false)
    }
    
    const updateProductData = (value, item) => {
        setProductData(state => { return {...state, [item]: value}})
    }
    
    const updateProductSpecification = (value, item, index) => {
        setProductData(state => { 
            const tmp = {...state}
            tmp.specifications[index][item] = value
            return tmp
        })
    }
    
    const removeProductSpecification = (index) => {
        setProductData(state => { 
            const tmp = {...state}
            tmp.specifications.splice(index, 1)
            return tmp
        })
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
            <Form onSubmit={addProduct}>
                <Row>
                    <FormGroup className="col-6">
                        <Input
                            id={`name_${language}`}
                            name={`name_${language}`}
                            placeholder={texts.product}
                            onChange={e => updateProductData(e.target.value, `name_${language}`)}
                        />
                    </FormGroup>
                    <FormGroup className="col-6">
                        <Input
                            id="exampleFile"
                            name="file"
                            type="file"
                            onChange={e => updateProductData(e.target.files[0], "file")}
                        />
                    </FormGroup>
                </Row>
                {productData?.specifications?.map((elem, index) => {
                    return (
                        <Row key={index} onClick={() => setLastActiveSpecIndex(index)} className="mt-2 mb-2">
                            <Col className="col-6">
                                <Input
                                    id={`name_${language}`}
                                    name={`name_${language}`}
                                    placeholder={texts.specification}
                                    onChange={e => updateProductSpecification(e.target.value, `name_${language}`, index)}
                                />
                            </Col>
                            {/* <Col className="col-6">
                            <InputGroup>
                                {elem[`values_${language}`].map((currSpecValue, specIndex) => {
                                    return <InputGroupText>
                                    {currSpecValue}
                                    <MdDeleteOutline className="cursor-pointer" onClick={() => updateProductSpecification(elem[`values_${language}`].filter((currSpec, currIndex) => currIndex !== specIndex), `values_${language}`, index)}/></InputGroupText>
                                })}
                                <Input
                                    id={`name_${language}`}
                                    name={`name_${language}`}
                                    placeholder={texts.values}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            updateProductSpecification([...elem[`values_${language}`], event.target.value], `values_${language}`, index)
                                            event.target.value = ""
                                        }
                                    }}
                                />
                            </InputGroup>
                            </Col> */}
                            <div className="w-fit-content">
                                <Dropdown isOpen={dropdownOpen && lastActiveSpecIndex === index} toggle={toggle} color="light">
                                    <DropdownToggle caret>{elem.unitElement ? elem.unitElement[`name_${language}`] || elem.unitElement.name_ge : texts.unit}</DropdownToggle>
                                    <DropdownMenu>
                                        {units?.map(unitElement => {
                                            return <DropdownItem onClick={() => {
                                                updateProductSpecification(unitElement.id, "unitElementId", index)
                                                updateProductSpecification(unitElement, "unitElement", index)
                                            }}>{unitElement[`name_${language}`] || unitElement.name_ge}</DropdownItem>
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <Col>
                                <MdDeleteOutline size={30} className="cursor-pointer mt-1" onClick={() => removeProductSpecification(index)}/>
                            </Col>
                        </Row>
                    )
                })}
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={() => updateProductData([...productData.specifications, {[`values_${language}`]: []}], "specifications")}>{texts.addSpecification}</Button>
                </Row>
                <Row className='justify-content-center mt-2'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={addProduct}>{texts.add}</Button>
                </Row>
                </Form>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default AddProductModal