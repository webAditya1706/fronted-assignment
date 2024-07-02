import { AdminRoutes, SupperAdminRoutes, UserRoutes } from "@/utils/availableRoutes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HandleRoute = () => {
    const loginUserData = useSelector(({ persistedReducer }: any) => persistedReducer.FormReducer.loginUser);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem("assignToken") : null;

    useEffect(() => {
        if (!token || !loginUserData || !Object.keys(loginUserData).length) {
            if (router.route !== "/signin") {
                router.push("/signin"); // Redirect to signin page if no token or user data
            }
        } else {
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
