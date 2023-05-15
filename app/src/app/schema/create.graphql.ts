import {gql} from 'apollo-angular';

export const createSchema=gql`
mutation addProduct($title:String!, $price:Float!, $description:String!, $images:[String!]!) {
  addProduct(
    data: {
      title: $title
      price: $price
      description: $description
      categoryId: 1
      images: $images
    }
  ) {
    id
    title
    price
    description
    images
   
  }
}
`;