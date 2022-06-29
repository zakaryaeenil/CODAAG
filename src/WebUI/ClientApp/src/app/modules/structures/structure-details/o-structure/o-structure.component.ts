import {Component, Input, OnInit} from '@angular/core';
import {StructureByIdVm} from "../../../../web-api-client";

@Component({
  selector: 'app-o-structure',
  templateUrl: './o-structure.component.html',
  styleUrls: ['./o-structure.component.scss']
})
export class OStructureComponent implements OnInit {
  @Input() receivedValueo: StructureByIdVm ;
  constructor() { }

  ngOnInit(): void {
  }

}
