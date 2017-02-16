'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./api/client')
// end::vars[]

// tag::app[]
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: "Thomas"};
    }

    componentDidMount() {
        client({method: 'GET', path: '/admin-profile'}).done(response => {
            this.setState({employees: response.entity.firstname});
            console.log(response);
        }, response => {
            if (response.status.code === 403) {
                alert('ACCESS DENIED: You are not authorized to update ');
            }
            if (response.status.code === 412) {
                alert('DENIED: Unable to update. Your copy is stale.');
            }
        });
    }

    render() {

        return (
            <div>
                Bonjour {this.state.employees}
            </div>
        )
    }
}
// end::app[]


// tag::render[]
ReactDOM.render(
    <App />,
    document.getElementById('react')
)
// end::render[]