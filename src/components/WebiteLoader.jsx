

import React from 'react'
import { Row, Spinner } from 'reactstrap'

const WebsiteLoader = () => {
    return (
        <Row className="d-flex justify-content-center spinloader">
            <Spinner />
        </Row>
    )
}

export default WebsiteLoader