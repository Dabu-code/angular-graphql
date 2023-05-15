import {gql} from 'apollo-angular';

export const updateSchema=gql`
mutation updateProduct($id:ID!,$title:String!, $price:Float!, $description:String!, $images:[String!]!) {
  updateProduct(
    id: $id, 
    changes: { 
      title: $title
      price: $price
      description: $description
      images: $images
     }
  ) {
    id
    title
    price
    images
    description
  }
}

`;