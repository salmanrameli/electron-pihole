import React from 'react';

const electron = window.require('electron')
const Store = electron.remote.require('electron-store');
const store = new Store();

class Root extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
            password: ''
        }

        this.handleUrlSubmit = this.handleUrlSubmit.bind(this)
        this.handleUrlEntered = this.handleUrlEntered.bind(this)
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
        this.handlePasswordEntered = this.handlePasswordEntered.bind(this)
    }

    componentDidMount() {
        let url = store.get('url')
        let password = store.get('password')

        this.setState({
            url: url,
            password: password
        })
    }

    handleUrlEntered = (e) => {
		this.setState({
			url: e.target.value
		})
    }
    
    handlePasswordEntered = (e) => {
		this.setState({
			password: e.target.value
		})
	}

    handleUrlSubmit(e) {
        let url = e.target.piholeAdminUrl.value
        let http = "http://"
        let final_url

        if(url.substring(0, 7) !== "http://") {
            if(url.substring(0, 8) === "https://") {
                let url_substring = url.substr(8)

                final_url = http.concat(url_substring)

                store.set('url', final_url)
            } else {
                final_url = http.concat(url)

                store.set('url', final_url)
            }
        }
    }

    handlePasswordSubmit(e) {
        let password = e.target.piholePassword.value

        store.set('password', password)
    }

    render() {
        return(
            <div className="col-md-12">
                <div className="pb-2 mt-4 mb-2 border-bottom">
                    <h1>Setting</h1>
                </div>
                <div className="card">
					<div className="card-body">
						<form id="piholeAdminUrl" onSubmit={this.handleUrlSubmit}>
							<div className="form-group">
                                <label className="form-label" htmlFor="piholeAdminUrl">Pi-Hole Admin URL:</label>
                                <input className="form-control form-control-lg" type="text" name="piholeAdminUrl" placeholder={this.state.url} onChange={e => this.handleUrlEntered(e)} />
							</div>
                            <button className="btn btn-success" type="submit"><i className="fa fa-bookmark"></i> Save URL</button>
						</form>
					</div>
				</div>
                <br></br>
                <div className="card">
                    <div className="card-body">
                        <form id="piholePassword" onSubmit={this.handlePasswordSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="piholePassword">Pi-Hole Password:</label>
                                <input className="form-control form-control-lg" type="text" name="piholePassword" value={this.state.password} onChange={e => this.handlePasswordEntered(e)} />
                            </div>
                            <button className="btn btn-success" type="submit"><i className="fa fa-bookmark"></i> Save Password</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Root