import {Component, Input, OnInit} from '@angular/core';
import {StructureByIdVm} from "../../../../web-api-client";

@Component({
  selector: 'app-co-structure',
  templateUrl: './co-structure.component.html',
  styleUrls: ['./co-structure.component.scss']
})
export class CoStructureComponent {

@Input() receivedValueco: StructureByIdVm ;
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
