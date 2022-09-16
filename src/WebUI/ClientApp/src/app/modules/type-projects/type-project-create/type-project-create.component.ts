import { Component, OnInit } from '@angular/core';
import {
  CreateTypeProjectCommand, FileParameter,
  TypeProjectsClient
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Form} from "@angular/forms";

@Component({
  selector: 'app-type-project-create',
  templateUrl: './type-project-create.component.html',
  styleUrls: ['./type-project-create.component.scss']
})
export class TypeProjectCreateComponent implements OnInit {
  title : string="";
  comment : string;
  codeTp : string ="";
  closeResult : string = "";
  public selectedFile : File ;
  constructor(private CreateTP : TypeProjectsClient,
              private toastr : ToastrService,
              private modalService: NgbModal,
              private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.CreateTP.create(<CreateTypeProjectCommand>{
      title : this.title,
      comment : this.comment,
      codeTP : this.codeTp
    }).subscribe(
   results =>{
     this.toastr.success("Type Project " +results +" created succefully", "Good Job!", {
       timeOut: 3000
     })
     this.router.navigateByUrl('typesproject/all');
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
        if (errors && errors.errors && errors.errors.CodeTP) {
            errors.errors.CodeTP.forEach((e: string | undefined) => {
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
      this.closeResult = `Dismissed ${TypeProjectCreateComponent.getDismissReason(reason)}`;
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
    this.CreateTP.createBulk(fileParameter
    ).subscribe(
      results =>{
        this.toastr.info("Type Project " +results , "Emmmm!", {
          timeOut: 3000
        })
        this.router.navigateByUrl('typesproject/all');
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
