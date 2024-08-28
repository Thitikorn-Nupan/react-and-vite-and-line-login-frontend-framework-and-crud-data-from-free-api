import {Component} from "react";
import {Link, Outlet} from "react-router-dom";

export class MenubarComponent extends Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                    <div className="container" style={{maxWidth: "290px", margin: "0 auto"}}>
                        <Link className="navbar-brand" to={"/"}>
                            <i className="fa-solid fa-house p-2"></i>Project React + Vite Core
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                       aria-expanded="false">Topic
                                    </a>
                                    <ul className="dropdown-menu">
                                        {/* <Link> is used to set the URL and keep track of browsing history. */}
                                        <li><Link className="dropdown-item" to={"/login"}>Login</Link></li>
                                        <li><Link className="dropdown-item" to={"/reads-and-read"}>Read(s) Data</Link></li>
                                        <li><Link className="dropdown-item" to={"/create"}>Create Data</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <Outlet/> {/* all route work on here */}
            </>
        );
    }
}