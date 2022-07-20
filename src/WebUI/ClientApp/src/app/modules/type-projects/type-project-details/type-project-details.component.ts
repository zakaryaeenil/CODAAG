import { Component, OnInit } from '@angular/core';
import {
  Statut,
  StatutByIdVm,
  StatutsClient,
  TypeProject,
  TypeProjectByIdVm,
  TypeProjectsClient
} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-type-project-details',
  templateUrl: './type-project-details.component.html',
  styleUrls: ['./type-project-details.component.scss']
})
export class TypeProjectDetailsComponent implements OnInit {
  getedata : TypeProjectByIdVm
  vm : TypeProject | undefined;

  tp_projects : boolean = false
  tp_overview : boolean = true

  constructor(private tplist : TypeProjectsClient,private router : ActivatedRoute,private route : Router) {
    tplist.get2(router.snapshot.params['id']).subscribe(res =>{
      this.getedata = res
      this.vm = res.typeProjectDto
    })
  }

  ngOnInit(): void {
  }
  goToUpdate(){
    this.route.navigate(['typesproject/update', this.getedata.typeProjectDto?.id])
  }
  showProjects(){
    this.tp_projects = true
    this.tp_overview = false
  }
  showOverView(){

    this.tp_projects = false
    this.tp_overview = true
  }
}
