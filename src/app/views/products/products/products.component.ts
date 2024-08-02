import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductType } from 'src/types/product.type';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) { }

  products: ProductType[] = [];
  loading: boolean = false;

  private subscription: Subscription | null = null;

  ngOnInit() {
    // this.products = this.productService.getProducts();

    this.loading = true;
    this.subscription = this.productService.getProducts()
    .pipe(
      tap(() => {
        this.loading = false;
      })
    )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            console.log('next');
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
