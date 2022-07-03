import { Component, OnInit } from '@angular/core';
import {Statut, StatutsClient, UpdateStatutCommand, UpdateTypeProjectCommand} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-statut-update',
  templateUrl: './statut-update.component.html',
  styleUrls: ['./statut-update.component.scss']
})
export class StatutUpdateComponent implements OnInit {

  statut : Statut | undefined = new Statut()

  constructor( private s : StatutsClient,
               private router : Router,
               private route : ActivatedRoute,
               private toastr : ToastrService) {
    s.get2(route.snapshot.params['id']).subscribe(res =>{
      this.statut = res.statutDto
    })
  }

  ngOnInit(): void {
  }

  OnSubmit(){
      // console.log(this.typeProject)
      this.s.update(this.route.snapshot.params['id'],<UpdateStatutCommand>{
        id : this.statut?.id,
        title : this.statut?.title,
        comment : this.statut?.title,
        color : this.statut?.color
      }).subscribe(
        results =>{
          this.toastr.success("Statut " +this.statut?.id +" updated succefully", "Good Job!", {
            timeOut: 3000
          })
          this.router.navigateByUrl('statuts/all');
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
