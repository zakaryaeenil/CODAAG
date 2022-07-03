import { Component, OnInit } from '@angular/core';
import {
  CreateEvaluationCommand, CreateTypeProjectCommand,
  TypeProjectsClient
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-type-project-create',
  templateUrl: './type-project-create.component.html',
  styleUrls: ['./type-project-create.component.scss']
})
export class TypeProjectCreateComponent implements OnInit {
  title : string="";
  comment : string;
  codeTp : string ="";

  constructor(private CreateTP : TypeProjectsClient,
  private toastr : ToastrService,
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
}
