import { useState } from "react"
import { useEffect } from "react"

export const useToken = (email) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`https://e-buy-phi.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('accessToken', data.token);
                        setToken(data.token);
                    }
                })
        }
    }, [email])
    return [token];
}