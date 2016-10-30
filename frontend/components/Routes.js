import { IndexRedirect, Router, Route } from 'react-router'

import MainLayout from './MainLayout'
import CompaniesList from './pages/CompaniesList'
import CompaniesShow from './pages/CompaniesShow'


export default ({ history }) => (
  <Router history={history}>
    <Route path="/" component={MainLayout}>
      <IndexRedirect to="/companies" />

      <Route path="companies" component={CompaniesList} />
      <Route path="companies/:companyId" component={CompaniesShow} />
    </Route>
  </Router>
)
