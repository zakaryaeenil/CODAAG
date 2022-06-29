import { Component,  OnInit} from '@angular/core';
import {EvaluationsClient, EvaluationsVm} from "../../../web-api-client";



@Component({
  selector: 'app-evaluations-view',
  templateUrl: './evaluations-view.component.html',
  styleUrls: ['./evaluations-view.component.scss']
})
export class EvaluationsViewComponent implements OnInit {

  vm : EvaluationsVm;


  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];



  constructor(private listsEvaluation: EvaluationsClient) {
    listsEvaluation.get().subscribe(
      result => {
        console.log(result);
        this.vm = result;
        console.log()


      },
      error => console.error(error)
    );
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
