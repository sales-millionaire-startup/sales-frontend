import { Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import React from "react"
import { useAtomValue } from "jotai"
import { textsAtom } from "../states/test"

const LanguagePicker = () => {
    const texts = useAtomValue(textsAtom);

    const switchLanguage = (language) => {
        localStorage.setItem("language", language)
        window.location.reload()
    }

    const languages = ["en", "ge"]

    return (<Col className="col-1 d-flex justify-content-center align-items-center">
        <UncontrolledDropdown className="d-flex justify-content-center">
            <DropdownToggle color='white' className='dropdown-toggle text-white'>
                {texts[localStorage.getItem("language") || "en"]}
            </DropdownToggle>
            <DropdownMenu className='' tag='ul' style={{top: "auto"}}>
                {languages.map(elem => {
                    return <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            switchLanguage(elem)
                        }}>{texts[elem]}</span>
                    </DropdownItem>
                })}
            </DropdownMenu>
        </UncontrolledDropdown>
        </Col>
    )
}

export default LanguagePicker