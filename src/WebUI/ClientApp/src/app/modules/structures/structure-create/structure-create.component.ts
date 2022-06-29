import {Component, OnInit} from '@angular/core';
import {
  ContratObjectifsClient,
  ContratObjectifsVm, CreateStructureCommand,
  StructuresClient,
  StructuresVm
} from "../../../web-api-client";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-structure-create',
  templateUrl: './structure-create.component.html',
  styleUrls: ['./structure-create.component.scss']
})
export class StructureCreateComponent implements OnInit {

  //Init
  vm : StructuresVm
  contratsVm : ContratObjectifsVm

  startD : Date
  endD : Date
  title : string="";
  comment : string="";
  sp : number;

  dropdownList : Array<{ id: number  | undefined; text: string  | undefined}> = [];
  selectedItems : Array<{ id: number  | undefined; text: string  | undefined}> = [];
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
              private listco : ContratObjectifsClient ,
              private toastr : ToastrService,
              private router : Router) {
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
  }

  onSubmit() {
  let  contartlistnumb : number[]  =[];
    this.selectedItems.forEach(x => {
      if (typeof x.id === "number") {
        contartlistnumb.push(x.id)
      }
    })
    console.log(contartlistnumb)
    this.listStructures.create(<CreateStructureCommand><unknown>{
      title: this.title,
      comment: this.comment,
      startD: this.startD,
      endD: this.endD,
      parent: this.sp,
      contrats : contartlistnumb
    }).subscribe(
      result => {

          this.toastr.success("Structure " +result+" Created successfully !!", "Good Job!", {
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

  ngOnInit(): void {

  }

  onItemSelect(item : any) {
    this.selectedItems.push(item)
  }
  onSelectAll(items: any) {
    this.selectedItems = items
  }
  deSelect(item : any) {
   // this.selectedItems = []
    this.selectedItems = this.selectedItems.filter(i => i.id != item.id);
    console.log(this.selectedItems)
  }
  deSelectAll(items: any) {
    this.selectedItems = []
  }
}
