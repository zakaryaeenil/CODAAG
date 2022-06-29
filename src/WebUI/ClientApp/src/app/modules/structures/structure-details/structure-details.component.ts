import { Component, OnInit } from '@angular/core';
import {EvaluationByIdVm, EvaluationsClient, StructureByIdVm, StructuresClient} from "../../../web-api-client";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.scss']
})
export class StructureDetailsComponent   {
  vm : StructureByIdVm
  p:boolean = false;
  a:boolean = false;
  o: boolean =true;
  sc : boolean = false;
  g : boolean = false;
  co : boolean = false;

constructor(private structure : StructuresClient,private route: ActivatedRoute) {
  structure.get2(this.route.snapshot.params['id']).subscribe(
    result => {
      this.vm = result;
      console.log(this.vm)
    },
    error => console.error(error)
  );

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
