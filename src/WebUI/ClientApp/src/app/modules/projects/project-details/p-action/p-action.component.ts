import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ActionP,
  Project,
  ProjectByIdVm,
  ProjectsClient,
  Statut,
  StatutByIdVm,
  StatutsClient
} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-p-action',
  templateUrl: './p-action.component.html',
  styleUrls: ['./p-action.component.scss']
})
export class PActionComponent implements OnInit {
  @Input()  p_aTable : Project | undefined;

  vm : ProjectByIdVm;

  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'actionP.id', filter: 'agNumberColumnFilter'},
    {headerName: 'Title',  field: 'actionP.title'},
    {headerName: 'Note',  field: 'actionP.note'},
    {headerName: 'TauxR per %',  field: 'actionP.tauxR', filter: 'agNumberColumnFilter'},
    {headerName: 'TauxR per Eval %', field: 'tauxR', filter: 'agNumberColumnFilter'},
    {headerName: 'Budget',  field: 'actionP.budgR', filter: 'agNumberColumnFilter'},
    {headerName: 'Budget Prv',  field: 'actionP.budgPrv', filter: 'agNumberColumnFilter'},
    {headerName: 'Project',  field: 'actionP.project.codeProject'},
    {headerName: 'Structures', field: 'actionP.structures.length', filter: 'agNumberColumnFilter', cellStyle: {color : 'blue'}},
    {headerName: 'Start Date',  field: 'actionP.startDate' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'End Date',  field: 'actionP.endDate' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'Start Date Prv',  field: 'actionP.startDatePrv' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'End Date Prv',  field: 'actionP.endDatePrv' ,filter: 'agDateColumnFilter', filterParams: filterParams,}
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
  public rowData$ !: ActionP[] | undefined;

  constructor(private listsProjects : ProjectsClient, private router : ActivatedRoute){
    listsProjects.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.projectDto?.actions
      },
      error => console.error(error)
    );

  }

  ngOnInit(): void {
  }
// Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.projectDto?.actions!
    this.agGrid.api = params.api;
  }

  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }

}
var filterParams = {
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
