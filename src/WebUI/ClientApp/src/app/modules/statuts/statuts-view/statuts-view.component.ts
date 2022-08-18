import {Component, OnInit, ViewChild} from '@angular/core';
import {Statut, StatutsClient, StatutsVm, TypeProject} from "../../../web-api-client";
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
import {ButtonRendererComponent} from "../../type-projects/renders/button-renderer.component";

@Component({
  selector: 'app-statuts-view',
  templateUrl: './statuts-view.component.html',
  styleUrls: ['./statuts-view.component.scss']
})
export class StatutsViewComponent implements OnInit {

  vm: StatutsVm;
  closeResult : string = ""
  show : boolean = false
  countSelected : number = 0;

// Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID', field: 'id',
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
      filter: 'agNumberColumnFilter'},
    {headerName: 'Title', field: 'title'},
    {headerName: 'Note', field: 'note'},
    {headerName: 'Color', field: 'title',
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
      }
    },
    {headerName: 'Created', field: 'created' ,filter: 'agDateColumnFilter', filterParams: filterParams},
    {
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this)
      },
      minWidth : 200
    }
  ];

  public frameworkComponents: any;
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

  public rowSelection = 'multiple';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  public rowData$ !: Statut[] | undefined;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  constructor(private listsStatut: StatutsClient,
              private router: Router,
              private modalService: NgbModal,
              private toastr: ToastrService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
    this.show = false
    listsStatut.get().subscribe(
      result => {
        this.vm = result;
        this.rowData$ = this.vm.statutDtos
      },
      error => console.error(error)
    );
  }


  ngOnInit(): void {
  }
  onBtnClick1(e : any) {
    if (e.per == 1) {
      this.router.navigate(['statuts/update', e.rowData.id])
    }
    else if (e.per == 2){
      this.router.navigate(['statuts/details',e.rowData.id])
    }
  }
  open(content : any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.onDeleteRow();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${StatutsViewComponent.getDismissReason(reason)}`;
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
      this.listsStatut.delete(x.id).subscribe(result =>{
          this.toastr.success("Statut(s) deleted success ","Good Job!", {timeOut: 3000})
          this.listsStatut.get().subscribe(
            result => {
              this.vm = result;
              this.rowData$ = this.vm.statutDtos
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
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.statutDtos
    this.agGrid.api = params.api;
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  onSelectionChanged(event : any) {

    if (this.agGrid.api.getSelectedRows().length == 0){
      this.show = false
      this.countSelected = this.agGrid.api.getSelectedRows().length
    }
    else {
      this.countSelected = this.agGrid.api.getSelectedRows().length
      this.show = true
    }
  }
  export() {

    const title = 'Statuts';
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Statuts');

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

    let headerRow = worksheet.addRow(['ID','Title' , 'Note','Color'],'n');

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
     worksheet.addRow([d.id, d.title , d.note ,d.title]);
    });
     let rowsColorChange = worksheet.getRows(6,this.rowData$?.length!)
      rowsColorChange?.forEach(x => {
      let a = x.getCell(4)
      switch (a.value){
        case 'NON ENTAME' :  a.fill =
          {
          type: 'pattern',
          pattern: 'gray125',
          bgColor: { argb: 'FF0000' }
          };
          a.font = {
            color: { argb: 'FFFFFF' },
          };
          break;

        case 'EN COURS' :  a.fill =
          {
            type: 'pattern',
            pattern: 'gray125',
            bgColor: { argb: '0000FF' }
          };
          a.font = {
            color: { argb: 'FFFFFF' },
          };
          break;

        case 'ANNULE' :  a.fill =
          {
            type: 'pattern',
            pattern: 'gray125',
            bgColor: { argb: '0B0000' }
          };
          a.font = {
            color: { argb: 'FFFFFF' },
          };
          break;

        case 'EN RETARD' :  a.fill =
          {
            type: 'pattern',
            pattern: 'gray125',
            bgColor: { argb: 'FF8000' }
          };
          a.font = {
            color: { argb: 'FFFFFF' },
          };
          break;


        case 'ACHEVE' :  a.fill =
          {
            type: 'pattern',
            pattern: 'gray125',
            bgColor: { argb: '009900' }
          };
          a.font = {
            color: { argb: 'FFFFFF' },
          };
          break;
      }

    })
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
      'Statuts table genereted  at ' + date,
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
