import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Product } from "../product";

@Component({
  templateUrl: "./product-edit-info.component.html",
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) productForm: NgForm;

  errorMessage: string;
  product = {
    id: 1,
    productName: "test",
    productCode: "test",
    description: "test",
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve the data from the parent route using its resolved route data
    this.route.parent.data.subscribe((data) => {
      if (this.productForm) {
        // Reset form validation state when route changes
        this.productForm.reset(); // resets validation state on productForm
      }
      this.product = data["resolvedProductData"].product;
    });
  }
}
