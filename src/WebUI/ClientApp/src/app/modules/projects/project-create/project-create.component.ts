import { Component, OnInit } from '@angular/core';
import {
  ContratObjectifsClient,
  ContratObjectifsVm, CreateActionPCommand, CreateProjectCommand,
  CreateStructureCommand, ProjectsClient, StatutsClient, StatutsVm,
  StructuresClient,
  StructuresVm, TypeProjectsClient, TypeProjectsVm
} from "../../../web-api-client";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  //Init
  StructureVm : StructuresVm
  contratsVm : ContratObjectifsVm
  vmStatut : StatutsVm
  vmTypeProjects : TypeProjectsVm


  startD : Date
  endD : Date
  startDPrv : Date
  endDPrv : Date

  title : string="";
  comment : string="";

  priority : number = 0;
  TauxR : number = 0;
  mode : string="";
  isInit : boolean = true;

  stat : number;
  tp : number;

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

  dropdownList2 : Array<{ id: number  | undefined; text: string  | undefined}> = [];
  selectedItems2 : Array<{ id: number  | undefined; text: string  | undefined}> = [];
  dropdownSettings2 :IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };


  constructor(private createProject : ProjectsClient,
              private listStructures : StructuresClient,
              private listco : ContratObjectifsClient,
              private listStatuts : StatutsClient,
              private  t : TypeProjectsClient,
              private toastr : ToastrService,
              private router : Router) {
    listStructures.get().subscribe(result =>{
       this.StructureVm = result
      result.structureDtos?.forEach(x =>{
        this.dropdownList.push({id : x.id, text :x.codeStructure})
      })
    })
    listco.get().subscribe(result =>{
      this.contratsVm = result
      result.contratObjectifDtos?.forEach(x =>{
        this.dropdownList2.push({id : x.id, text :x.codeCO})
      })
    })
    listStatuts.get().subscribe(result =>{
      this.vmStatut = result
    })
    t.get().subscribe(result =>{
      this.vmTypeProjects = result
    })

  }


  ngOnInit(): void {
  }


  onSubmit(){
    let  structurelistnumb : number[]  =[];
    this.selectedItems.forEach(x => {
      if (typeof x.id === "number") {
        structurelistnumb.push(x.id)
      }
    })
    let  contartlistnumb2 : number[]  =[];
    this.selectedItems2.forEach(x => {
      if (typeof x.id === "number") {
        contartlistnumb2.push(x.id)
      }
    })

    this.createProject.create(<CreateProjectCommand>{
      title : this.title,
      note : this.comment,
      priority : this.priority,
      tauxR : this.TauxR,
      modeReel : this.mode,
      startDate : this.startD,
      endDate : this.endD,
      startDatePrv : this.startDPrv,
      endDatePrv : this.endDPrv,
      statut : this.stat,
      typeProjectId : this.tp,
      structures : structurelistnumb,
      contratObjectifs : contartlistnumb2

    }).subscribe(
      result => {

        this.toastr.success("Project" +result+ "Created successfully !!", "Good Job!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('projects/all');

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
        if (errors && errors.errors && errors.errors.Statut) {
          errors.errors.Statut.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })
        }
        if (errors && errors.errors && errors.errors.TypeProjectId) {
          errors.errors.TypeProjectId.forEach((e: string | undefined) => {
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
  onItemSelect2(item : any) {
    this.selectedItems2.push(item)
  }
  onSelectAll2(items: any) {
    this.selectedItems2 = items
  }
  deSelect2(item : any) {
    // this.selectedItems = []
    this.selectedItems2 = this.selectedItems2.filter(i => i.id != item.id);
   // console.log(this.selectedItems2)
  }
  deSelectAll2(items: any) {
    this.selectedItems2 = []
  }
}
