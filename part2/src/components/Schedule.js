import React from 'react';
import Search from './Search.js';
import Session from './Session.js';
import SelectDay from './SelectDay.js';
import SelectType from './SelectType.js';
import SelectTime from './SelectTime.js';



class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 9,
      type: "",
      query: "",
      dayString: "",
      time: "",
      data: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDaySelect = this.handleDaySelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleTimeSelect = this.handleTimeSelect.bind(this);
  }
  handleMoreClick = () => {
    this.setState({ page: this.state.page + 1 })
  }

  handleSelect = (e) => {
    this.setState({ time: e.target.value })
  }

  handleSearch = (e) => {
    this.setState({ page: 1, query: e.target.value })
  }

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 })
  }

  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 })
  }

  searchString = (s) => {
    return s.toLowerCase().includes(this.state.query.toLowerCase())
  }

  searchDetails = (details) => {
    return ((this.searchString(details.slotId) || this.searchString(details.name))) 
  }

  selectTypeDetails = (details) => {
    return ((this.state.type === details.type) || (this.state.type === ""))
  }

  selectTimeDetails = (details) => {
    return ((this.state.time === details.startHour + ":" + details.startMinute) || (this.state.time === ""))
    
  }

  selectDayDetails = (details) => {
    return ((this.state.dayString === details.dayString) || (this.state.dayString === ""))
  }

  handleDaySelect = (e) => {
    this.setState({ page: 1, dayString: e.target.value })
  }

  handleTypeSelect = (e) => {
    this.setState({ page: 1, type: e.target.value })
  }

  handleTimeSelect = (e) => {
    this.setState({ page: 1, time: e.target.value })
  }
  componentDidMount() {
    const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/slots"

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

  render() {
    let filteredData = (
      this.state.data
        .filter(this.selectDayDetails)
        .filter(this.selectTypeDetails)
        .filter(this.selectTimeDetails)
        .filter(this.searchDetails)
        
    )

    let noOfPages = Math.ceil(filteredData.length / this.state.pageSize)
    if (noOfPages === 0) { noOfPages = 1 }

    let disabledPrevious = (this.state.page <= 1)
    let disabledNext = (this.state.page >= noOfPages)

    return (
      <div>
        <h1> Conference schedule </h1>

        <Search query={this.state.query} handleSearch={this.handleSearch} />
        <SelectType type={this.state.type} handleTypeSelect={this.handleTypeSelect} />
        <SelectDay dayString={this.state.dayString} handleDaySelect={this.handleDaySelect} />
        <SelectTime time={this.state.time} handleTimeSelect={this.handleTimeSelect} />
        <h2>click on session to expand details</h2>
        {filteredData
          .slice(((this.state.pageSize * this.state.page) - this.state.pageSize), (this.state.pageSize * this.state.page))
          .map((details, i) => (<Session key={i} details={details} page={this.state.page} dayString={this.state.dayString} />))}
        <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
          Page {this.state.page} of {noOfPages}
        <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>

      </div>
    );
  }
}

export default Schedule;