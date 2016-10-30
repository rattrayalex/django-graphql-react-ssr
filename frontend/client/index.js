import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import StateWrapper from 'components/StateWrapper'
import reducers from 'flux/reducers'


// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
const client = new ApolloClient();

const store = createStore(
  combineReducers({
    // ...reducers,
    apollo: client.reducer(),
    routing: routerReducer,
  }),
  window.__INITIAL_STATE__,
  compose(
    applyMiddleware(client.middleware()),
  )
)
const history = syncHistoryWithStore(browserHistory, store)


const App = () => (
  <StateWrapper store={store} history={history} client={client} >
    <div>hello</div>
  </StateWrapper>
)

// TODO: use a constant, reference in renderHtmlPage
const target = document.getElementById('react-container')
ReactDOM.render(<App />, target)
console.log('aiight')
