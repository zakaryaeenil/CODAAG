import { Component, OnInit } from '@angular/core';
import {
  CreateStatutCommand,
  StatutsClient, StatutsVm,
} from "../../../web-api-client";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-statut-create',
  templateUrl: './statut-create.component.html',
  styleUrls: ['./statut-create.component.scss']
})
export class StatutCreateComponent implements OnInit {
  title : string="";
  comment : string="";
  color : number ;
  constructor(private CreateStatut : StatutsClient,
              private toastr : ToastrService,
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
}
