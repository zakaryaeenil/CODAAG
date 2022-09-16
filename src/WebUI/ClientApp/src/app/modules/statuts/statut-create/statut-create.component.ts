import { Component, OnInit } from '@angular/core';
import {
  CreateStatutCommand, FileParameter,
  StatutsClient, StatutsVm,
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-statut-create',
  templateUrl: './statut-create.component.html',
  styleUrls: ['./statut-create.component.scss']
})
export class StatutCreateComponent implements OnInit {
  title : string="";
  comment : string="";
  color : number ;
  closeResult : string = "";
  public selectedFile : File ;
  constructor(private CreateStatut : StatutsClient,
              private toastr : ToastrService,
              private modalService: NgbModal,
              private router: Router){}

  ngOnInit(): void {
  }

  onSubmit() {
    this.CreateStatut.create(<CreateStatutCommand>{
      title : this.title,
      comment : this.comment,
      color : this.color
    }).subscribe(
      result => {

        this.toastr.success("Statut Created successfully !!", "Good Job", {
          timeOut: 3000,
        })
        this.router.navigateByUrl('statuts/all');
      },
      error => {
        let errors = JSON.parse(error.response);
        if (errors && errors.errors && errors.errors.Title) {
          errors.errors.Title.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 5000
            });
          })
        }
        if (errors && errors.errors && errors.errors.Color) {
          errors.errors.Color.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 5000
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
      this.closeResult = `Dismissed ${StatutCreateComponent.getDismissReason(reason)}`;
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
    this.CreateStatut.createBulk(fileParameter
    ).subscribe(
      results =>{
        this.toastr.info("Statuts " +results , "Emmmm!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('statuts/all');
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
