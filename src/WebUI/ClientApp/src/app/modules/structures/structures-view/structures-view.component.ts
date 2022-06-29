import { Component, OnInit } from '@angular/core';
import {StructuresClient, StructuresVm} from "../../../web-api-client";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-structures-view',
  templateUrl: './structures-view.component.html',
  styleUrls: ['./structures-view.component.scss']
})
export class StructuresViewComponent implements OnInit {

  vm : StructuresVm;
  c : any = 0;

  // pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private listsStructures : StructuresClient) {
    listsStructures.get().subscribe(
      result => {
        console.log(result);
        this.vm = result;
       // this.c = result.structureDtos?.length;
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
