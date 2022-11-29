import styles from "./layout.module.css";
import Navbar from "./Navbar";

import { useEffect } from "react";
import { useApi } from "../hooks";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

// import Footer from './Footer';

// To check for the refresh token on every page
export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { token } = router.query;

  const { get } = useApi();
  const refreshToken = async () => {
    await get("auth/refresh_token")
      .then((response) => {
        const newToken = response.data.token;

        if (newToken) {
          if (
            router.asPath == "/login" ||
            router.asPath == "/" ||
            router.asPath == "/passwordReset" ||
            router.asPath == "forgotPassword"
          ) {
            dispatch({ type: "UPDATE_ACCESS_TOKEN", token: newToken });

            router.push(`/dashboard`);
          } else {
            dispatch({ type: "UPDATE_ACCESS_TOKEN", token: newToken });
            router.push(`${router.asPath}`);
          }
        }
      })
      .catch((err) => {
        // for allowing user to access some pages without token
        if (
          router.pathname == `/passwordReset` ||
          router.asPath == "/forgotPassword"
        ) {
          router.push(`${router.asPath}`);
        } else {
          // router.push("/login");
          router.push(`${router.asPath}`)
        }
      });
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      {/* <div className={styles.container}>{children}</div> */}
      {children}
      {/* <Footer/> */}
    </>
  );
}
