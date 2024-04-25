import React from "react"
import { useAtomValue, useSetAtom } from "jotai"
import { currentProductAtom, textsAtom, editProductModalAtom, deleteProductModalAtom } from "../states/jotai"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MdDeleteOutline, MdOutlineEdit, MdSettings } from "react-icons/md";

const ProductAdmin = ({ product }) => {
    const texts = useAtomValue(textsAtom)
    const setCurrentProduct = useSetAtom(currentProductAtom)
    const setIsEditProductModalOpen = useSetAtom(editProductModalAtom)
    const setIsDeleteProductModalOpen = useSetAtom(deleteProductModalAtom)
    const language = localStorage.getItem("language") || "ge"
    return (
      <div className="product" key={product.id}>
        <div className="nav-page d-flex w-fit-content m-0 p-0 align-items-center">
            <h6 className="cursor-pointer m-0 p-0">{product[`name_${language}`] || product.name_ge}</h6>
            <h6 className="cursor-pointer m-0 p-0">
            <UncontrolledDropdown className="m-0 p-0">
                <DropdownToggle className='' style={{backgroundColor: "inherit", border: "none", color: "black"}} onClick={() => setCurrentProduct(product)}>
                    <MdSettings />
                </DropdownToggle>
                <DropdownMenu className='' tag='ul' style={{top: "auto"}}>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsEditProductModalOpen(true)
                        }}><MdOutlineEdit />{texts.product}</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <span className='col-12' onClick={() => {
                            setIsDeleteProductModalOpen(true)
                        }}><MdDeleteOutline />{texts.product}</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            </h6>
        </div>
      </div>
    );
};

export default ProductAdmin