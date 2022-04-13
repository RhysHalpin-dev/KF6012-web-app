import React from 'react';

class SelectType extends React.Component {
  render() {
    return (
      <div>
        <label>
          Session type:
          <select value={this.props.type} onChange={this.props.handleTypeSelect}>
            <option value="">Any</option>
            <option value="Paper">Paper</option>
            <option value="casestudy">casestudy</option>
            <option value="altchi">altchi</option>
          </select>
        </label>
      </div>
    )

  }
}
export default SelectType;