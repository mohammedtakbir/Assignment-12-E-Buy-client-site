import { useState } from "react"
import { useEffect } from "react"

export const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`https://e-buy-phi.vercel.app/users/sellers/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsSeller(data.isSeller);
                    setIsSellerLoading(false);
                })
                .catch(err => {
                    setIsSellerLoading(false);
                })
        }
    }, [email])
    return [isSeller, isSellerLoading];
}