import { Link } from 'react-router'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CompanyQuery = gql`
  query Company($companyId: ID!) {
    company(id: $companyId) {
      id
      name
      jobs {
        edges {
          job: node {
            id
            title
          }
        }
      }
    }
  }
`;

const Company = ({ data: { company } }) => (company ?
  <div>
    I am in Company Page!
    <div><strong>{company.name}</strong></div>
    <div>Jobs:</div>
    <ul>
      {company.jobs.edges.map(({ job }) =>
        <li key={job.id}>
          {job.title}
        </li>
      )}
    </ul>
  </div>
: null)

export default graphql(CompanyQuery, {
  options: ({ params: { companyId } }) => ({ variables: { companyId }})
})(Company)