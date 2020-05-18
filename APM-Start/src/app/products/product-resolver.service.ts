import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Product, ProductResolved } from "./product";
import { Observable, of } from "rxjs";
import { ProductService } from "./product.service";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductResolverService implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    // Fetch product specific data
    const id = route.paramMap.get("id");
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ product: null, error: message });
    }
    /*
      DON'T need to subscribe() to getProduct(), Resolvers manages the subscription for us
      and does not continue until the data is returned and sub is complete
    */
    return this.productService.getProduct(+id).pipe(
      map((product) => ({ product: product })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
  }
}
