import React from 'react'
import UserList from '../components/Userlist'

class User extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            userList: [{
                name: "Default",
                feed: ['music']
            }],
            currentUser: {
                name: "Default",
                feed: ['music']
            },
        }
    }

    checkUser = (userName) => {
        for (let i = 0; i < this.state.userList.length; i++) {
            console.log('loop', this.state.userList[i])
            if (this.state.userList[i].name === userName) {
                return true
            }
        }
    }

    handleSubmit = () => {
        if (!this.state.inputValue) return
        if (this.checkUser(this.state.inputValue) === true) {
            this.setState({ inputValue: '' })
            return alert('User already exist');
        }
        else {
            const newUser = {
                name: this.state.inputValue,
                feed: ['music']
            }

            const list = [...this.state.userList];

            list.push(newUser);
            localStorage.setItem(`currentUser`, JSON.stringify(newUser))
            localStorage.setItem(`userList`, JSON.stringify(list))
            this.setState({
                userList: list,
                currentUser: newUser,
                inputValue: '',
            })
        }

    }
    componentDidMount = () => {
        const userListStorage = JSON.parse(localStorage.getItem(`userList`)) || this.state.userList;
        const currentUserStorage = JSON.parse(localStorage.getItem(`currentUser`)) || this.state.currentUser;
        this.setState({ userList: userListStorage, currentUser: currentUserStorage })
    }

    removeUser = (e) => {
        let userList = this.state.userList
        let removeUser = parseInt(e.target.attributes.getNamedItem('data-index').value);
        let remove = userList.slice(0, removeUser).concat(userList.slice(removeUser + 1))
        localStorage.setItem('userList', JSON.stringify(remove))
        const lastUser = remove[remove.length - 1] || {
            name: "Default",
            feed: ['music']
        };
        this.setState({
            userList: remove,
            currentUser: lastUser,
        })
    }

    updateInputValue = (e) => {
        this.setState({ inputValue: e.target.value })

    }
    handleUserClick = e => {
        let index = parseInt(e.target.id)
        localStorage.setItem('currentUser', JSON.stringify(this.state.userList[index]))
        this.setState({ currentUser: this.state.userList[index] })
    }


    render() {
        return (<>
            <div className='conatiner ccontainHeight'>
                <div className='row'>
                    <div className="col-2"></div>
                    <div className='col-4'>
                        <h3>Create A New User</h3>
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Create User" aria-label="Search" value={this.state.inputValue} onChange={this.updateInputValue} />
                            <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Add User</button>
                        </form>
                    </div>
                    <div className='col-6'>
                        <h3>User List</h3>
                        <div id='containerList col-6'><UserList state={this.state} handleUserClick={this.handleUserClick} removeUser={this.removeUser} /> </div>
                    </div>
                </div>
            </div>
        </>)
    }

}

export default User