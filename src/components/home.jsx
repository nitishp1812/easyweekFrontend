import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import './home.css';
import About from './about';



export default class Home extends Component {
  constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        show: false
      };
    }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get('username');
    const courses = data.get('courses');
    const major = data.get('major');
    const standing = data.get('standing');
    const techCourses = data.get('techCourses');
    const minimumCredits = data.get('minimumCredits');
    const maximumCredits = data.get('maximumCredits');
    const minorCourses = data.get('minor');

    const obj = {
      name: name,
      courses: courses,
      major: major,
      standing: standing,
      techCourses: techCourses,
      minimumCredits: minimumCredits,
      maximumCredits: maximumCredits,
      minorrelatedCourses: minorCourses
    };
    var request = new XMLHttpRequest();
    request.open("POST", "http://0.0.0.0:5000/register");
    request.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
    request.send(JSON.stringify(obj))
    console.log("Done")

    request.open("GET", "http://0.0.0.0:5000/register")
    request.onload = function() {
      var schedule = JSON.parse(request.responseText);
      if (request.readyState == 4 && request.status == "200") {
          console.log(schedule)
      } else {
          console.error(schedule)
      }
    }

   //  event.preventDefault();
   //  fetch('localhost:5000/register', {
   //   method: 'post',
   //   headers: {'Content-Type':'application/json'},
   //   body: JSON.stringify(obj)
   // }).then((response) => {
   //   console.log("Post sent status: " + response.status)
   //
   // })
   this.setState({ show: true });

    // this.props.history.push('/about')
    //send all of information to backend
    //recieve schedule output
    // route to new page to display schedule output
  }
render() {
    return (
      <div>
      <Grid>
        <Jumbotron>
          <h2> Welcome to EasyWeek </h2>
          <p> This is the ideal schedule optimizer app! </p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Enter your name  </label>
              <input id="username" name="username" type="text" />
            </div>
            <div>
              <label htmlFor="year">Enter academic year </label>
              <input id="year" name="year" type="text" />
            </div>
            <div>
              <label htmlFor="semester">Enter the term for which to schedule courses </label>
              <input id="semester" name="semester" type="text" />
            </div>
            <div>
              <label htmlFor="birthdate">Enter the courses you have already taken (Ex. CS 125, MATH 241 etc.)  </label>
              <input id="courses" name="courses" type="text" />
              </div>
            <div>
              <label htmlFor="major">Enter your major (CS, CE etc.) </label>
              <input id="major" name="major" type="text" />
            </div>
            <div>
              <label htmlFor="standing">Enter your standing (Freshman, Sophmore etc.)  </label>
              <input id="standing" name="standing" type="text" />
            </div>
            <div>
              <label htmlFor="techCourses">Enter the maximum amount of technical courses you are willing to take</label>
              <input id="techCourses" name="techCourses" type="text" />
            </div>
            <div>
              <label htmlFor="standing">Maximum number of credits you are willing to take</label>
              <input id="maximumCredits" name="maximumCredits" type="text" />
            </div>
            <div>
              <label htmlFor="standing">Minimum number of credits you are willing to take</label>
              <input id="minimumCredits" name="minimumCredits" type="text" />
            </div>
            <button>Send data!</button>
          </form>
        </Jumbotron>
      </Grid>
      <div>
        <About show={this.state.show}>

        </About>
      </div>
      </div>

    )
  }
}
