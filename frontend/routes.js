import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import MainLayout from './components/MainLayout'
import CompaniesList from './components/pages/CompaniesList'
import CompaniesShow from './components/pages/CompaniesShow'


export default (
  <Route path="/" component={MainLayout}>
    <IndexRedirect to="/companies" />

    <Route path="companies" component={CompaniesList} />
    <Route path="companies/:companyId" component={CompaniesShow} />
  </Route>
)
