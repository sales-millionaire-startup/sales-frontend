import { useAtomValue } from "jotai"
import React, { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from 'reactstrap'
import { textsAtom } from "../../states/jotai"
import { backendAxiosClient } from "../../utility/apiClients"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { logOut } from "../../utility/basicFunctions"

const RegisterPage = () => {
    const texts = useAtomValue(textsAtom)
    const [data, setData] = useState({})
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['name']);
        
    const updateData = (value, item) => {
        setData(state => { return {...state, [item]: value}})
    }

    const handleValidation = () => {
        return true
    }

    const handleRegister = () => {
        if (handleValidation) {
            console.log(cookies, setCookie)
            backendAxiosClient.post("api/auth/register", data).then(res => {
                if (res.data) {
                    setSuccess(true)
                }
            }).catch((res) => console.error(res))
        }
    }

    useEffect(() => {
        logOut()
    }, [])

    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'> 
            <Modal 
                isOpen={true}
                className='modal-dialog-centered'
            > 
                <ModalBody className="d-flex justify-content-center">
                    <Col>
                    <Form onSubmit={handleRegister}>
                        <FormGroup>
                            <div className='d-flex justify-content-center align-items-center'> 
                                <Label>
                                {texts.register}
                                </Label>
                            </div>
                            <Input
                                id={`email`}
                                name={`email`}
                                placeholder={texts.email}
                                onChange={e => updateData(e.target.value, `email`)}
                                className="mt-3"
                            />
                            <Input
                                id={`name`}
                                name={`name`}
                                placeholder={texts.name}
                                onChange={e => updateData(e.target.value, `name`)}
                                className="mt-3"
                            />
                            <Input
                                id={`companyId`}
                                name={`companyId`}
                                placeholder={texts.companyId}
                                onChange={e => updateData(e.target.value, `companyId`)}
                                className="mt-3"
                            />
                            <Input
                                id={`password`}
                                name={`password`}
                                placeholder={texts.password}
                                onChange={e => updateData(e.target.value, `password`)}
                                className="mt-3"
                                type="password"
                            />
                            <Input
                                id={`repeatPassword`}
                                name={`repeatPassword`}
                                placeholder={texts.repeatPassword}
                                onChange={e => updateData(e.target.value, `repeatPassword`)}
                                className="mt-3"
                                type="password"
                            />
                        </FormGroup>
                        {success &&
                        <Row>
                            <Label className='d-flex justify-content-center text-success'>{texts.registeredSuccessfully}</Label>
                        </Row>
                        }
                        <Row className='justify-content-center'>
                            {!success && <Button className="w-fit-content p-2 m-2" color="dark"  onClick={handleRegister}>{texts.register}</Button>}
                            <Button className="w-fit-content p-2 m-2" color="dark"  onClick={() => navigate("/login")}>{texts.login}</Button>
                        </Row>
                        </Form>
                        <br />
                    </Col>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RegisterPage