import { Component } from "@angular/core";

import { Product } from "./product";
import { ProductService } from "./product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent {
  pageTitle = "Product Detail";
  product: Product;
  errorMessage: string;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    const id = +this.router.snapshot.paramMap.get("id"); // + casts route param 'id' to a number
    this.getProduct(id); // do async requests in ngOnInit to get this product's data
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product) => this.onProductRetrieved(product),
      error: (err) => (this.errorMessage = err),
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = "No product found";
    }
  }
}
