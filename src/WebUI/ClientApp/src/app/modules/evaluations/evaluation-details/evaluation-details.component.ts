import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EvaluationByIdVm, EvaluationDto, EvaluationsClient} from "../../../web-api-client";


@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrls: ['./evaluation-details.component.scss']
})
export class EvaluationDetailsComponent  {

  vm : EvaluationByIdVm
  p:boolean = true;
  a:boolean = false;


  constructor(private evaluation : EvaluationsClient,private route: ActivatedRoute) {
    evaluation.get2(this.route.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        console.log(this.vm)
      },
      error => console.error(error)
    );

  }

  showhideActions(){
    this.p = false;
    this.a = true;

  }
  showhideProjects(){
    this.a = false;
    this.p = true;
  }
}
