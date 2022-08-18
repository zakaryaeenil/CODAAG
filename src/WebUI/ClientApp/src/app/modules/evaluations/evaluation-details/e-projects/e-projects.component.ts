import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  Evaluation,
  EvaluationByIdVm,
  EvaluationsClient, Project,
} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-e-projects',
  templateUrl: './e-projects.component.html',
  styleUrls: ['./e-projects.component.scss']
})
export class EProjectsComponent {
  @Input()  e_pTable : Evaluation | undefined;

  vm : EvaluationByIdVm;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID', field: 'project.id', filter: 'agNumberColumnFilter'},
    {headerName: 'Code Project', field: 'project.codeProject'},
    {headerName: 'Title', field: 'project.title'},
    {headerName: 'Note', field: 'project.note'},
    {headerName: 'TauxR per %', field: 'project.tauxR', filter: 'agNumberColumnFilter'},
    {headerName: 'TauxR per Eval %', field: 'tauxR', filter: 'agNumberColumnFilter'},
    {headerName: 'Mode', field: 'project.modeReel'},
    {headerName: 'Structures', field: 'project.structures.length', filter: 'agNumberColumnFilter', cellStyle: {color: 'blue'}},
    {headerName: 'Start Date', field: 'project.startDate', filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'End Date', field: 'project.endDate', filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'Start Date Prv', field: 'project.startDatePrv', filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'End Date Prv', field: 'project.endDatePrv', filter: 'agDateColumnFilter', filterParams: filterParams}
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
  public rowData$ !: Project[] | undefined;

  constructor(private listeval : EvaluationsClient , private route : ActivatedRoute)  {
    listeval.get2(route.snapshot.params['id']).subscribe(res =>{
      this.vm = res
      this.rowData$ = res.evaluationDto?.projects
    })
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.evaluationDto?.projects!
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
