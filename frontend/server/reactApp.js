import React from 'react'
import ReactDom from 'react-dom/server'
import Helmet from 'react-helmet'
import { createStore, combineReducers } from 'redux'
import { match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { renderToStringWithData } from "react-apollo/server"

import renderHtmlPage from './renderHtmlPage'

import routes from '../routes'
import CompaniesShow from '../components/pages/CompaniesShow'

const amatch = async (...args) => new Promise((resolve, reject) => {
  match(...args, (error, redirectLocation, renderProps) => {
    if (error) {
      reject(error)
    } else {
      resolve({ redirectLocation, renderProps })
    }
  })
})

export default async function reactApp(ctx, next) {
  const { redirectLocation, renderProps } = await amatch({
    routes,
    location: ctx.request.url
  })

  if (redirectLocation) {
    ctx.redirect(redirectLocation.pathname + redirectLocation.search)
    return
  }

  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: 'http://192.168.99.100/graphql',
      credentials: 'same-origin',
      headers: ctx.request.headers,
    }),
  })
  const store = createStore(combineReducers({
    apollo: client.reducer(),
    routing: routerReducer,
  }))

  const app = (
    <ApolloProvider client={client} store={store} >
      <RouterContext {...renderProps} />
    </ApolloProvider>
  )

  // note use of var b/c blocks...
  try {
    var { markup, initialState } = await renderToStringWithData(app)
  } finally {
    var head = Helmet.rewind()
  }

  ctx.body = renderHtmlPage(markup, head, initialState)
}
