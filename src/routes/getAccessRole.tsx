import { jwtDecode } from "jwt-decode";

export const getAccessRole = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        try {
            const data = jwtDecode<{ Role: string; exp: string }>(token);
            if (data && data?.Role) {
                return {
                    getdata: data.Role,
                    exp: data.exp,
                };
            } else {
                return { getdata: 0 };
            }
        } catch (error) {
            return { getdata: 0 };
        }
    } else {
        return { getdata: 0 };
    }
};