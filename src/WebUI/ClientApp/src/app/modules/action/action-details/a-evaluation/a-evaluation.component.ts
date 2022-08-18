import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActionP, ActionPByIdVm, ActionPsClient, Evaluation} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";

const filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

@Component({
  selector: 'app-a-evaluation',
  templateUrl: './a-evaluation.component.html',
  styleUrls: ['./a-evaluation.component.scss']
})
export class AEvaluationComponent implements OnInit {
  @Input()  a_eTable : ActionP | undefined;

  vm : ActionPByIdVm;
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'evaluation.id', filter: 'agNumberColumnFilter'},
    {headerName: 'Title',  field: 'evaluation.title'},
    {headerName: 'Note',  field: 'evaluation.note'},
    {headerName: 'TauxR %',  field: 'tauxR', filter: 'agNumberColumnFilter', cellStyle: {color : 'blue'}},
    {headerName: 'Start Date',  field: 'evaluation.startDate' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'End Date',  field: 'evaluation.endDate' ,filter: 'agDateColumnFilter', filterParams: filterParams,}
  ];


  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  // public sideBar: SideBarDef | string | string[] | boolean | null = 'columns';
  public rowData$ !: Evaluation[] | undefined ;

  constructor(private listsActions : ActionPsClient, private router : ActivatedRoute){
    listsActions.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.actionPDto?.evaluations
      },
      error => console.error(error)
    );

  }


  ngOnInit(): void {
  }
// Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.actionPDto?.evaluations!
    this.agGrid.api = params.api;
  }

  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }
}
