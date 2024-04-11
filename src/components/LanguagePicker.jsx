import { Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import React from "react"
import { useAtom } from "jotai"
import { textsAtom, languageAtom } from "../states/atoms"
import stringsEn from '../assets/language-strings/en.json'
import stringsGe from '../assets/language-strings/ge.json'

const LanguagePicker = () => {
    const [texts, setTexts] = useAtom(textsAtom)
    const [language, setLanguage] = useAtom(languageAtom)
    
    const allTexts = {
        en: stringsEn,
        ge: stringsGe
    }

    const switchLanguage = (language) => {
        localStorage.setItem("language", language)
        setTexts(allTexts[language])
        setLanguage(language)
    }

    const languages = ["en", "ge"]

    return (<Col className="col-1 d-flex justify-content-center align-items-center">
        <UncontrolledDropdown className="d-flex justify-content-center">
            <DropdownToggle color='white' className='dropdown-toggle text-white'>
                {texts[language]}
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