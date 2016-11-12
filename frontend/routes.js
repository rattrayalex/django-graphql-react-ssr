import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import MainLayout from './components/MainLayout'
import CompaniesList from './components/pages/CompaniesList'
import CompaniesShow from './components/pages/CompaniesShow'
import Error500 from './components/pages/Error500'
import Error404 from './components/pages/Error404'


export default (
  <Route path="/" component={MainLayout}>
    <IndexRedirect to="/companies" />

    <Route path="companies" component={CompaniesList} />
    <Route path="companies/:companyId" component={CompaniesShow} />

    <Route path="*" status={404} component={Error404} />
  </Route>
)

export const Error500Page = (
  <MainLayout>
    <Error500 />
  </MainLayout>
)
