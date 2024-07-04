import { AdminRoutes, SupperAdminRoutes, UnAuthorizedUser, UserRoutes } from "@/utils/availableRoutes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

const HandleRoute = () => {
    const loginUserData = useSelector(({ persistedReducer }: any) => persistedReducer.FormReducer.loginUser);
    const router = useRouter();
    const token = Cookies.get('assignToken');

    useEffect(() => {
        if (!token || !loginUserData || !Object.keys(loginUserData).length) {
            if (router.route !== "/signin" && router.route !== "/signup") {
                router.push("/signin"); // Redirect to signin page if no token or user data
            }
        } else {
            router.push("/");
            // if (loginUserData.role === "admin" && AdminRoutes.includes(router.route)) {
            //     router.push("/");
            // }
            // if (loginUserData.role === "user" && UserRoutes.includes(router.route) ) {
            //     router.push("/");
            // }
            // if (SupperAdminRoutes.includes(router.route) && loginUserData.role !== "superAdmin") { // Corrected spelling
            //     router.push("/");
            // }
        }
    }, [loginUserData, token, router.route]);

    return null;
}

export default HandleRoute;
