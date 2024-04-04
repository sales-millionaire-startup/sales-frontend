import { Col, Row } from "reactstrap"
import React from "react"
import { useAtomValue } from "jotai"
import { textsAtom } from "../states/test"
import { useNavigate } from "react-router"

const Sidebar = () => {
    const texts = useAtomValue(textsAtom);
    const pages = ["/gagi", "/home", "/error", "/wkup"];
    const navigate = useNavigate();
    return (
        <Col className="col-1 bg-danger m-0 p-0">
            {pages.map((elem, index) => {
                return <Row key={elem} onClick={() => navigate(elem)} className="nav-page m-0 p-0">
                    {texts.page} {index + 1}
                </Row>
            })}
        </Col>
    )
}

export default Sidebar