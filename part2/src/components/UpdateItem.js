import React from 'react';

class UpdateItem extends React.Component {

    state = { name: this.props.details.name }

    handleDescriptionChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleDescriptionUpdate = () => {
        this.props.handleUpdateClick(this.props.details.sessionId, this.state.name)
    }

    render() {
        let adminUpdate = ""
        let content = ""
        if (this.props.admin === "1") {

            content = <textarea
                rows="auto" cols="auto"
                value={this.state.name}
                onChange={this.handleDescriptionChange}
            />
            
            adminUpdate = <button className="updateButton" onClick={this.handleDescriptionUpdate}>Update</button>

        }
        return (
            <div className="flex-item">
                <h2>{this.props.details.name}  Session ID:{this.props.details.sessionId}</h2>
                <p>chair: {this.props.details.chair} Room: {this.props.details.location}</p>
                <p>session type: {this.props.details.type}</p>
                {content}
                {adminUpdate}
            </div>

        );
    }
}

export default UpdateItem;