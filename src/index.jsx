import React from 'react';
import { render } from 'react-dom';
import store from './store'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'

import './index.css';
import App from './App'
import Teacher from './views/liveSession/teacher/liveSessionTeacher'
import Student from './views/liveSession/student/liveSessionStudent'
import Reports from './views/reports/reports'

render(
	<Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/memotest" component={App}/>
      <Route path="/memotest/live_session/teacher" component={Teacher}/>
      <Route path="/memotest/live_session/student" component={Student}/>
      <Route path="/memotest/reports" component={Reports}/>
    </Router>
	</Provider>,
	document.getElementById('app')
)