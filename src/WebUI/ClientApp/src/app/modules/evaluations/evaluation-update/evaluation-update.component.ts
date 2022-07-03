import { Component, OnInit } from '@angular/core';
import {
  Evaluation,
  EvaluationsClient,
  StatutsClient,
  StatutsVm,
  UpdateEvaluationCommand
} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-evaluation-update',
  templateUrl: './evaluation-update.component.html',
  styleUrls: ['./evaluation-update.component.scss']
})
export class EvaluationUpdateComponent implements OnInit {

  evalaution : Evaluation | undefined = new Evaluation()
  liststatuts : StatutsVm

  constructor(private lstatut : StatutsClient,
              private evalu  : EvaluationsClient,
              private router : Router,
              private route: ActivatedRoute,
              private toastr : ToastrService) {
    lstatut.get().subscribe(result =>{
      this.liststatuts= result
    })
    evalu.get2(route.snapshot.params['id']).subscribe( res =>{
      this.evalaution = res.evaluationDto

    })
  }

  ngOnInit(): void {
  }


  onSubmit(){
    this.evalu.update(this.route.snapshot.params['id'],<UpdateEvaluationCommand>{
      id : this.evalaution?.id,
      title : this.evalaution?.title,
      startD : this.evalaution?.startDate,
      endD : this.evalaution?.endDate,
      statut : this.evalaution?.statutId,
      comment : this.evalaution?.note
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
