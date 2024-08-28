import {Component} from "react";
import covertClassToFunction from "../convertClassToFunction.jsx";
import {liff} from "@line/liff";

class UpdateComponent extends Component {

    fakeStoreApi = "https://fakestoreapi.com/users"

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            email: "",
            username: "",
            password: "",
            isUserLoggedIn: "false",
        }
    }


    async componentDidMount() {

        await liff.init({liffId: process.env.LIFF_ID}).then(async () => { // First liff id have to exist
            try {
                await liff.ready.then(async () => {
                    const isUserLogged = sessionStorage.getItem("isUserLoggedIn")
                    if (isUserLogged === null) {
                        throw new Error('User logged not found') // Second User have to logged
                    }
                    await this.handleSetStateUserAndUserLoggedIn(isUserLogged);
                })

            } catch (error) {
                // if user try to get page but not login
                // console.log(error)
                this.props.navigate('/')
            }
        })

    }

    async handleSetStateUserAndUserLoggedIn(isUserLogged) {
        const id = Number(this.props.location.search.slice(4))
        const users = await fetch(this.fakeStoreApi + `/${id}`);
        const resultUser = await users.json(); // **
        this.setState({
            isUserLoggedIn: isUserLogged,
            id: resultUser.id,
            email: resultUser.email,
            username: resultUser.username,
            password: resultUser.password
        });
    }

    // handle function can specify async function
    handleRequestPutMethod = async (event) => {
        event.preventDefault()
        const response = await fetch(this.fakeStoreApi + `/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(
                {
                    email: this.state.email,
                    username: this.state.username,
                    password: this.state.password,
                    name: {
                        firstname: 'John',
                        lastname: 'Doe'
                    },
                    address: {
                        city: 'kilcoole',
                        street: '7835 new road',
                        number: 3,
                        zipcode: '12926-3874',
                        geolocation: {
                            lat: '-37.3159',
                            long: '81.1496'
                        }
                    },
                    phone: '1-570-236-7033'
                }
            )
        })

        if (response.status === 200) {
            // life cycle of hook (function)
            this.props.navigate(`/reads-and-read`);
        }
    }

    handleInputChange = (event) => {
        if (event.target.name === "email") {
            this.setState({
                email: event.target.value
            })
        } else if (event.target.name === "username") {
            this.setState({
                username: event.target.value
            })
        } else if (event.target.name === "password") {
            this.setState({
                password: event.target.value
            })
        } else if (event.target.name === "id") {
            this.setState({
                id: event.target.value
            })
        }
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

    formEditUser() {
        return (
            <div className="container mt-4 w-50" style={{margin: "0 auto"}} onSubmit={this.handleRequestPutMethod}>
                <form className={"form-control p-2 "}>
                    <div className="mb-3">
                        Id
                        <input type="number" className="form-control" name="id" placeholder={this.state.id}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        Email
                        <input type="email" className="form-control" name="email" placeholder={this.state.email}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        Username
                        <input type="text" className="form-control" name="username" placeholder={this.state.username}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div className="mb-3">
                        Password
                        <input type="password" className="form-control" name="password"
                               placeholder={this.state.password} onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }

    render() {
        let component
        if (this.state.isUserLoggedIn !== "true") {
            component = this.loadingComponent()
        }
        else {
            component = this.formEditUser()
        }
        return (component)
    }
}

export default covertClassToFunction(UpdateComponent)