import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HandleRoute = () => {
    const loginUserData = useSelector(({ persistedReducer }: any) => persistedReducer.FormReducer.loginUser)
    const router = useRouter();
    const token = localStorage.getItem("assignToken")

    useEffect(() => {
        if (token && Object.keys(loginUserData).length) {
            router.push("/")
        } else {
            router.push("/signin")
        }
    }, [loginUserData, token])
    return;
}

export default HandleRoute;