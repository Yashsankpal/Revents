/*jshint esversion: 6*/
/*jshint ignore:start*/
import React,{Component, Fragment} from 'react';
import EventDashboard from '../../features/Event/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/navbar/Navbar';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';
import homepage from '../../features/Homepage/homepage';
import EventCreate from '../../features/Event/EventCreation/EventCreate';
import Settingsdashboard from '../../features/Event/user/settings/Settingsdashboard';
import Userdashboard from '../../features/Event/user/userDashboard/Userdashboard';
import EventDetailed from '../../features/Event/EventDetailed/EventDetailed';
import UserDetailed from '../../features/Event/user/UserDetailed';
import testComponent from '../../test/testComponent';


class App extends Component {
  render(){
    return (
    <Fragment>
      <Route exact path='/' component={homepage}/>
      <Route 
      path='/(.+)' 
      render={()=>(
        <Fragment>
          <Navbar className='navbar-bg'></Navbar>
          <Container className="main">
            <Route path='/events' component={EventDashboard}/>
            <Route path='/eventCreation' component={EventCreate}/>
            <Route path='/people' component={Userdashboard}/>
            <Route path='/events/:id' component={EventDetailed}/>
            <Route path='/profile/:id' components={UserDetailed}/>
            <Route path='/settings' component={Settingsdashboard}/>
            <Route path='/test' component={testComponent}/>
            <Route path='/detailpage/:id' component={EventDetailed}/>
          </Container>
          </Fragment>
      )}/>
    </Fragment>
      );
}
}

export default App;
/* jshint ignore:end */