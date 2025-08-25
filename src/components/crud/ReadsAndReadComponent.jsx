import {Component} from "react";
import React from "react";
import {liff} from "@line/liff";
import convertClassToFunction from "../convertClassToFunction.jsx";
import {jwtDecode} from "jwt-decode";

class ReadsAndReadComponent extends Component {

    fakeStoreApi = "https://fakestoreapi.com/users"

    constructor(props) {
        super(props);
        this.state = {
            enablePage: false, // just a trick!
            jwtPayload: {
                iat: "", // issued at time
                exp: "",
                email: "",
            },
            profile: {
                name: "",
                statusMessage: "",
                pictureUrl: ""
            },
            users: []
        }

    }

    async componentDidMount() {
        // the first case if user was not login ** LiffId is not found. Note process.env.LIFF_ID i config on vite.config.js file
        await liff.init({liffId: process.env.LIFF_ID}).then(async () => {
            try {
                await this.handleSetSateProfileAndJwtPayload();
                await this.handleSetSateUsers();
            } catch (error) {
                this.props.navigate('/login')
            }
        })
    }

    async handleSetSateProfileAndJwtPayload() {
        await liff.ready.then(async () => {
            const profile = await liff.getProfile()
            const token = liff.getIDToken()
            const decodeToken = jwtDecode(token); // ** decode jwt and you can get payload
            this.setState({
                enablePage: true,
                profile: {
                    name: profile.displayName,
                    statusMessage: profile.statusMessage,
                    pictureUrl: profile.pictureUrl
                },
                jwtPayload: {
                    iat: new Date(decodeToken['iat'] * 1000).toLocaleString("en-US", {timeZone: "Asia/Bangkok"}),
                    exp: new Date(decodeToken['exp'] * 1000).toLocaleString("en-US", {timeZone: "Asia/Bangkok"}),
                    email: decodeToken['email']
                },
            })
            sessionStorage.setItem("isUserLoggedIn", "true")
        });
    }

    async handleSetSateUsers() {
        const users = await fetch(`${this.fakeStoreApi}?limit=5`);
        const resultUser = await users.json();
        this.setState({users: resultUser})
    }

    async handleDelete(id) {
        await fetch(`${this.fakeStoreApi}/${id}`, {
            method: 'DELETE'
        }).then(res => {
            if (res.status === 200) {
                alert('deleted successfully')
                // life cycle of hook (function)
                this.props.navigate('/reads-and-read');
            }
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

    handleUpdateComponent(id) {
        this.props.navigate(`/read/edit?id=${id}`);
    }


    usersTable() {
        return (
            <>
                <div>
                    <div className="container mt-5 mb-3 ">
                        <div className="row m-lg-4">
                            <div className="col-md-4">
                                <div className="card p-3 mb-2">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="icon">
                                                <img src={this.state.profile.pictureUrl} width={"50"} alt=""/>
                                            </div>
                                            <div className="ms-2 c-details">
                                                <h6 className="mb-0">{this.state.profile.name}</h6>
                                                <span>{this.state.profile.statusMessage}</span>
                                            </div>
                                        </div>
                                        <div className={"badge badge-pill badge-success"}><span>Active</span></div>
                                    </div>
                                    <span className={"mt-2"}>Email : {this.state.jwtPayload.email}</span>
                                    <div className="mt-3"><span className="text1">Login Expired : {this.state.jwtPayload.exp} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table mt-3 w-75" style={{margin: "0 auto"}}>
                        <thead className="table table-secondary">
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users?.map((user) => (
                                // if I called by this.handle2OnRowClick ** student will be undefined
                                <React.Fragment key={user.id}>
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.password}</td>
                                        <td>
                                            <div className={"btn-group"}>
                                                <button className={"btn btn-warning"} onClick={() => this.handleUpdateComponent(user.id)}>edit</button>
                                                <button className={"btn btn-danger"} onClick={() => this.handleDelete(user.id)}>delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }


    render() {
        return this.state.users.length === 0 ? this.loadingComponent() : this.usersTable()
    }
}


export default convertClassToFunction(ReadsAndReadComponent);
