import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import MainLayout from './Components/MainLayout'
import CompaniesList from './Components/pages/CompaniesList'
import CompaniesShow from './Components/pages/CompaniesShow'


export default (
  <Route path="/" component={MainLayout}>
    <IndexRedirect to="/companies" />

    <Route path="companies" component={CompaniesList} />
    <Route path="companies/:companyId" component={CompaniesShow} />
  </Route>
)
