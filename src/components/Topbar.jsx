import { Row, Col } from "reactstrap"
import React from "react"
import TopbarNavigationItem from "./TopbarNavigationItem"
import { useAtomValue } from "jotai"
import { textsAtom } from "../states/jotai"
import LanguagePicker from "./LanguagePicker"

const Topbar = () => {
  const texts = useAtomValue(textsAtom);
  return (<div className="row m-0 p-0">
      <Col className="col-1 m-0 p-0">
        <Row className='m-0 vh-5 bg-dark text-white d-flex'>
          <TopbarNavigationItem label={texts.companyName} url="/admin/products" customClass="col-12"/>
        </Row>
      </Col>
      <Col className="col-11 m-0 p-0">
      <Row className='m-0 vh-5 bg-dark text-white d-flex justify-content-end'>
        <div className="d-flex w-fit-content m-0 p-0">

        <LanguagePicker />
        <TopbarNavigationItem label={texts.register} url="/register"/>
        <TopbarNavigationItem label={texts.login} url="/login"/>
        </div>
      </Row>
      </Col>
  </div>
  )
}

export default Topbar