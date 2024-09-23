import React, { useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { loaderAtom, textsAtom, userAtom } from "../states/jotai"
import { Button, Col, Input, Row } from "reactstrap";
import { backendFileClient } from "../utility/apiClients";

const ProductCart = ({ product }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [data, setData] = useState(product)
    const language = localStorage.getItem("language") || "ge"
    const setUser = useSetAtom(userAtom)
    const setLoader = useSetAtom(loaderAtom)
    const texts = useAtomValue(textsAtom)
    
    const updateData = (index, value) => {
        setData(prevValue => {
            const tmp = {...prevValue}
            tmp.cartItemValues[index].value = value 
            return tmp
        })
    }
    
    const handleUpdate = (e) => {
        e.preventDefault()
        const payload = {...data}
        const formDataPayload = new FormData();
        formDataPayload.append('file', data.file);
        formDataPayload.append('data', JSON.stringify(payload))
        setLoader(true)
        backendFileClient.post(`api/cart/${data.id}`, formDataPayload).then(res => {
            if (res.data) {
                setUser(prevState => {
                    const tmp = {...prevState}
                    return tmp
                })
            }
        }).finally(() => setLoader(false))
    }

    return (
      <div className="product m-1" key={data.id}>
        <div className="nav-page p-1 d-flex w-fit-content m-0 p-0 align-items-center" onClick={() => setIsOpen(!isOpen)}>
            <h5 className="cursor-pointer m-0 p-0">{data.product[`name_${language}`] || data.product.name_ge} {isOpen ? <BiChevronUp/> : <BiChevronDown/>}</h5>
        </div>
        {isOpen && <>
            <Input
                id="exampleFile"
                name="file"
                type="file"
                onChange={e => setData({...data, file: e.target.files[0]})}
            />
            {data?.cartItemValues?.map((elem, index) => {
                return (
                    <Row key={index} className="m-0 mt-2 mb-2 p-0">
                        <Col className="col-3 d-flex align-middle">
                            <h6 className="m-0 p-0 d-flex align-items-center">
                                {elem.specification[`name_${language}`] || elem.name_ge}
                            </h6>
                        </Col>
                        <Col className="col-3 d-flex align-middle">
                            <Input
                                id={`name_${language}`}
                                name={`name_${language}`}
                                placeholder={elem.specification[`name_${language}`] || elem.name_ge}
                                value={elem.value}
                                onChange={e => updateData(index, e.target.value)}
                            />
                        </Col>
                        <Col className="col-3 d-flex align-middle">
                            <h6 className="m-0 p-0 d-flex align-items-center">
                                {elem.specification.unitElement[`name_${language}`] || elem.specification.unitElement.name_ge}
                            </h6>
                        </Col>
                    </Row>
                )
            })}
            <Row className='justify-content-center m-0 mt-2'>
                <Button className="w-fit-content p-2" color="dark"  onClick={handleUpdate}>{texts.add}</Button>
            </Row>
        </>}
      </div>
    );
};

export default ProductCart