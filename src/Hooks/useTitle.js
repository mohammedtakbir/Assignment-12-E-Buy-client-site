import { useEffect } from "react"

export const useTitle = (title) => {
    useEffect(() => {
        window.document.title = `${title} | E-Buy`
    }, [title])
}