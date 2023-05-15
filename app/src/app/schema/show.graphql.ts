import {gql} from 'apollo-angular';

export const showSchema=gql`
query {
  products {
    id
    title
    price
    description
    images
  }
}
`;