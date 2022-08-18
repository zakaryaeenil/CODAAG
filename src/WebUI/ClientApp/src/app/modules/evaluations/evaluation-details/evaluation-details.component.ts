import { Component, OnInit } from '@angular/core';
import {
  ContratObjectif,
  ContratObjectifByIdVm,
  ContratObjectifsClient,
  Evaluation,
  EvaluationByIdVm, EvaluationsClient
} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrls: ['./evaluation-details.component.scss']
})
export class EvaluationDetailsComponent  {
  getedata : EvaluationByIdVm
  vm : Evaluation | undefined;
  e_overview : boolean = true
  e_projects: boolean = false
  e_actions : boolean = false

  constructor(private evallist : EvaluationsClient,private router : ActivatedRoute,private route : Router) {
    evallist.get2(router.snapshot.params['id']).subscribe(res =>{
      this.getedata = res
      this.vm = res.evaluationDto
    })
  }

  goToUpdate(){
    this.route.navigate(['evalautions/update', this.getedata.evaluationDto?.id])
  }

  showProjects(){
    this.e_actions = false
    this.e_projects = true
    this.e_overview = false
  }
  showOverView(){
    this.e_projects = false
    this.e_actions = false
    this.e_overview = true
  }
  showActions(){
    this.e_projects = false
    this.e_overview = false
    this.e_actions = true

  }

}
