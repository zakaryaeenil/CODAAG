import { Component, OnInit } from '@angular/core';
import {
  EvaluationByIdVm,
  EvaluationsClient,
  Structure,
  StructureByIdVm,
  StructuresClient
} from "../../../web-api-client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.scss']
})
export class StructureDetailsComponent   {
  getedata : StructureByIdVm
  vm : Structure | undefined
  p:boolean = false;
  a:boolean = false;
  o: boolean =true;
  sc : boolean = false;
  g : boolean = false;
  co : boolean = false;

constructor(private structure : StructuresClient,private router: Router, private route: ActivatedRoute) {
  structure.get2(this.route.snapshot.params['id']).subscribe(
    result => {
      this.getedata = result
      this.vm = result.structureDto
    },
    error => console.error(error)
  );

}
  goToUpdate(){
    this.router.navigate(['structures/update', this.getedata.structureDto?.id])
  }
showhideA(){
  this.co = false;
  this.p = false;
  this.g = false;
  this.sc = false;
  this.o = false;
  this.a = true;
}
showhideSc(){
  this.co = false;
  this.p = false;
  this.g = false;
  this.a = false;
  this.o = false;
  this.sc = true;
}
showhideO(){
  this.co = false;
  this.p = false;
  this.g = false;
  this.sc = false;
  this.a = false;
  this.o = true;
}
showhideP(){
  this.co = false;
  this.a = false;
  this.g = false;
  this.sc = false;
  this.o = false;
  this.p = true;
}
  showhideG(){
    this.co = false;
    this.p = false;
    this.a = false;
    this.sc = false;
    this.o = false;
    this.g = true;
  }
  showhideCo(){
    this.g = false;
    this.p = false;
    this.a = false;
    this.sc = false;
    this.o = false;
    this.co = true;
  }

}
