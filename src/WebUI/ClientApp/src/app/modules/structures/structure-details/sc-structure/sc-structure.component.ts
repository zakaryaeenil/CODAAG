import {Component, Input} from '@angular/core';
import {StructureByIdVm} from "../../../../web-api-client";

@Component({
  selector: 'app-sc-structure',
  templateUrl: './sc-structure.component.html',
  styleUrls: ['./sc-structure.component.scss']
})
export class ScStructureComponent {
  @Input() receivedValuesc: StructureByIdVm ;

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
