import { Component, OnInit } from '@angular/core';
import {
  ContratObjectifsClient,
  ContratObjectifsVm, CreateContratObjectifCommand,
  CreateStructureCommand, FileParameter, StatutsClient, StatutsVm,
  StructuresClient,
  StructuresVm
} from "../../../web-api-client";
import {ModalDismissReasons, NgbModal, NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contrat-create',
  templateUrl: './contrat-create.component.html',
  styleUrls: ['./contrat-create.component.scss']
})
export class ContratCreateComponent implements OnInit {

  //Init

  vm : StructuresVm

  startD : Date
  endD : Date
  title : string="";
  comment : string="";
  a : boolean = true;

  closeResult : string = "";
  public selectedFile : File ;


  constructor(private listStatuts : StatutsClient,
              private CreateContrat : ContratObjectifsClient,
              private toastr : ToastrService,
              private modalService: NgbModal,
              private router : Router) {
  }

  onSubmit() {

    this.CreateContrat.create(<CreateContratObjectifCommand>{
      title : this.title,
      comment :this.comment,
      startD : this.startD,
      endD : this.endD,
      isActive :this.a,
    }).subscribe(
      result => {
          this.toastr.success("Contrat Created "+result+ " successfully !!", "Good Job", {
            timeOut: 3000
          })
          this.router.navigateByUrl('contrats/all');

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
        if (errors && errors.errors && errors.errors.StartD) {
          errors.errors.StartD.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })

        }
        if (errors && errors.errors && errors.errors.EndD) {
          errors.errors.EndD.forEach((e: string | undefined) => {
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
        console.log(errors)
      }
    )
  }

  ngOnInit(): void {
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
      this.closeResult = `Dismissed ${ContratCreateComponent.getDismissReason(reason)}`;
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
    this.CreateContrat.createBulk(fileParameter
    ).subscribe(
      results =>{
        this.toastr.info("Contrats " +results , "Emmmm!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('contrats/all');
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
}
