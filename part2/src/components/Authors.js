import React from 'react';
import Search from './Search';
import Author from './Author.js';

class Authors extends React.Component {

 constructor(props) {
 super(props);
 this.state = {
   page:1,
   pageSize:9,
   query:"",
   data:[]
   } 

   this.handleSearch = this.handleSearch.bind(this);
 }

 handleSearch = (e) => {
   this.setState({page:1,query:e.target.value})
   this.searchDetails(e.target.value)
 }

 componentDidMount() {
  const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/authors"

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

 searchDetails = (query) => {
   const url = "http://unn-w15020067.newnumyspace.co.uk/KF6012/part1/api/authors?search=" + query
   fetch(url)
     .then( (response) => response.json() )
     .then( (data) => {
       this.setState({data:data.data})
     })
   .catch ((err) => {
     console.log("something went wrong ", err)
   });
 }

 handlePreviousClick = () => {
   this.setState({page:this.state.page-1})
 }

 handleNextClick = () => {
   this.setState({page:this.state.page+1})
 }

 render() {

   let filteredData =  (
     this.state.data      
   )

   let noOfPages = Math.ceil(filteredData.length/this.state.pageSize)
   if (noOfPages === 0) {noOfPages=1}
   let disabledPrevious = (this.state.page <= 1)
   let disabledNext = (this.state.page >= noOfPages)

   return (
     <div>
       <h1>Authors involved in conference</h1>
       <h2>Click on Author to expand details</h2>
       <Search query={this.state.query} handleSearch={this.handleSearch}/>
       { 
         filteredData
         .slice(((this.state.pageSize*this.state.page)-this.state.pageSize),(this.state.pageSize*this.state.page))
         .map( (details, i) => (<Author key={i} details={details}/>) )
       }
       <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>Previous</button>
       Page {this.state.page} of {noOfPages}
       <button onClick={this.handleNextClick} disabled={disabledNext}>Next</button>
     </div>
   );
 }
}

export default Authors;