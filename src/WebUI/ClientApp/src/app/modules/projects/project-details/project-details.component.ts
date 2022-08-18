import { Component, OnInit } from '@angular/core';
import {Project, ProjectByIdVm, ProjectsClient, Statut, StatutByIdVm, StatutsClient} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  getedata : ProjectByIdVm
  vm : Project | undefined;
  p_actions : boolean = false
  p_structures : boolean = false
  p_evaluations : boolean = false
  p_contrats : boolean = false
  p_overview : boolean = true
  constructor(private prolist : ProjectsClient, private router : ActivatedRoute,private route : Router) {
    prolist.get2(router.snapshot.params['id']).subscribe(res => {
      this.getedata = res
      this.vm = res.projectDto
    })
  }


  ngOnInit(): void {
  }

  goToUpdate(){
    this.route.navigate(['projects/update', this.getedata.projectDto?.id])
  }
  showActions(){
    this.p_actions = true
    this.p_contrats = false
    this.p_structures = false
    this.p_evaluations = false
    this.p_overview = false
  }
  showContrats(){
    this.p_actions = false
    this.p_contrats = true
    this.p_structures = false
    this.p_evaluations = false
    this.p_overview = false
  }
  showEvaluations(){
    this.p_actions = false
    this.p_contrats = false
    this.p_structures = false
    this.p_evaluations = true
    this.p_overview = false
  }
  showOverView(){
    this.p_actions = false
    this.p_contrats = false
    this.p_structures = false
    this.p_evaluations = false
    this.p_overview = true
  }
  showStructures(){
    this.p_actions = false
    this.p_contrats = false
    this.p_structures = true
    this.p_evaluations = false
    this.p_overview = false
  }

}
