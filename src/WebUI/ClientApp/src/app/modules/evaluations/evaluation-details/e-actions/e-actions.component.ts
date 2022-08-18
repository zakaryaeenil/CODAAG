import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ActionP,
  ContratObjectif,
  ContratObjectifByIdVm,
  Evaluation,
  EvaluationByIdVm, EvaluationsClient,
  Project
} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-e-actions',
  templateUrl: './e-actions.component.html',
  styleUrls: ['./e-actions.component.scss']
})
export class EActionsComponent {
  @Input()  e_aTable : Evaluation | undefined;

  vm :  EvaluationByIdVm;

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
  constructor(private listeval : EvaluationsClient , private route : ActivatedRoute) {
    listeval.get2(route.snapshot.params['id']).subscribe(res =>{
      this.vm = res
      this.rowData$ = res.evaluationDto?.actionPs
    })

  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.evaluationDto?.actionPs!
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
