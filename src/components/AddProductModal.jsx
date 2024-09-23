import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { addProductModalAtom, categoriesAtom, currentCategoryAtom, loaderAtom, textsAtom, unitsAtom } from "../states/jotai"
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendFileClient } from "../utility/apiClients";
import { MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import Tree from 'rc-tree'

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

    const onDrop = (e) => {
      const tmp = [...productData.specifications]
      const index = e.dragNode.index
      const newIndex = e.dropPosition >= 0 ? (e.dropPosition >= tmp.length ? tmp.length - 1 : e.dropPosition) : 0
      const elemCopy = {...tmp[index]}
      tmp.splice(index, 1)
      tmp.splice(newIndex, 0, elemCopy)
      updateProductData(tmp, "specifications")
    }

    const specificationRender = (props) => {
        const {elem, index} = props;
        return (
            <Row key={`spec-${elem.id}`} onClick={() => setLastActiveSpecIndex(index)} className="mt-2 mb-2">
                <Col className="col-6">
                    <Input
                        id={`name_${language}`}
                        name={`name_${language}`}
                        placeholder={texts.specification}
                        value={productData.specifications[index][`name_${language}`]}
                        onChange={e => updateProductSpecification(e.target.value, `name_${language}`, index)}
                    />
                </Col>
                <div className="w-fit-content">
                    <Dropdown isOpen={dropdownOpen && lastActiveSpecIndex === index} toggle={toggle} color="light">
                        <DropdownToggle caret>{elem.unitElement ? elem.unitElement[`name_${language}`] || elem.unitElement.name_ge : texts.unit}</DropdownToggle>
                        <DropdownMenu>
                            {units?.map(unitElement => {
                                return <DropdownItem key={`unit-${unitElement.id}`} onClick={() => {
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
                <Tree
                    id="specifiactions-tree"
                    draggable
                    onDrop={onDrop}   
                    allowDrop={() => true}                           
                    treeData={productData?.specifications?.map((e, index) => { return {elem: e, index} }) }
                    titleRender={specificationRender}
                />
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={() => updateProductData([...productData.specifications, {[`values_${language}`]: [], id: uuidv4()}], "specifications")}>{texts.addSpecification}</Button>
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