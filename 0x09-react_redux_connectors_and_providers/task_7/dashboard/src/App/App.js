import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css} from 'aphrodite';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import {AppContext, defaultUser } from './AppContext'
import { connect } from 'react-redux';


const styles = StyleSheet.create({
  AppBody: {
    fontSize: '1.1rem',
    paddingLeft: 10,
    margin: 0,
    minHeight: 350
  }
})


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      displayDrawer: false,
      user: defaultUser,
      listCourses: [
        {id: 1, name: 'ES6', credit: 60},
        {id: 2, name: 'Webpack', credit: 20},
        {id: 3, name: 'React', credit: 40}
      ],
      listNotifications: [
        {id: 1, type:"default", value: "New course available", html:{__html:null}},
        {id: 2, type:"urgent", html:{__html:"Object Oriented Programming intro"}},
        {id: 3, type:"default", value: "Present Javascript project requirements test on Friday"}
      ]
    }
  }

  logOut = () => {
    this.setState({user: defaultUser})
  }

  logIn = (email, password) => {
    const currentUser = {email:email, password:password, isLoggedIn: true}
    this.setState({user: currentUser })
  }

  handleDisplayDrawer = () => {
    this.setState({displayDrawer: true})
  }

  handleHideDrawer = () => {
    this.setState({displayDrawer: false})
  }

  markNotificationAsRead = (id) => {
    const Notifications = this.state.listNotifications
    this.setState({listNotifications: Notifications.filter((notif)=> id != notif.id )})
  }

  componentDidMount() {
    this.alert()
  }

  alert() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.code =='KeyH'){
        e.preventDefault()
        this.props.logOut()
        alert('Logging you out')
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', alert)
  }

  render () {
    const currentUser = this.state.user
    const logOut = this.logOut
    const displayDrawerState = this.state.displayDrawer;
    const showDrawer = this.handleDisplayDrawer;
    const hideDrawer = this.handleHideDrawer;
    const LoginStatus = () => {
      if (currentUser.isLoggedIn) {
        return (
          <BodySectionWithMarginBottom title="Course List">
            <CourseList listCourses={this.state.listCourses}/>
          </BodySectionWithMarginBottom>
        )
      } else {
        return (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={this.logIn}/>
          </BodySectionWithMarginBottom>
        )
    }
    
  }
  return (
    <AppContext.Provider value={{currentUser, logOut}}>
      <Notifications displayDrawer={displayDrawerState} showDrawer={showDrawer} hideDrawer={hideDrawer}
      listNotifications={this.state.listNotifications} markNotificationAsRead={this.markNotificationAsRead}/>
      <Header/>
      <div className={css(styles.AppBody)}>
        {LoginStatus()}
        <BodySection title="News from the School">
          <p>
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
          </p>
        </BodySection>
      </div>
      <Footer />
    </AppContext.Provider>
  );
  }
}

export const mapStateToProps = (state) => {
  return { isLoggedIn: state.get("isUserLoggedIn") }
}

connect(mapStateToProps
