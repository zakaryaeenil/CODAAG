import { Component, OnInit } from '@angular/core';
import {Statut, StatutByIdVm, StatutsClient} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-statut-details',
  templateUrl: './statut-details.component.html',
  styleUrls: ['./statut-details.component.scss']
})
export class StatutDetailsComponent implements OnInit {

  getedata : StatutByIdVm
  vm : Statut | undefined;
  s_actions : boolean = false
  s_projects : boolean = false
  s_evaluations : boolean = false
  s_contrats : boolean = false
  s_overview : boolean = true
  constructor(private Statutlist : StatutsClient, private router : ActivatedRoute,private route : Router) {
    Statutlist.get2(router.snapshot.params['id']).subscribe(res => {
      this.getedata = res
      this.vm = res.statutDto
    })
  }


  ngOnInit(): void {
  }

  goToUpdate(){
    this.route.navigate(['statuts/update', this.getedata.statutDto?.id])
  }
  showActions(){
    this.s_actions = true
    this.s_contrats = false
    this.s_projects = false
    this.s_evaluations = false
    this.s_overview = false
  }
  showContrats(){
    this.s_actions = false
    this.s_contrats = true
    this.s_projects = false
    this.s_evaluations = false
    this.s_overview = false
  }
  showEvaluations(){
    this.s_actions = false
    this.s_contrats = false
    this.s_projects = false
    this.s_evaluations = true
    this.s_overview = false
  }
  showProjects(){
    this.s_actions = false
    this.s_contrats = false
    this.s_projects = true
    this.s_evaluations = false
    this.s_overview = false
  }
  showOverView(){
    this.s_actions = false
    this.s_contrats = false
    this.s_projects = false
    this.s_evaluations = false
    this.s_overview = true
  }
}
