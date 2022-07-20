import {Component, Input, OnInit} from '@angular/core';
import {ContratObjectif, ContratObjectifByIdVm, TypeProject, TypeProjectByIdVm} from "../../../../web-api-client";

@Component({
  selector: 'app-co-projects',
  templateUrl: './co-projects.component.html',
  styleUrls: ['./co-projects.component.scss']
})
export class CoProjectsComponent implements OnInit {
  @Input()  co_pTable : ContratObjectif | undefined;

  vm : ContratObjectifByIdVm;

  constructor() { }

  ngOnInit(): void {
  }

}
