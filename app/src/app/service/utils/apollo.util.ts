import { productInterface } from "src/app/interfaces/product";


export class postTypeApolloUtils {


    public static filter(filter: productInterface): productInterface {
        return {
            id: filter.id,
            title: filter.title,
            price: filter.price,
            description: filter.description,
            images: filter.images
        }
    }



}
