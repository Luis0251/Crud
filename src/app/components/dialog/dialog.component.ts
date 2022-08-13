import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  FreshList = ['Brand New', 'Second Hand', 'Refurbished'];
  ProductForm!: FormGroup;
  actionBtn: string = 'save';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  //Validator
  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    //console.log(this.editData)
    //Edit data
    if (this.editData) {
      this.actionBtn = 'Update';
      this.ProductForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.ProductForm.controls['category'].setValue(this.editData.category);
      this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
      this.ProductForm.controls['price'].setValue(this.editData.price);
      this.ProductForm.controls['comment'].setValue(this.editData.comment);
      this.ProductForm.controls['date'].setValue(this.editData.date);
    }
  }
  //agregar Producto
  addProduct() {
    //console.log(this.ProductForm.value)
    if (!this.editData) {
      if (this.ProductForm.valid) {
        this.api.postProduct(this.ProductForm.value).subscribe({
          next: (res) => {
            alert('product added');
            this.ProductForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error creating');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  //modificar producto
  updateProduct() {
    this.api.putProduct(this.ProductForm.value, this.editData.id).subscribe({
      next: () => {
        alert('product updated');
        this.ProductForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('error while updating product');
      }
    });
  }
}
