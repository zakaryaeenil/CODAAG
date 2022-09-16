import { Component, OnInit } from '@angular/core';
import {
  ActionP, ActionPsClient,
  ContratObjectif,
  ProjectsClient,
  ProjectsVm, StatutsClient,
  StatutsVm,
  StructuresClient,
  StructuresVm, UpdateActionPCommand
} from "../../../web-api-client";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-action-update',
  templateUrl: './action-update.component.html',
  styleUrls: ['./action-update.component.scss']
})
export class ActionUpdateComponent implements OnInit {
  actionp : ActionP | undefined = new ActionP()

  vmS : StructuresVm
  vmP : ProjectsVm
  vmStatut : StatutsVm

  dropdownList : Array<{ id: number  | undefined; text: string  | undefined}> = [];
  selectedItems : Array<{ id: number  | undefined; text: string  | undefined}>

  dropdownSettings :IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };

  constructor(private liststructure : StructuresClient,
              private listP : ProjectsClient,
              private listStatuts : StatutsClient,
              private UpdateAction : ActionPsClient,
              private toastr : ToastrService,
              private router : Router,
              private route : ActivatedRoute) {
    liststructure.get().subscribe(results =>{
      this.vmS = results
      results.structureDtos?.forEach(x =>{
        this.dropdownList.push({id : x.id, text :x.title})
      })
    })
    listP.get().subscribe(results =>{
      this.vmP = results
    })
    listStatuts.get().subscribe(results =>{
      this.vmStatut = results
    })
    UpdateAction.get2(route.snapshot.params['id']).subscribe(res =>{
      this.actionp = res.actionPDto
      this.selectedItems = []
      console.log(res.actionPDto?.structures , 'structures')
      res.actionPDto?.structures?.forEach(x =>{
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
    console.log(this.selectedItems)
    let  structurelistnumb : number[]  =[];
    this.selectedItems.forEach(x => {
      if (typeof x.id === "number") {
        structurelistnumb.push(x.id)
      }
    })
    this.UpdateAction.update(this.route.snapshot.params['id'],<UpdateActionPCommand>{
      id : this.actionp?.id,
      title : this.actionp?.title,
      note : this.actionp?.note,
      budgR : this.actionp?.budgR,
      startDate : this.actionp?.startDate,
      endDate : this.actionp?.endDate,
      startDatePrv : this.actionp?.startDatePrv,
      endDatePrv : this.actionp?.endDatePrv,
      budgPrv : this.actionp?.budgPrv,
      statutId : this.actionp?.statutId,
      projectId : this.actionp?.projectId,
      structures : structurelistnumb
    }).subscribe(
      result => {

        this.toastr.success("Structure Created successfully !!", "Good Job!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('actions/all');

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
        if (errors && errors.errors && errors.errors.StatutId) {
          errors.errors.StatutId.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })
        }
        if (errors && errors.errors && errors.errors.ProjectId) {
          errors.errors.ProjectId.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })
        }
        if (errors && errors.errors && errors.errors.StartDate) {
          errors.errors.StartDate.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })

        }
        if (errors && errors.errors && errors.errors.EndDate) {
          errors.errors.EndDate.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })

        }
        if (errors && errors.errors && errors.errors.StartDatePrv) {
          errors.errors.StartDatePrv.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })

        }
        if (errors && errors.errors && errors.errors.EndDatePrv) {
          errors.errors.EndDatePrv.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })

        }

      }
    )
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
