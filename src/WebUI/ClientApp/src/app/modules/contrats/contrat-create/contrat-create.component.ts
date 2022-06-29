import { Component, OnInit } from '@angular/core';
import {
  ContratObjectifsClient,
  ContratObjectifsVm, CreateContratObjectifCommand,
  CreateStructureCommand, StatutsClient, StatutsVm,
  StructuresClient,
  StructuresVm
} from "../../../web-api-client";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contrat-create',
  templateUrl: './contrat-create.component.html',
  styleUrls: ['./contrat-create.component.scss']
})
export class ContratCreateComponent implements OnInit {

  //Init
  vmStatuts : StatutsVm
  vm : StructuresVm

  startD : Date
  endD : Date
  title : string="";
  comment : string="";
  s : number;
  a : boolean = true;




  constructor(private listStatuts : StatutsClient,
              private CreateContrat : ContratObjectifsClient,
              private toastr : ToastrService,
              private router : Router) {
    listStatuts.get().subscribe(results =>{
      this.vmStatuts = results
    })
  }

  onSubmit() {

    this.CreateContrat.create(<CreateContratObjectifCommand>{
      title : this.title,
      comment :this.comment,
      startD : this.startD,
      endD : this.endD,
      statut : this.s,
      isActive :this.a,
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

  ngOnInit(): void {
  }


}
