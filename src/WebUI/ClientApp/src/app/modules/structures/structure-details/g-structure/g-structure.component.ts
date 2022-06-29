import {Component, Input} from '@angular/core';
import {StructureByIdVm} from "../../../../web-api-client";

@Component({
  selector: 'app-g-structure',
  templateUrl: './g-structure.component.html',
  styleUrls: ['./g-structure.component.scss']
})
export class GStructureComponent  {
  @Input() receivedValueg: StructureByIdVm ;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

//Pagination
  onTableDataChange(event: any) {
    this.page = event;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
