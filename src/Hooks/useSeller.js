import { useState } from "react"
import { useEffect } from "react"

export const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/sellers/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsSeller(data.isSeller);
                })
        }
    }, [email])
    return [isSeller];
}