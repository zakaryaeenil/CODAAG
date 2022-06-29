import { Component, OnInit } from '@angular/core';
import {EvaluationsClient, EvaluationsVm, StatutsClient, StatutsVm} from "../../../web-api-client";

@Component({
  selector: 'app-statuts-view',
  templateUrl: './statuts-view.component.html',
  styleUrls: ['./statuts-view.component.scss']
})
export class StatutsViewComponent implements OnInit {

  vm : StatutsVm;


  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];



  constructor(private listsStatut: StatutsClient) {
    listsStatut.get().subscribe(
      result => {
        console.log(result);

        this.vm = result;
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
