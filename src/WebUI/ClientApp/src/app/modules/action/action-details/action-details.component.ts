import { Component, OnInit } from '@angular/core';
import {ActionP, ActionPByIdVm, ActionPsClient, Project, ProjectByIdVm, ProjectsClient} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-action-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss']
})
export class ActionDetailsComponent implements OnInit {
  getedata : ActionPByIdVm
  vm : ActionP | undefined;

  a_structures : boolean = false
  a_evaluations : boolean = false
  a_overview : boolean = true
  constructor(private actlist : ActionPsClient, private router : ActivatedRoute,private route : Router) {
    actlist.get2(router.snapshot.params['id']).subscribe(res => {
      this.getedata = res
      this.vm = res.actionPDto
    })
  }

  ngOnInit(): void {
  }
  goToUpdate(){
    this.route.navigate(['actions/update', this.getedata.actionPDto?.id])
  }
  showEvaluations(){
    this.a_structures = false
    this.a_evaluations = true
    this.a_overview = false
  }
  showOverView(){
    this.a_structures = false
    this.a_evaluations = false
    this.a_overview = true
  }
  showStructures(){
    this.a_structures = true
    this.a_evaluations = false
    this.a_overview = false
  }
}
