import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Evaluation, Project, ProjectByIdVm, ProjectsClient} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {ActivatedRoute} from "@angular/router";
import {AgGridAngular} from "ag-grid-angular";

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
  selector: 'app-p-evaluation',
  templateUrl: './p-evaluation.component.html',
  styleUrls: ['./p-evaluation.component.scss']
})
export class PEvaluationComponent implements OnInit {
  @Input()  p_eTable : Project | undefined;

  vm : ProjectByIdVm;

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

  constructor(private listsProjects : ProjectsClient, private router : ActivatedRoute){
    listsProjects.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.projectDto?.evaluations
      },
      error => console.error(error)
    );

  }

  ngOnInit(): void {
  }
// Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.projectDto?.evaluations!
    this.agGrid.api = params.api;
  }

  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }
}

