import React, { useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { unitsAtom, editUnitModalAtom, currentUnitAtom, loaderAtom, textsAtom } from "../states/jotai"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const EditUnitModal = () => {
    const [isOpen, setIsOpen] = useAtom(editUnitModalAtom)
    const setUnits = useSetAtom(unitsAtom)
    const currentUnit = useAtomValue(currentUnitAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const [unitData, setUnitData] = useState({...currentUnit})
    const language = localStorage.getItem("language") || "ge"
    const editUnit = (e) => {
        e.preventDefault()
        setLoader(true)
        backendAxiosClient.put(`api/unit-element/${currentUnit.id}`, unitData).then(res => {
            if (res.data) {
                setUnits(state => {
                    const tmp = [...state]
                    const index = tmp.findIndex(elem => elem.id === currentUnit.id)
                    tmp[index] = res.data
                    return tmp
                })
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
            <Form onSubmit={editUnit}>
                <FormGroup>
                    <Label>
                    {texts.unit}
                    </Label>
                    <Input
                    id={`name_${language}`}
                    name={`name_${language}`}
                    placeholder={texts.unit}
                    defaultValue={currentUnit[`name_${language}`] || currentUnit.name_ge}
                    onChange={e => updateUnitData(e.target.value, `name_${language}`)}
                    />
                </FormGroup>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2" color="dark"  onClick={editUnit}>{texts.save}</Button>
                </Row>
                </Form>
                <br />
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default EditUnitModal