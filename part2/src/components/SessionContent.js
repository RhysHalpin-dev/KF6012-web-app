import React from 'react';
import AuthorsInvolved from './AuthorsInvolved';


class SessionContent extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/authorsInvolved?id=" + this.props.details.contentId

        fetch(url)
            .then((response) => response.json())
            .then((data) => {

                console.log(data)
                this.setState({ data: data.data })
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            }
            );
    }

    componentDidUpdate(prevProps) {
        if ((this.props.details !== prevProps.details)) {

            const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/authorsInvolved?id=" + this.props.details.contentId

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.data)
                    console.log(data)
                    this.setState({ data: data.data })
                })
                .catch((err) => {
                    console.log("something went wrong ", err)
                }
                );

        }


    }

    render() {

        return (

            <div>
                
                <div id="sessionsContent">
                    <div class="grid-container">

                        <div class="c1"></div>
                        <div class="r1Head">presentation:</div>
                        <div class="r2Head">Abstract:</div>
                        <div class="r3Head">Award:</div>
                        <div class="r4Head">Authors Involved:</div>
                        <div class="r1C">{this.props.details.title}</div>
                        <div class="r2C">{this.props.details.abstract}</div>
                        <div class="r3C">{this.props.details.award === "" ? "No Award" : this.props.details.award}</div>
                        <div class="r4C">{this.state.data.map((details, i) => (<AuthorsInvolved key={i} details={details} />))}</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SessionContent;