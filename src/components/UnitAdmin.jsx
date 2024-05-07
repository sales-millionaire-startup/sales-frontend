import React from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { currentUnitAtom, textsAtom, editUnitModalAtom, deleteUnitModalAtom } from "../states/jotai"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MdDeleteOutline, MdOutlineEdit, MdSettings } from "react-icons/md";

const UnitAdmin = ({ unit }) => {
    const texts = useAtomValue(textsAtom)
    const setCurrentUnit = useSetAtom(currentUnitAtom)
    const setIsEditUnitModalOpen = useSetAtom(editUnitModalAtom)
    const setIsDeleteUnitModalOpen = useSetAtom(deleteUnitModalAtom)
    const language = localStorage.getItem("language") || "ge"
    return (
      <div className="unit" key={unit.id} onClick={() => setCurrentUnit(unit)}>
        <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
            <h6 className="cursor-pointer m-0 p-0">{unit[`name_${language}`] || unit.name_ge}</h6>
            <h6 className="cursor-pointer m-0 p-0">
            <UncontrolledDropdown className="m-0 p-0">
                <DropdownToggle className='' style={{backgroundColor: "inherit", border: "none", color: "black"}}>
                    <MdSettings />
                </DropdownToggle>
                <DropdownMenu className='' tag='ul' style={{top: "auto"}}>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsEditUnitModalOpen(true)
                        }}><MdOutlineEdit />{texts.unit}</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsDeleteUnitModalOpen(true)
                        }}><MdDeleteOutline />{texts.unit}</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </h6>
        </div>
      </div>
    );
};

export default UnitAdmin