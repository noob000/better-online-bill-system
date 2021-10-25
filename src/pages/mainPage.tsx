import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import Nav from "../components/nav";
import { MobileContext } from "./home";
import React from "react";
import loadable from '@loadable/component'
function MainPage(props: any) {
    let history = useHistory();
    history.push("/")
    return (
        <div className='mainWrapper'>
            <div className='leftContainer'>
                <Nav logout={props.logout} isMobile={props.isMobile} />
            </div>
            <MobileContext.Provider value={props.isMobile}>
                <div className='rightContainer'>

                    <Switch>
                        <Route exact path='/' >
                            <LoadAdd email={props.email} />
                        </Route>
                        <Route path='/mybill' >
                            <LoadBill email={props.email} />
                        </Route>
                        <Route path='/analysis'>
                            <LoadAnalysis email={props.email} />
                        </Route>
                    </Switch>

                </div>
            </MobileContext.Provider>
        </div>
    )
}
const LoadAdd = loadable(()=>import('./add'))
const LoadBill = loadable(()=>import('./bill'))
const LoadAnalysis = loadable(()=>import('./analysis'))
export default MainPage