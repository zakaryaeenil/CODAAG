import { Component, OnInit } from '@angular/core';
import {
  ContratObjectif,
  ContratObjectifsClient,
  Evaluation,
  StatutsClient,
  StatutsVm, UpdateContratObjectifCommand,
  UpdateEvaluationCommand
} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contrat-update',
  templateUrl: './contrat-update.component.html',
  styleUrls: ['./contrat-update.component.scss']
})
export class ContratUpdateComponent implements OnInit {

  contrat : ContratObjectif | undefined = new ContratObjectif()

  constructor(private statuts : StatutsClient,
              private c : ContratObjectifsClient,
              private route : ActivatedRoute,
              private router : Router,
              private toastr : ToastrService) {

    c.get2(route.snapshot.params['id']).subscribe(res =>{
      this.contrat = res.contratObjectifDto
    })
  }

  ngOnInit(): void {
  }
  onSubmit(){
    this.c.update(this.route.snapshot.params['id'],<UpdateContratObjectifCommand>{
      id : this.contrat?.id,
      title : this.contrat?.title,
      comment :this.contrat?.note,
      startD : this.contrat?.startDate,
      endD : this.contrat?.endDate,
      isActive :this.contrat?.isActive,
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


}
