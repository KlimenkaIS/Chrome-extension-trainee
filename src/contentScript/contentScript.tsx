import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Button from "../Button/Button";

function ContentScript() {
    const [currentCity, setCurrentCity] = useState("")

    useEffect(() => {
        chrome.storage.sync.get(["city"], (res) => {
            setCurrentCity(res.city || "Minsk")
        })
    }, [])

    useEffect(() => {
        const articleEls = document.querySelectorAll('.slug-wrap')
        

        const rootMap = new Map()
        articleEls.forEach((articleEl) => {
            const buttonContainer = document.createElement("div")
            articleEl.appendChild(buttonContainer);


            if (!rootMap.has(articleEl)) {
                const root = createRoot(buttonContainer)
                rootMap.set(articleEl, root)
            }
            

            const root = rootMap.get(articleEl)

            root.render(<Button key={currentCity} city={currentCity} />)
        });

        return () => {
            rootMap.forEach((root) => {
                root.unmount()
            })
        };

    }, [currentCity])

    return null
}

export default ContentScript;