import { Component, OnInit } from '@angular/core';
import {ContratObjectifsClient, ContratObjectifsVm, StatutsClient, StatutsVm} from "../../../web-api-client";

@Component({
  selector: 'app-contrat-view',
  templateUrl: './contrat-view.component.html',
  styleUrls: ['./contrat-view.component.scss']
})
export class ContratViewComponent implements OnInit {
  vm : ContratObjectifsVm;


  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];



  constructor(private listsContrat: ContratObjectifsClient) {
    listsContrat.get().subscribe(
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

