import { Component, OnInit } from '@angular/core';
import {
  ContratObjectifsClient,
  ContratObjectifsVm,
  Structure,
  StructuresClient,
  StructuresVm, UpdateStructureCommand
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {IDropdownSettings} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-structure-update',
  templateUrl: './structure-update.component.html',
  styleUrls: ['./structure-update.component.scss']
})
export class StructureUpdateComponent implements OnInit {

  structure : Structure | undefined = new Structure()
  vm : StructuresVm
  contratsVm : ContratObjectifsVm
  sp : number;

  dropdownList : Array<{ id: number  | undefined; text: string  | undefined}> = [];
  selectedItems : Array<{ id: number  | undefined; text: string  | undefined}>  ;
  dropdownSettings :IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };


  constructor(private listStructures : StructuresClient,
              private listco : ContratObjectifsClient,
              private toastr : ToastrService,
              private router : Router,
              private route : ActivatedRoute) {
    listStructures.get().subscribe(results =>{
      this.vm = results
    })
    listco.get().subscribe(
      results =>{
        this.contratsVm = results;
        results.contratObjectifDtos?.forEach(x =>{
          this.dropdownList.push({id : x.id, text :x.title})
        })
      }
    )
    listStructures.get2(route.snapshot.params['id']).subscribe(res =>{
        this.structure = res.structureDto
        this.selectedItems = []
        res.structureDto?.contratObjectifs?.forEach(x =>{
          this.dropdownList.forEach(xx =>{
            if (xx.id == x.id){
              this.onItemSelect(xx)
            }
          })
        })
    })
  }

  ngOnInit(): void {
   }




  onSubmit(){
    let  contartlistnumb : number[]  =[];
    this.selectedItems.forEach(x => {
      if (typeof x.id === "number") {
        contartlistnumb.push(x.id)
      }
    })
   console.log(contartlistnumb)
    console.log(this.sp)
   this.listStructures.update(this.route.snapshot.params['id'],<UpdateStructureCommand>{
     id : this.structure?.id,
     title: this.structure?.title,
     comment: this.structure?.note,
     startD: this.structure?.startDate,
     endD: this.structure?.endDate,
     parent: this.sp,
     contrats : contartlistnumb
   }).subscribe(
     result => {

       this.toastr.success("Structure " +this.structure?.id+" Updated successfully !!", "Good Job!", {
         timeOut: 3000
       })
       this.router.navigateByUrl('structures/all');

     },
     error => {

       let errors = JSON.parse(error.response);
       if (errors && errors.errors && errors.errors.Title) {
         errors.errors.Title.forEach((e: string | undefined) => {
           this.toastr.error(e, "Major Error!", {
             timeOut: 4000
           });
         })
       }
       if (errors && errors.errors && errors.errors.startD) {
         errors.errors.startD.forEach((e: string | undefined) => {
           this.toastr.error(e, "Major Error!", {
             timeOut: 4000
           });
         })

       }
       if (errors && errors.errors && errors.errors.endD) {
         errors.errors.endD.forEach((e: string | undefined) => {
           this.toastr.error(e, "Major Error!", {
             timeOut: 4000
           });
         })

       }
       console.log(errors)
     }
   )
  }
  onItemSelect(item : any) {
   // console.log(item)
    this.selectedItems.push(item)
  }
  onSelectAll(items: any) {
    this.selectedItems = items
  }
  deSelect(item : any) {
    // this.selectedItems = []
    this.selectedItems = this.selectedItems.filter(i => i.id != item.id);
    //console.log(this.selectedItems)
  }
  deSelectAll(items: any) {
    this.selectedItems = []
  }
}
