import React from 'react'
import { ApolloProvider } from 'react-apollo';
import { Router, Route, browserHistory } from 'react-router'
import Routes from 'components/Routes'

export default ({ children, store, history, client }) => (
  <ApolloProvider client={client} store={store}>
    <Routes history={history} >
      {children}
    </Routes>
  </ApolloProvider>
)
