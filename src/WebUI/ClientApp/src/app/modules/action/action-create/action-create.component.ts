import { Component, OnInit } from '@angular/core';
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {
  ActionPsClient,
  CreateActionPCommand,
  CreateProjectCommand, FileParameter,
  ProjectsClient,
  ProjectsVm, StatutsClient, StatutsVm, StructuresClient, StructuresVm
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-action-create',
  templateUrl: './action-create.component.html',
  styleUrls: ['./action-create.component.scss']
})
export class ActionCreateComponent implements OnInit {

  vmS : StructuresVm
  vmP : ProjectsVm
  vmStatut : StatutsVm
  closeResult : string = "";
  public selectedFile : File ;

  startD : Date = new Date();
  endD : Date = new Date();
  startDPrv : Date = new Date();
  endDPrv : Date = new Date();

  title : string="";
  comment : string="";
  codeP : string="";

  budgPrv : number ;
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
              private modalService: NgbModal,
              private router : Router) {

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

            this.toastr.success("Action Created successfully !!", "Good Job!", {
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
  onselectedChange(event : any){
    this.selectedFile =  event.target.files[0]
    // this.filePara.data = event.target.files[0];
    // this.filePara.fileName = event.target.files[0].name;
  }
  open(content : any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.OnUpload();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${ActionCreateComponent.getDismissReason(reason)}`;
    });
  }
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  OnUpload(){
    let fileParameter: FileParameter = { data: this.selectedFile, fileName: this.selectedFile.name };
    this.CreateAction.createBulk(fileParameter
    ).subscribe(
      results =>{
        this.toastr.info("Actions " +results , "Emmmm!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('actions/all');
      },
      error => {
        let errors = JSON.parse(error.response);
        if (errors && errors.errors && errors.errors.File) {
          errors.errors.Title.forEach((e: string | undefined) => {
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
