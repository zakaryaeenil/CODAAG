import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ActionP,
  ActionPByIdVm,
  ActionPsClient,
  Project,
  ProjectByIdVm,
  ProjectsClient,
  Structure
} from "../../../../web-api-client";
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
  selector: 'app-a-structure',
  templateUrl: './a-structure.component.html',
  styleUrls: ['./a-structure.component.scss']
})
export class AStructureComponent implements OnInit {
  @Input()  a_sTable : ActionP | undefined;

  vm : ActionPByIdVm;
  public columnDefs: ColDef[] = [
    {headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Code Structure', field: 'codeStructure'},
    {headerName: 'Title', field: 'title'},
    {headerName: 'Note', field: 'note'},
    {headerName: 'Start Date', field: 'startDate', filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'End Date', field: 'endDate', filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'Gestionnaires', field: 'gestionnaires.length', filter: 'agNumberColumnFilter',
      cellStyle: {color : 'blue'}},
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
  public rowData$ !: Structure[] | undefined ;
  constructor(private listsActions : ActionPsClient, private router : ActivatedRoute){
    listsActions.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.actionPDto?.structures
      },
      error => console.error(error)
    );

  }



  ngOnInit(): void {
  }
// Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.actionPDto?.structures!
    this.agGrid.api = params.api;
  }

  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }
}
