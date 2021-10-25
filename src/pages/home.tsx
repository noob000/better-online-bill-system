import MainPage from "./mainPage";
import '../style/css/home.css';
import Login from "../components/login";
import { useEffect, useState, createContext } from "react";
import '../style/css/basic.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import React from "react";

export const MobileContext = createContext({});
export default function Home() {
    const [isLogged, setIslogged] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        let width = window.innerWidth;
        if (width < 900) setIsMobile(true);
        window.onresize = () => {
            let width = window.innerWidth;
            if (width < 900) setIsMobile(true)
            else {
                setIsMobile(false);
            }

        }
    }, [])
    const logout = () => {
        setIslogged(false);
        setEmail(null);
    }
    const login = (email: string) => {
        setIslogged(true)
        setEmail(email);

    }
    return (
        <Router>
            {isLogged ?
                <MainPage
                    isMobile={isMobile}
                    email={email}
                    logout={logout} />
                :
                <Login setLog={login} />
            }
        </Router>
    )
}