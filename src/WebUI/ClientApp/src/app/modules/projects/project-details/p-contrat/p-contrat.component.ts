import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ContratObjectif, Project, ProjectByIdVm, ProjectsClient} from "../../../../web-api-client";
import {ActivatedRoute} from "@angular/router";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-p-contrat',
  templateUrl: './p-contrat.component.html',
  styleUrls: ['./p-contrat.component.scss']
})
export class PContratComponent implements OnInit {
  @Input()  p_coTable : Project | undefined;

  vm : ProjectByIdVm;
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Code Contrat',  field: 'codeCO'},
    {headerName: 'Title',  field: 'title'},
    {headerName: 'Note',  field: 'note'},
    {headerName: 'Start Date',  field: 'startDate' ,filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'End Date',  field: 'endDate' ,filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'Is Active',  field: 'isActive',
      cellStyle: params => {
        if (params.value === true) {
          //mark police cells as red
          return {color: 'green'};
        }
        if (params.value === false) {
          //mark police cells as red
          return {color: 'red'};
        }
        return null;
      }}
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
  public rowData$ !: ContratObjectif[] | undefined ;

  constructor(private listsProjects : ProjectsClient, private router : ActivatedRoute){
    listsProjects.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.projectDto?.contratObjectifs
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
