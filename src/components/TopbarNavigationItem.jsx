import { Col } from "reactstrap"
import React from "react"
import { useNavigate } from "react-router"

const TopbarNavigationItem = (props) => {
    const {label, url, customClass} = props
    const navigate = useNavigate()
    return (
        <Col className={`col-1 d-flex justify-content-center align-items-center nav-page ${customClass}`}>
            <span className="cursor-pointer" onClick={() => navigate(url)}>
                {label}
            </span>
        </Col>
    )
}

export default TopbarNavigationItem