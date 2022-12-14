import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crud';
  displayedColumns: string[] = ['productName', 'category','freshness','date', 'price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog : MatDialog, private api:ApiService){
}
  openDialog() {
    this.dialog.open(DialogComponent,{
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }
  ngOnInit(): void {
      this.getAllProducts();
  }
  getAllProducts() {
    this.api.getProduct()
    .subscribe({next:(res)=>{
      //console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:(err)=>{
      alert('error while fetching products');
    }
  })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{width:'30%',data:row}).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert('Product Delete Success')
        this.getAllProducts();
      },
      error:(err)=>{
        alert('Product Delete Error')
      }
    })
  }
}
