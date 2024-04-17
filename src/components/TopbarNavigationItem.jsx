import React from "react"
import { useNavigate } from "react-router"

const TopbarNavigationItem = (props) => {
    const {label, url} = props
    const navigate = useNavigate()
    return (
        <div className={`d-flex justify-content-center align-items-center nav-page`}>
            <span className="cursor-pointer m-2" onClick={() => navigate(url)}>
                {label}
            </span>
        </div>
    )
}

export default TopbarNavigationItem