import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionP, ActionPsClient, ActionPsVm, TypeProject} from "../../../web-api-client";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Sort} from "@angular/material/sort";
import {
  CellClickedEvent,
  CheckboxSelectionCallbackParams,
  ColDef,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams
} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";

@Component({
  selector: 'app-action-view',
  templateUrl: './action-view.component.html',
  styleUrls: ['./action-view.component.scss']
})
export class ActionViewComponent implements OnInit {

  vm : ActionPsVm;
  closeResult : string = ""
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'id',
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
      filter: 'agNumberColumnFilter'},
    {headerName: 'Title',  field: 'title'},
    {headerName: 'Note',  field: 'note'},
    {headerName: 'TauxR per %',  field: 'tauxR', filter: 'agNumberColumnFilter'},
    {headerName: 'Budget',  field: 'budgR', filter: 'agNumberColumnFilter'},
    {headerName: 'Budget Prv',  field: 'budgPrv', filter: 'agNumberColumnFilter'},
    {headerName: 'Project',  field: 'project.codeProject'},
    {headerName: 'Structures', field: 'structures.length', filter: 'agNumberColumnFilter', cellStyle: {color : 'blue'}},
    {headerName: 'Start Date',  field: 'startDate' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'End Date',  field: 'endDate' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'Start Date Prv',  field: 'startDatePrv' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'End Date Prv',  field: 'endDatePrv' ,filter: 'agDateColumnFilter', filterParams: filterParams,},
    {headerName: 'Statut',  field: 'statut.title',
      cellStyle: params => {
        if (params.value === 'NON ENTAME') {
          //mark police cells as red
          return {color: 'white', backgroundColor: 'red'};
        }
        if (params.value === 'EN COURS') {
          //mark police cells as red
          return {color: 'white', backgroundColor: 'blue'};
        }
        if (params.value === 'ANNULE') {
          //mark police cells as red
          return {color: 'white', backgroundColor: 'black'};
        }
        if (params.value === 'EN RETARD') {
          //mark police cells as red
          return {color: 'white', backgroundColor: 'orange'};
        }
        if (params.value === 'ACHEVE') {
          //mark police cells as red
          return {color: 'white', backgroundColor: 'green'};
        }
        return null;
      }},
  ];

  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'id',
    valueGetter: (params) => {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    // headerCheckboxSelectionFilteredOnly: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };


  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };


  // Data that gets displayed in the grid
  public rowData$ !: ActionP[] | undefined ;
  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;



  constructor(private listsActionPs : ActionPsClient,
              private router : Router,
              private modalService: NgbModal,
              private toastr : ToastrService) {
    listsActionPs.get().subscribe(
      result => {
        this.vm = result;
        this.rowData$ = this.vm.actionPDtos
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
  }
  open(content : any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.onDeleteRow();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${ActionViewComponent.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  onDeleteRow() {
    var selectedData = this.agGrid.api.getSelectedRows();
    selectedData.forEach(x =>{
      this.listsActionPs.delete(x.id).subscribe(result =>{
          this.toastr.success("Action(s) project deleted success ","Good Job!", {timeOut: 3000})
          this.listsActionPs.get().subscribe(
            result => {
              this.vm = result;
              this.rowData$ = this.vm.actionPDtos
              this.agGrid.api.applyTransaction({remove: selectedData});
            },
            error => console.error(error)
          );
        },
        err =>{
          this.toastr.error("Error")
        })
    })
  }


  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.actionPDtos
    this.agGrid.api = params.api;
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
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

var checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (
  params: HeaderCheckboxSelectionCallbackParams
) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
