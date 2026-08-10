import {Component} from "react";
import {Fragment} from "react";
import {Link, Outlet} from "react-router-dom";
import covertClassToFunction from "../convertClassToFunction.jsx";

class MenubarComponent extends Component {
    render() {
        const routerLinks = [
            {to: '/', label: 'React & Vite + Login With Line API'},
            {to: '/login', label: 'Login/Logout'},
            {to: '/reads-and-read', label: 'Read(s) Data'},
            {to: '/create', label: 'Create Data'},
        ]
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                    <div className="container" style={{maxWidth: "290px", margin: "0 auto"}}>
                        <Link className="navbar-brand" to={routerLinks[0].to}>
                            <i className="fa-solid fa-house p-2"></i>{routerLinks[0].label}
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                       aria-expanded="false">Topic</a>
                                    <ul className="dropdown-menu">
                                        {routerLinks?.map((item, index) => (
                                            <Fragment key={index}>
                                                {(index > 0)
                                                    ?
                                                    <li><Link className="dropdown-item" to={item.to}>{item.label}</Link>
                                                    </li>
                                                    :
                                                    null
                                                }
                                            </Fragment>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet
                    // all route work on here
                />
            </>
        );
    }
}

export default covertClassToFunction(MenubarComponent)
