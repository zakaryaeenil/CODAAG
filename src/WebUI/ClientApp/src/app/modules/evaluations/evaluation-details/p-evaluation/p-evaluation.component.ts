import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-p-evaluation',
  templateUrl: './p-evaluation.component.html',
  styleUrls: ['./p-evaluation.component.scss']
})
export class PEvaluationComponent {
  @Input() receivedValue: any ;

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
