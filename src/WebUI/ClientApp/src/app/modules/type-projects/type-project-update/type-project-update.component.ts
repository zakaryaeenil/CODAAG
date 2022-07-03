import { Component, OnInit } from '@angular/core';
import {TypeProject, TypeProjectsClient, UpdateTypeProjectCommand} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-type-project-update',
  templateUrl: './type-project-update.component.html',
  styleUrls: ['./type-project-update.component.scss']
})
export class TypeProjectUpdateComponent implements OnInit {

  typeProject : TypeProject | undefined = new TypeProject()

  constructor(private tp : TypeProjectsClient,
              private route: ActivatedRoute,
              private router : Router,
              private toastr : ToastrService) {
    this.tp.get2(this.route.snapshot.params['id']).subscribe(result =>{
      this.typeProject = result.typeProjectDto
      //console.log(this.typeProject)
    })
  }

  ngOnInit(): void {
  }

  OnSubmit(){
   // console.log(this.typeProject)
    this.tp.update(this.route.snapshot.params['id'],UpdateTypeProjectCommand.fromJS(this.typeProject)).subscribe(
      results =>{
        this.toastr.success("Type Project " +this.typeProject?.id +" updated succefully", "Good Job!", {
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
