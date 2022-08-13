import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  FreshList = ['Brand New', 'Second Hand', 'Refurbished'];
  ProductForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  addProduct(){
    //console.log(this.ProductForm.value)
    if(this.ProductForm.valid){
      this.api.postProduct(this.ProductForm.value)
      .subscribe({
        next:(res) => {
          alert('product added')
          this.ProductForm.reset();
          this.dialogRef.close('save');
        },
        error:(err) => {
          alert('error creating')
        }
      })
    }
  }
}
