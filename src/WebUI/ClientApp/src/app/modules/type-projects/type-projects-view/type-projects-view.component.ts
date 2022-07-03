import {Component, OnInit, ViewChild} from '@angular/core';
import {TypeProject, TypeProjectsClient, TypeProjectsVm} from "../../../web-api-client";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {CellClickedEvent, ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-type-projects-view',
  templateUrl: './type-projects-view.component.html',
  styleUrls: ['./type-projects-view.component.scss']
})
export class TypeProjectsViewComponent implements OnInit {

  vm : TypeProjectsVm;

// Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Code',  field: 'codeTP'},
    {headerName: 'Title',  field: 'title'},
    {headerName: 'Note',  field: 'note'},
    {headerName: 'Created',  field: 'created' ,filter: 'agDateColumnFilter', filterParams: filterParams,}

  ];


  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
    public rowData$ !: TypeProject[] | undefined ;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  constructor(private listsType : TypeProjectsClient,
              private router : Router,
              private modalService: NgbModal,
              private toastr : ToastrService) {
    listsType.get().subscribe(
      result => {
        this.vm = result;
        this.rowData$ = this.vm.typeProjectDtos
      },
      error => console.error(error)
    );

  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
   this.rowData$ = this.vm.typeProjectDtos
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  ngOnInit(): void {
  }

  onEditButtonClick(params :any)
  {
    console.log(params.node.id)
    this.router.navigate(['typesproject/update',params.node.id])
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
