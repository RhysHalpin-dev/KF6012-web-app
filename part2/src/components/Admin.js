import React from 'react';
import Login from './Login.js';
import Update from './Update.js';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "authenticated": false, "admin": false, "email": "", "password": "" }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    postData = (url, myJSON, callback) => {
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: JSON.stringify(myJSON)
        })
            .then((response) => response.json())
            .then((data) => {
                callback(data)
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }


    componentDidMount() {
        if (localStorage.getItem('myToken') && localStorage.getItem('myAdmin')) {
            let myAdmin = localStorage.getItem('myAdmin')
            this.setState({ "authenticated": true, "admin": myAdmin });
        }
    }

    handleLoginClick = () => {
        const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/login"
        let myJSON = { "email": this.state.email, "password": this.state.password }
        this.postData(url, myJSON, this.loginCallback)
    }

    handleUpdateClick = (sessionId, name) => {
        const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/update"

        if (localStorage.getItem('myToken')) {
            let myToken = localStorage.getItem('myToken')
            let myJSON = {
                "token": myToken,
                "sessionId": sessionId,
                "name": name
            }
            this.postData(url, myJSON, this.updateCallback)

        } else {
            this.setState({ "authenticated": false })
        }
    }

    handleLogoutClick = () => {
        this.setState({ "authenticated": false })
        localStorage.removeItem('myToken');
        localStorage.removeItem('myAdmin');
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    loginCallback = (data) => {
        console.log(data)
        if (data.status === 200) {
            this.setState({ "authenticated": true, "admin": data.admin, "token": data.token })
            localStorage.setItem('myToken', data.token);
            localStorage.setItem('myAdmin', data.admin);
        }
    }

    updateCallback = (data) => {
        console.log(data)
        if (data.status !== 200) {
            this.setState({ "authenticated": false })
            localStorage.removeItem('myToken');
            localStorage.removeItem('myAdmin');
        }
    }

    render() {
        let page = <Login handleLoginClick={this.handleLoginClick} email={this.state.email} password={this.props.password} handleEmail={this.handleEmail} handlePassword={this.handlePassword} />
        if (this.state.authenticated) {
            page = <div>
                <button onClick={this.handleLogoutClick}>Log out</button>
                <Update handleUpdateClick={this.handleUpdateClick} admin={this.state.admin} />
            </div>
        }

        return (
            <div>
                <h1>Admin</h1>
                {page}
            </div>
        );
    }
}

export default Admin;