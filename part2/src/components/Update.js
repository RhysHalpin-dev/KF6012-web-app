import React from 'react';
import UpdateItem from './UpdateItem.js';

class Update extends React.Component {

    state = { data: [] }

    componentDidMount() {
        const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/slots"
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ data: data.data })
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    render() {
        return (
          <div className="flex-container">
            {this.state.data.map((details,i) => (<UpdateItem key={i} details={details} handleUpdateClick={this.props.handleUpdateClick} admin={this.props.admin}/>))}
          </div>
        );
      }
}

export default Update;