import { useState } from "react"
import { useEffect } from "react"

export const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    
    useEffect(() => {
        if (email) {
            fetch(`https://e-buy-phi.vercel.app/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading];
}