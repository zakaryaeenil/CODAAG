import { Component, OnInit } from '@angular/core';
import {
  ContratObjectif,
  ContratObjectifByIdVm,
  ContratObjectifsClient,
  TypeProject,
  TypeProjectByIdVm
} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contrat-details',
  templateUrl: './contrat-details.component.html',
  styleUrls: ['./contrat-details.component.scss']
})
export class ContratDetailsComponent implements OnInit {
  getedata : ContratObjectifByIdVm
  vm : ContratObjectif | undefined;
  co_overview : boolean = true
  co_projects: boolean = false
  co_actions : boolean = false
  constructor(private contratlist : ContratObjectifsClient,private router : ActivatedRoute,private route : Router) {
    contratlist.get2(router.snapshot.params['id']).subscribe(res =>{
      this.getedata = res
      this.vm = res.contratObjectifDto
    })

  }

  ngOnInit(): void {
  }
  goToUpdate(){
    this.route.navigate(['contrats/update', this.getedata.contratObjectifDto?.id])
  }

  showProjects(){
    this.co_actions = false
    this.co_projects = true
    this.co_overview = false
  }
  showOverView(){
    this.co_projects = false
    this.co_actions = false
    this.co_overview = true
  }
  showActions(){
    this.co_projects = false
    this.co_overview = false
    this.co_actions = true

  }

}
