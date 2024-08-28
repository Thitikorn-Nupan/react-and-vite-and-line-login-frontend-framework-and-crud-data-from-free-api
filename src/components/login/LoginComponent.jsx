import {Component} from "react";
import {liff} from "@line/liff";
import covertClassToFunction from "../convertClassToFunction.jsx";

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: null,

        }
    }

    componentDidMount  =  () => {
        liff.init({liffId: process.env.LIFF_ID}).then(() => {
            const isUserLogged = sessionStorage.getItem("isUserLoggedIn")
            this.setState({
                isUserLoggedIn: isUserLogged
            });
        })

    }

    loadingComponent() {
        return (
            <div className={"container text-center mt-4"}>
                <div className="spinner-border  text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    handleLogin = (event) => {
        // You can use liff.ready even before the initialization of the LIFF app by liff.init() has finished.
        liff.ready.then(
            // do something you want when liff.init finishes
            () =>
                liff.login()
            )
    }

    handleLogout = (event) => {

        liff.logout()

        sessionStorage.clear()
        this.props.navigate('/')

    }

    render() {
        console.log(this.state.isUserLoggedIn)
        let component

        if (this.state.isUserLoggedIn !== "true") {
            component = <button className={"btn btn-success mt-4"} onClick={this.handleLogin}>Login With Line</button>
        }
        else {
            component = <button className={"btn btn-danger mt-4"} onClick={this.handleLogout} >Logout</button>
        }

        return (
            <div className={"container text-center"}>
                {component}
            </div>
        )
    }
}

export default covertClassToFunction(LoginComponent)
