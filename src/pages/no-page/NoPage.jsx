import React from "react"
import { useAtomValue } from "jotai"
import { textsAtom } from "../../states/atoms"

const NoPage = () => {
    const texts = useAtomValue(textsAtom);
    return (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center'> 
            <h1 className="text-secondary">
                {texts.pageDoesNotExists}
            </h1>
        </div>
    )
}

export default NoPage