import { Component, OnInit } from '@angular/core';
import {TypeProjectsClient, TypeProjectsVm} from "../../../web-api-client";

@Component({
  selector: 'app-type-projects-view',
  templateUrl: './type-projects-view.component.html',
  styleUrls: ['./type-projects-view.component.scss']
})
export class TypeProjectsViewComponent implements OnInit {

  vm : TypeProjectsVm;

  page: number = 1;
  count : number = 0
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private listsType : TypeProjectsClient) {
    listsType.get().subscribe(
      result => {
        console.log(result);
        this.vm = result;
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
