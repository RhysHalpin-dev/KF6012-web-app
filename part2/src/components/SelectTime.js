import React from 'react';

class SelectTime extends React.Component {
    render() {
      return (
        <label>
          Time:
          <select value={this.props.time} onChange={this.props.handleTimeSelect}>
            <option value="">Any</option>
            <option value="9:0">9:00 - 10:20</option>
            <option value="11:0">11:00 - 12:20</option>
            <option value="11:30">11:30 - 12:50</option>
            <option value="14:0">14:00 - 15:20</option>
            <option value="14:30">14:30 - 15:50</option>
            <option value="16:0">16:00 - 17:20</option>
            <option value="16:30">16:30 - 17:50</option>
          </select>
        </label>
      )
    }
  }

  export default SelectTime;