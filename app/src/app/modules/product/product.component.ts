import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ApolloService } from 'src/app/service/apollo.service';
import { productInterface } from 'src/app/interfaces/product';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductPipe } from './product.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ProductPipe]
})
export class ProductComponent implements OnInit, OnDestroy {

  public dataProducts: productInterface[] = [];
  public form: FormGroup;
  public page: number = 1;
  public searchData = new FormControl('', Validators.required);
  public searchInput: string = '';

  private apolloService = inject(ApolloService);
  private formBuilder = inject(FormBuilder);

  private subscription!: Subscription;

  constructor() {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required]
    })


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.searchData.valueChanges.subscribe((res: any) => { this.searchInput = res.toString() });
    this.show_data();
    this.subscription = this.apolloService.refreshData.subscribe(res => { this.show_data() });
  }

  private show_data() {
    this.apolloService.show().subscribe(res => { this.dataProducts = res });
  }

  public get_data(id: any) {
    let showProduct = document.getElementById('showProduct') as HTMLElement;
    this.apolloService.findById(id).subscribe(res => {
      showProduct.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Detalle Producto</strong> ${res.title}.
        <ul >
          <li class="list-group-item">Precio: ${res.price}</li>
          <li class="list-group-item">Descripción: ${res.description}</li>
          <li class="list-group-item"><img src="${res.images}" alt="" srcset="" width="50"></li>
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      `;
    });
  }

  public btn_modal(item: productInterface | null) {
    if (item) this.form.setValue(item);
    else this.form.reset();
  }

  public btn_save() {
    this.form.value.id ?
      this.apolloService.update(this.form.value).subscribe(res => { alert(this.message(1)) })
      : this.apolloService.create(this.form.value).subscribe(res => { alert(this.message(0)) })
  }

  public btn_eliminar(id: any) {
    this.apolloService.delete(id).subscribe(res => { alert(this.message(2)) });
  }

  private message(action: number): string {
    let msg = [
      'Exito al insertar el registro, en la base de datos',
      'Exito al actualizar el registro, en la base de datos',
      'Exito al eliminar el registro, en la base de datos'
    ]
    return msg[action]
  }


}
