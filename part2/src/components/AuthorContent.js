import React from 'react';


class AuthorContent extends React.Component {

    render() {

        return (

            <div>
        <div id="sessionsContent">
                    <div class="grid-container">

                        <div class="c1"></div>
                        <div class="r1Head">presentation:</div>
                        <div class="r2Head">Abstract:</div>
                        <div class="r3Head">Award:</div>
                        <div class="r4Head">Sessions involved in:</div>
                        <div class="r1C">{this.props.details.presentation}</div>
                        <div class="r2C">{this.props.details.abstract}</div>
                        <div class="r3C">{this.props.details.award === "" ? "No Award" : this.props.details.award}</div>
                        <div class="r4C">{this.props.details.session}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthorContent;