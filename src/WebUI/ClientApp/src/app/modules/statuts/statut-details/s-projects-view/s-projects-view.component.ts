import {Component, Input,  ViewChild} from '@angular/core';
import { Project, Statut, StatutByIdVm, StatutsClient} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";
import * as fs from "file-saver";
import {Workbook} from "exceljs";

@Component({
  selector: 'app-s-projects-view',
  templateUrl: './s-projects-view.component.html',
  styleUrls: ['./s-projects-view.component.scss']
})
export class SProjectsViewComponent {
  @Input() s_pTable: Statut | undefined;

  vm: StatutByIdVm;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Code Project', field: 'codeProject'},
    {headerName: 'Title', field: 'title'},
    {headerName: 'Note', field: 'note'},
    {headerName: 'TauxR per %', field: 'tauxR', filter: 'agNumberColumnFilter'},
    {headerName: 'Type Project', field: 'typeProject.title'},
    {headerName: 'Mode', field: 'modeReel'},
    {headerName: 'Structures', field: 'structures.length', filter: 'agNumberColumnFilter', cellStyle: {color: 'blue'}},
    {headerName: 'Start Date', field: 'startDate', filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'End Date', field: 'endDate', filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'Start Date Prv', field: 'startDatePrv', filter: 'agDateColumnFilter', filterParams: filterParams},
    {headerName: 'End Date Prv', field: 'endDatePrv', filter: 'agDateColumnFilter', filterParams: filterParams}
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

  constructor(private listsStatut: StatutsClient, private router: ActivatedRoute) {
    listsStatut.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.statutDto?.projects
      },
      error => console.error(error)
    );

  }


  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.statutDto?.projects!
    this.agGrid.api = params.api;
  }

  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }

  export() {

    const title = 'Projects for Statut_' + this.vm.statutDto?.title;
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Projects for Statut_' + this.vm.statutDto?.title);

    //Add Row and formatting
    worksheet.mergeCells('A1', 'L4');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title;
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: {argb: '0085A3'},
    };
    titleRow.alignment = {vertical: 'middle', horizontal: 'center'};

    let headerRow = worksheet.addRow(['ID', 'Code Project', 'Title', 'Note', 'Taux de realisation', 'Type Project', 'Mode', 'Structures', 'Start Date', 'End Date', 'Start Date Preview', 'End Date Preview'], 'n');

    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '4167B8'},
        bgColor: {argb: ''},
      };
      cell.font = {
        bold: true,
        color: {argb: 'FFFFFF'},
        size: 15,
      };
    });

    // Adding Data with Conditional Formatting
    this.rowData$!.forEach(d => {
      worksheet.addRow([d.id, d.codeProject, d.title, d.note, d.tauxR, d.typeProject?.title, d.modeReel, d.structures?.length, d.startDate, d.endDate, d.startDatePrv, d.endDatePrv]);
    });
    worksheet.addRow([]);

    worksheet.columns.forEach(function (column, i) {
      var maxLength = 0;
      column["eachCell"]!({includeEmpty: true}, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    //Footer Row
    let footerRow = worksheet.addRow([
      'Evaluations table genereted  at ' + date,
    ]);
    footerRow.alignment = {vertical: 'middle', horizontal: 'center'};
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FFB050'},
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
