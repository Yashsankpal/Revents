/*jshint esversion: 6*/
/*jshint ignore:start*/
import React,{Component, Fragment} from 'react';
import EventDashboard from '../../features/Event/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/navbar/Navbar';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import homepage from '../../features/Homepage/homepage';
import EventCreate from '../../features/Event/EventCreation/EventCreate';
import Settingsdashboard from '../../features/Event/user/settings/Settingsdashboard';
//import Userdashboard from '../../features/Event/user/userDashboard/Userdashboard';
import EventDetailed from '../../features/Event/EventDetailed/EventDetailed';
import UserDetailedPage from '../../features/Event/user/UserDetailed';
import TestComponent from '../../test/TestComponent';
import NotFound from './NotFound';


class App extends Component {
  render(){
    return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={homepage}/>
        <Route 
        path='/(.+)' 
        render={()=>(
          <Fragment>
            <Navbar className='navbar-bg'></Navbar>
            <Container className="main">
              <Switch>
                <Route path='/events' component={EventDashboard}/>
                <Route path={['/eventCreation','/manage/:id']} component={EventCreate}/>
                <Route path='/events/:id' component={EventDetailed}/>
                <Route path='/profile/:id' component={UserDetailedPage}/>
                <Route path='/settings' component={Settingsdashboard}/>
                <Route path='/test' component={TestComponent}/>
                <Route path='/detailpage/:id' component={EventDetailed}/>
              </Switch>
            </Container>
          </Fragment>
        )}/>
        <Route component={NotFound}/>
      </Switch>
    </Fragment>
      );
}
}

export default withRouter(App);
/* jshint ignore:end */