import {Component, OnInit, ViewChild} from '@angular/core';
import {TypeProject, TypeProjectsClient, TypeProjectsVm} from "../../../web-api-client";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {
  CellClickedEvent,
  CheckboxSelectionCallbackParams,
  ColDef,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams
} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-type-projects-view',
  templateUrl: './type-projects-view.component.html',
  styleUrls: ['./type-projects-view.component.scss']
})
export class TypeProjectsViewComponent implements OnInit {

  vm : TypeProjectsVm;
  closeResult : string = "";
  colsExcelHeaders : string[]
// Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'id' ,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
     filter: 'agNumberColumnFilter'},
    {headerName: 'Code',  field: 'codeTP'},
    {headerName: 'Title',  field: 'title'},
    {headerName: 'Note',  field: 'note'},
    {headerName: 'Created',  field: 'created' ,filter: 'agDateColumnFilter', filterParams: filterParams}

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

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Data that gets displayed in the grid
  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';

 // public sideBar: SideBarDef | string | string[] | boolean | null = 'columns';
  public rowData$ !: TypeProject[] | undefined ;

  constructor(private listsType : TypeProjectsClient,
              private router : Router,
              private modalService: NgbModal,
              private toastr : ToastrService,
  ){
    listsType.get().subscribe(
      result => {
        this.vm = result;
        this.rowData$ = this.vm.typeProjectDtos
      },
      error => console.error(error)
    );

  }

  open(content : any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.onDeleteRow();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${TypeProjectsViewComponent.getDismissReason(reason)}`;
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
      this.listsType.delete(x.id).subscribe(result =>{
          this.toastr.success("Type(s) project deleted success ","Good Job!", {timeOut: 3000})
          this.listsType.get().subscribe(
            result => {
              this.vm = result;
              this.rowData$ = this.vm.typeProjectDtos
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

  // Export as csv
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
   this.rowData$ = this.vm.typeProjectDtos
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

  ngOnInit(): void {
  }

  export() {

    const title = 'Types_Projects';
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Types Projects');

    //Add Row and formatting
    worksheet.mergeCells('A1', 'D4');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    let headerRow = worksheet.addRow(['ID','Code TP','Title' , 'Note'],'n');

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' },
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 15,
      };
    });

    // Adding Data with Conditional Formatting
    this.rowData$!.forEach(d => {
      worksheet.addRow([d.id,d.codeTP, d.title , d.note]);
    });

    worksheet.addRow([]);

    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]!({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength ) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    //Footer Row
    let footerRow = worksheet.addRow([
      'Types Projects table genereted  at ' + date,
    ]);
    footerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFB050' },
    };


    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:D${footerRow.number}`);

    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });
  }
}




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
