import { useState } from "react"
import { useEffect } from "react"

export const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                })
        }
    }, [email])
    return [isAdmin];
}