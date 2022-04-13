import React from 'react';
import AuthorContent from './AuthorContent';

class Author extends React.Component { 

  state = {
    display: false,
    data: []
  }

  handleAuthorClick = () => {
    this.setState({ display: !this.state.display })
  }


  componentDidMount() {
    const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/authorsContent?id=" + this.props.details.authorId

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)

        this.setState({ data: data.data })
      })
      .catch((err) => {
        console.log("something went wrong ", err)
      }
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.details !== prevProps.details){

      const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/authorsContent?id=" + this.props.details.authorId

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
        <h3>Authors Content:</h3>
        {this.state.data.map((details, i) => (<AuthorContent key={i} details={details} />))}

      </div>
    }

    return (

      <div>
        <h2 onClick={this.handleAuthorClick}>{this.props.details.name}</h2>
        {info}
      </div>
    );
  }
}

export default Author;