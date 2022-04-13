import React from 'react';


class AuthorsInvolved extends React.Component {

    render() {

        return (

            <div>
                <p>{this.props.details.name}</p>
            </div>
        );
    }
}

export default AuthorsInvolved;