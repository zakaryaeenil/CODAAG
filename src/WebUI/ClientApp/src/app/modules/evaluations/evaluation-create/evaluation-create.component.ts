import { Component, OnInit } from '@angular/core';
import {
  CreateEvaluationCommand,
  CreateStructureCommand,
  EvaluationsClient, FileParameter,
  StatutsClient,
  StatutsVm
} from "../../../web-api-client";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-evaluation-create',
  templateUrl: './evaluation-create.component.html',
  styleUrls: ['./evaluation-create.component.scss']
})
export class EvaluationCreateComponent implements OnInit {
  startD : Date ;
  endD : Date ;
  title : string="";
  comment : string="";
  statut : number;
  vmStatut : StatutsVm;
  closeResult : string = "";
  public selectedFile : File ;
  constructor(private CreateEval : EvaluationsClient,
              private listStatut : StatutsClient,
              private toastr : ToastrService,
              private modalService: NgbModal,
              private router: Router) {
    listStatut.get().subscribe(results =>{
      this.vmStatut = results
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {


      this.CreateEval.create(<CreateEvaluationCommand>{
        title : this.title,
        comment : this.comment,
        startD : this.startD,
        endD : this.endD,
        statut : this.statut
      }).subscribe(
        result => {
           this.toastr.success("Evaluation "+result+" Created successfully !!", "Good Job", {
             timeOut: 3000
           })
           this.router.navigateByUrl('evaluations/all');
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
          if (errors && errors.errors && errors.errors.statut) {
            errors.errors.statut.forEach((e: string | undefined) => {
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
      this.closeResult = `Dismissed ${EvaluationCreateComponent.getDismissReason(reason)}`;
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
    this.CreateEval.createBulk(fileParameter
    ).subscribe(
      results =>{
        this.toastr.info("Evaluations " +results , "Emmmm!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('evaluations/all');
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
