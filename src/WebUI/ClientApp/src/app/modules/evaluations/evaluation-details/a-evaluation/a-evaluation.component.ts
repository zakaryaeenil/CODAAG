import {Component, Input, OnInit} from '@angular/core';
import { EvaluationByIdVm} from "../../../../web-api-client";

@Component({
  selector: 'app-a-evaluation',
  templateUrl: './a-evaluation.component.html',
  styleUrls: ['./a-evaluation.component.scss']
})
export class AEvaluationComponent implements OnInit {
  @Input() receivedValuea: any ;

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor() {

  }

  ngOnInit(): void {

  }



  //Pagination
  onTableDataChange(event: any) {
    this.page = event;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

}
