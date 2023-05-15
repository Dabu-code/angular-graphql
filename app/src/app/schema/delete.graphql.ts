import {gql} from 'apollo-angular';

export const deleteSchema=gql`
  mutation delete($id:ID!){
    deleteProduct(id: $id)
  }
`;