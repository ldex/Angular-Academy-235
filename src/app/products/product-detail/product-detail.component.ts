import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  delete() {
    if(window.confirm('Are you sure ?')) {
      this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/home');
        }
      )
    }
  }

  ngOnInit(): void {
  }

}
