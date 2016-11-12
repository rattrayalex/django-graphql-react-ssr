/* @flow */
import React from 'react'
import ReactDOM from 'react-dom/server'
import Helmet from 'react-helmet'

import { toInteger } from 'lodash'

import { createStore, combineReducers } from 'redux'

import { match, RouterContext } from 'react-router'
import { routerReducer } from 'react-router-redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { renderToStringWithData } from 'react-apollo/server'

import renderHtmlPage from './renderHtmlPage'

import routes from '../routes'

const matchRoute = async (...args) => new Promise((resolve, reject) => {
  match(...args, (error, redirectLocation, renderProps) => {
    if (error) {
      reject(error)
    } else {
      resolve({ redirectLocation, renderProps })
    }
  })
})

async function fetchDataAndRenderBody(app) {
  let renderResult = {}
  let head = null
  try {
    renderResult = await renderToStringWithData(app)
  } finally {
    head = Helmet.rewind()
  }
  const { markup, initialState } = renderResult

  return { markup, head, initialState }
}

function renderErrorPage(errorPage) {
  const initialState = { error: true } // TODO: think of something better...

  let markup = null
  let head = null
  try {
    markup = ReactDOM.renderToString(errorPage)
  } finally {
    head = Helmet.rewind()
  }

  return { markup, head, initialState }
}

function ApolloReduxReactSSR({ reducers, routes, Error500Page, networkInterfaceOptions }) {
  // generate this on boot, b/c it really sucks when your error pages crash
  const errorPage = renderErrorPage(Error500Page)

  return async function apolloReduxReactSSR(ctx: Ctx) {
    const { redirectLocation, renderProps } = await matchRoute({
      routes,
      location: ctx.request.url,
    })

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search)
      return
    }

    const networkInterface = createNetworkInterface(Object.assign({},
      networkInterfaceOptions,
      {
        headers: ctx.request.headers,
      }
    ))
    const client = new ApolloClient({ networkInterface, ssrMode: true })

    const combinedReducers = combineReducers(Object.assign({}, reducers, {
      apollo: client.reducer(),
      routing: routerReducer,
    }))
    const store = createStore(combinedReducers)

    const app = (
      <ApolloProvider client={client} store={store} >
        <RouterContext {...renderProps} />
      </ApolloProvider>
    )
    console.log({app, client, store, renderProps})

    let status = null
    let renderResult = null
    try {
      renderResult = await fetchDataAndRenderBody(app)
      status = renderProps.routes
        .reduce((prev, route) => Math.max(toInteger(route.status), prev), 200)
      console.log(status)
    } catch (error) {
      console.log(error)
      status = 500
      renderResult = errorPage
    }
    const { markup, head, initialState } = renderResult

    ctx.status = status
    ctx.body = renderHtmlPage(markup, head, initialState)
  }
}

export default ApolloReduxReactSSR
