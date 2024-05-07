import React from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { unitsAtom, currentUnitAtom, loaderAtom, textsAtom, deleteUnitModalAtom } from "../states/jotai"
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { backendAxiosClient } from "../utility/apiClients";

const DeleteUnitModal = () => {
    const [isOpen, setIsOpen] = useAtom(deleteUnitModalAtom)
    const setUnits = useSetAtom(unitsAtom)
    const currentUnit = useAtomValue(currentUnitAtom)
    const texts = useAtomValue(textsAtom)
    const setLoader = useSetAtom(loaderAtom)
    const language = localStorage.getItem("language") || "ge"
    const deleteUnit = (e) => {
        e.preventDefault()
        setLoader(true)
        backendAxiosClient.delete(`api/unit-element/${currentUnit.id}`).then(res => {
            if (res.data) {
                setUnits(state => state.filter(elem => elem.id !== currentUnit.id))
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
                    <h4 className="d-flex justify-content-center">{texts.deleteWarningText} {currentUnit[`name_${language}`] || currentUnit.name_ge}?</h4>
                </Row>
                <Row className='justify-content-center'>
                    <Button className="w-fit-content p-2 m-2" color="dark"  onClick={deleteUnit}>{texts.yes}</Button>
                    <Button className="w-fit-content p-2 m-2" color="dark"  onClick={() => setIsOpen(false)}>{texts.no}</Button>
                </Row>
            </Col>
        </ModalBody>
    </Modal>
    );
};

export default DeleteUnitModal