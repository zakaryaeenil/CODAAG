import { Component, OnInit } from '@angular/core';
import {ActionPsClient, ActionPsVm} from "../../../web-api-client";

@Component({
  selector: 'app-action-view',
  templateUrl: './action-view.component.html',
  styleUrls: ['./action-view.component.scss']
})
export class ActionViewComponent implements OnInit {

  vm : ActionPsVm;
  c : any = 0;


  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private listsActionPs : ActionPsClient) {
    listsActionPs.get().subscribe(
      result => {
        console.log(result);
        this.vm = result;
        this.c = result.actionPDtos?.length;
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
