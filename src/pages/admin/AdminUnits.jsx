import React, { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { textsAtom, unitsAtom, addUnitModalAtom, currentUnitAtom } from "../../states/jotai"
import UnitAdmin from "../../components/UnitAdmin"
import { Col } from "reactstrap"
import { backendAxiosClient } from "../../utility/apiClients"
import AddUnitModal from "../../components/AddUnitModal"
import EditUnitModal from "../../components/EditUnitModal"
import DeleteUnitModal from "../../components/DeleteUnitModal"

const AdminUnits = () => {
    const [units, setUnits] = useAtom(unitsAtom)
    useEffect(() => {
        backendAxiosClient.get("api/unit-element").then(res => {
            if (res.data) {
                setUnits(res.data)
            }
        })
    }, [setUnits])
    const texts = useAtomValue(textsAtom);
    const setIsAddUnitModalOpen = useSetAtom(addUnitModalAtom)
    const setCurrentUnit = useSetAtom(currentUnitAtom)
    return (
        <Col className='w-100 h-100 m-0 p-0'> 
            <h4>{texts.units}</h4>
            {units?.map(elem => {
               return <UnitAdmin unit={elem} key={elem.id}/>
            })}
            <div className="unit mt-1">
                <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
                    <h6 className="cursor-pointer m-0 p-0" onClick={() => {
                        setCurrentUnit({})
                        setIsAddUnitModalOpen(true)
                    }}>{texts.addUnit}</h6>
                </div>
            </div>
            <AddUnitModal />
            <EditUnitModal />
            <DeleteUnitModal />
        </Col>
    )
}

export default AdminUnits