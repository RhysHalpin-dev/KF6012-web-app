import React from 'react';
import SessionContent from './SessionContent';

class Session extends React.Component {

  state = {
    display: false,
    data: []
  }

  handleSessionClick = () => {
    this.setState({ display: !this.state.display })
  }

  componentDidMount() {
    const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/sessionsContent?id=" + this.props.details.sessionId

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

  componentDidUpdate(prevProps) {
    if (this.props.details !== prevProps.details) {

      const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/sessionsContent?id=" + this.props.details.sessionId

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

    let info = "";

    if (this.state.display) {
      info = <div>
        <h2> Presentations In session: </h2>
        {this.state.data.map((details, i) => (<SessionContent key={i} details={details} page={this.props.page} dayString={this.props.dayString} sessionId={this.props.details.sessionId} />))}


      </div>
    }

    return (
      <div> 
        <h2> Session details: </h2>
        <table onClick={this.handleSessionClick}>
          <thead>
            <tr>
              <th className="th1">Session:</th>
              <th>Session Type:</th>
              <th>Room:</th>
              <th>Chair:</th>
              <th>Day:</th>
              <th>Start:</th>
              <th className="th7">End:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td1">{this.props.details.name} </td>
              <td>{this.props.details.type} </td>
              <td>{this.props.details.location}</td>
              <td>{this.props.details.chair}</td>
              <td>{this.props.details.dayString}</td>
              <td>{this.props.details.startHour + ":" + this.props.details.startMinute}</td>
              <td className="td7">{this.props.details.endHour + ":" + this.props.details.endMinute}</td>
            </tr>
          </tbody>
        </table>
        <br></br>

        {info}
      </div>
    );
  }
}

export default Session;