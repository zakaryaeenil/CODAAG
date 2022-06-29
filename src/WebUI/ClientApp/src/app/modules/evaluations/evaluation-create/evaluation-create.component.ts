import { Component, OnInit } from '@angular/core';
import {
  CreateEvaluationCommand,
  CreateStructureCommand,
  EvaluationsClient,
  StatutsClient,
  StatutsVm
} from "../../../web-api-client";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
  vmStatut : StatutsVm
  constructor(private CreateEval : EvaluationsClient,
              private listStatut : StatutsClient,
              private toastr : ToastrService,
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



}
