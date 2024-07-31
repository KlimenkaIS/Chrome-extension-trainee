import React, { useRef } from "react"
import './Button.css'

function Button({ city }: { city: string }) {

    const describeBoxRef = useRef<HTMLSpanElement>(null)

    const expandDescribe = function () {

        if (describeBoxRef.current) {
            describeBoxRef.current.classList.toggle("disabled")
        }
    }

    return (
        <>
            <div className="extension-container">
                <button className="button-weather" type="button" onClick={expandDescribe}>{city.slice(0, 1)}</button>

                <span ref={describeBoxRef} className="describe-section__temperature disabled">
                    {`Temperature in ${city} is ${
                        city === "Minsk" ? "+30" :
                        city === "London" ? "+28" :
                        city === "New York" ? "+26" : null
                    }`}
                </span>
            </div>

        </>
    )
}

export default Button;