import {gql} from 'apollo-angular';

export const getSchema=gql`
query product($id:ID!){
    product(id: $id) {
      id
      title
      price
      description
      images
    }
  }
`;