import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { getSchema } from '../schema/get.graphql';
import { productInterface } from '../interfaces/product';
import { showSchema } from '../schema/show.graphql';
import { createSchema } from '../schema/create.graphql';
import { deleteSchema } from '../schema/delete.graphql';
import { updateSchema } from '../schema/update.graphql';
import { postTypeApolloUtils } from './utils/apollo.util';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  private _refreshData$ = new Subject<void>();

  constructor(private apollo: Apollo) {}

  get refreshData() {
    return this._refreshData$;
  }


  findById(id: any): Observable<productInterface> {
    return this.apollo.query({
      query: getSchema,
      variables: { id }
    }).pipe(map((res: any) => postTypeApolloUtils.filter(res.data.product)));
  }

  show(): Observable<productInterface[]> {
    return this.apollo.query({ query: showSchema }).pipe(
      map((res: any) => {
        return (res.data.products).map((filter: productInterface) => postTypeApolloUtils.filter(filter));
      })
    )
  }

  create(data: productInterface): Observable<productInterface> {
    return this.apollo.mutate({
      mutation: createSchema,
      variables: {
        title: data.title,
        price: data.price,
        description: data.description,
        images: data.images
      }
    }).pipe(
      map((res: any) => postTypeApolloUtils.filter(res.data.addProduct)),
      tap(() => this.refreshData.next())
    );

  }

  update(data: productInterface): Observable<productInterface> {
    return this.apollo.mutate({
      mutation: updateSchema,
      variables: {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        images: data.images
      }

    }).pipe(
      map((res: any) => postTypeApolloUtils.filter(res.data.updateProduct)),
      tap(() => this.refreshData.next())
    );
  }

  delete(id: any): Observable<boolean> {
    return this.apollo.mutate({
      mutation: deleteSchema,
      variables: { id },
      refetchQueries: [{
        query: showSchema
      }]
    }).pipe(
      map((res: any) => res.data.deleteProduct),
      tap(() => this.refreshData.next())
    );
  }


}
