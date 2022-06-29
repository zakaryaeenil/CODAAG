import { Component, OnInit } from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {
  ActionPsClient,
  CreateActionPCommand,
  CreateProjectCommand,
  ProjectsClient,
  ProjectsVm, StatutsClient, StatutsVm, StructuresClient, StructuresVm
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-action-create',
  templateUrl: './action-create.component.html',
  styleUrls: ['./action-create.component.scss']
})
export class ActionCreateComponent implements OnInit {

  vmS : StructuresVm
  vmP : ProjectsVm
  vmStatut : StatutsVm

  startD : Date = new Date();
  endD : Date = new Date();
  startDPrv : Date = new Date();
  endDPrv : Date = new Date();

  title : string="";
  comment : string="";
  codeP : string="";

  budgPrv : number ;
  TauxR : number = 0;
  budgR : number ;

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


  stat : number;
  p : number;

  constructor(private liststructure : StructuresClient,
              private listP : ProjectsClient,
              private listStatuts : StatutsClient,
              private CreateAction : ActionPsClient,
              private toastr : ToastrService,
              private router : Router) {

    liststructure.get().subscribe(results =>{
      this.vmS = results
    })
    listP.get().subscribe(results =>{
      this.vmP = results
    })
    listStatuts.get().subscribe(results =>{
      this.vmStatut = results
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let  structurelistnumb : number[]  =[];
    this.selectedItems.forEach(x => {
      if (typeof x.id === "number") {
        structurelistnumb.push(x.id)
      }
    })
    console.log(structurelistnumb)
    this.CreateAction.create(<CreateActionPCommand>{
      title : this.title,
      note : this.comment,
      tauxR : this.TauxR,
      budgR : this.budgR,
      startDate : this.startD,
      endDate : this.endD,
      startDatePrv : this.startDPrv,
      endDatePrv : this.endDPrv,
      budgPrv : this.budgPrv,
      statutId : this.stat,
      projectId : this.p,
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
