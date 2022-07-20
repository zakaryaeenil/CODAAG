import {Component, Input, ViewChild} from '@angular/core';
import {ContratObjectif, Gestionnaire, Structure, StructureByIdVm, StructuresClient} from "../../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-g-structure',
  templateUrl: './g-structure.component.html',
  styleUrls: ['./g-structure.component.scss']
})
export class GStructureComponent  {
  @Input()  str_gTable : Structure | undefined;

  vm : StructureByIdVm;
  public columnDefs: ColDef[] = [
    {headerName: 'ID', field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Nom', field: 'nom'},
    {headerName: 'Prenom', field: 'prenom'},
    {headerName: 'Login', field: 'login'},
    {headerName: 'Code', field: 'code'},
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
  public rowData$ !: Gestionnaire[] | undefined ;

  constructor(private listsStructures : StructuresClient, private router : ActivatedRoute){
    listsStructures.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.rowData$ = result.structureDto?.gestionnaires
        console.log(this.rowData$,"sub rows")
        console.log(this.vm.structureDto,"sub struc")
      },
      error => console.error(error)
    );
  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    console.log(this.rowData$,"rows")
    this.rowData$ = this.vm.structureDto?.gestionnaires!
    this.agGrid.api = params.api;
  }

  // Export Excel
  onBtnExport() {
    this.agGrid.api.exportDataAsCsv();
  }

}
