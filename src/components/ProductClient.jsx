import React from "react"
import { useSetAtom } from "jotai"
import { addProductModalAtom, currentProductAtom } from "../states/jotai"
import { BiPlus } from "react-icons/bi";

const ProductClient = ({ product }) => {
    const setCurrentProduct = useSetAtom(currentProductAtom)
    const setIsAddProductModalOpen = useSetAtom(addProductModalAtom)
    const language = localStorage.getItem("language") || "ge"
    return (
      <div className="product m-1" key={product.id} onClick={() => setCurrentProduct(product)}>
        <div className="nav-page p-1 d-flex w-fit-content m-0 p-0 align-items-center">
            <h6 className="cursor-pointer m-0 p-0">{product[`name_${language}`] || product.name_ge} <BiPlus onClick={() => setIsAddProductModalOpen(true)}/></h6>
        </div>
      </div>
    );
};

export default ProductClient