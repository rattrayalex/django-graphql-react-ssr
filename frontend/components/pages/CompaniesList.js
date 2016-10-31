import React from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag';

const CompaniesQuery = gql`
  query Companies {
    allCompanies {
      edges {
        company: node {
          id
          name
        }
      }
    }
  }
`;

class Companies extends React.Component {
  render() {
    const { data: { allCompanies} } = this.props
    return (
      <div>
        Companies:
        <ul>
          {allCompanies && allCompanies.edges.map(({ company }) =>
            <li key={company.id}>
              <Link to={`/companies/${company.id}`}>{company.name}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

// const Companies = ({ data: { allCompanies } }) => (
//   <div>
//     Companies:
//     <ul>
//       {allCompanies && allCompanies.edges.map(({ company }) =>
//         <li key={company.id}>
//           <Link to={`/companies/${company.id}`}>{company.name}</Link>
//         </li>
//       )}
//     </ul>
//   </div>
// )

export default graphql(CompaniesQuery)(Companies)
