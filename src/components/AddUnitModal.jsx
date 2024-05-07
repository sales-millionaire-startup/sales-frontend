import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { addUnitModalAtom, unitsAtom, loaderAtom, textsAtom } from "../states/jotai"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const AddUnitModal = () => {
    const [isOpen, setIsOpen] = useAtom(addUnitModalAtom)
    const setUnits = useSetAtom(unitsAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const [unitData, setUnitData] = useState({})
    const language = localStorage.getItem("language") || "ge"
    const addUnit = (e) => {
        e.preventDefault()
        setLoader(true)
        backendAxiosClient.post("api/unit-element", unitData).then(res => {
            if (res.data) {
                setUnits(state => [...state, {...res.data}])
            }
        }).finally(() => setLoader(false))
        setIsOpen(false)
    }

    const updateUnitData = (value, item) => {
        setUnitData(state => { return {...state, [item]: value}})
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
            <Form onSubmit={addUnit}>
                <FormGroup>
                    <Label>
                    {texts.unit}
                    </Label>
                    <Input
                    id={`name_${language}`}
                    name={`name_${language}`}
                    placeholder={texts.unit}
                    onChange={e => updateUnitData(e.target.value, `name_${language}`)}
                    />
                </FormGroup>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={addUnit}>{texts.add}</Button>
                </Row>
                </Form>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default AddUnitModal