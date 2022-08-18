import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ActionP,
  ActionPsClient,
  ActionPsWithEvalVm,
  CreateActionPEvaluationCommand, ProjectsClient,
  ProjectsWithEvalVm
} from "../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-eval-project',
  templateUrl: './eval-project.component.html',
  styleUrls: ['./eval-project.component.scss']
})
export class EvalProjectComponent implements OnInit {
  anio: Date = new Date();
  vm : ProjectsWithEvalVm;
  e : number = 0;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Title',  field: 'title'},
    {headerName: 'Note',  field: 'note'},
    {headerName: 'TauxR %', editable: true,field: 'tauxR',

      cellEditorPopup: true,
      valueSetter: (params) =>  { this.valueSetter(params)
        return true
      },
      valueFormatter : (params) =>  this.currencyFormatter(params,this.e) },
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



  constructor(private listsProjects : ProjectsClient , private toastr : ToastrService) {
    listsProjects.getActionEval().subscribe(
      result => {
        this.vm = result;
         this.rowData$ = this.vm.projectsDtos
      },
      error => console.error(error)
    );

  }

  valueSetter(params  : any){
    params.data.tauxR = params.newValue
    console.log(params , 'params')
    return true;
  }
  onRowValueChanged(event : any) {
    console.log(event.data , 'row 2')
    this.listsProjects.createEvaluation(event.data.id,this.e,<CreateActionPEvaluationCommand>{
      tauxR : event.data.tauxR ,
      evalId : this.e,
      id : event.data.id
    }).subscribe(result => {

        this.toastr.success("Action was Evaluated  successfully !!", "Good Job!", {
          timeOut: 3000
        })
        this.listsProjects.getActionEval().subscribe(
          result => {
            this.vm = result;
            this.rowData$ = this.vm.projectsDtos
            this.agGrid.api.setRowData(this.rowData$!);
          },
        );
      },
      error => {
        let errors = JSON.parse(error.response);
        if (errors && errors.errors && errors.errors.tauxR) {
          errors.errors.tauxR.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })
        }
        if (errors && errors.errors && errors.errors.Id) {
          errors.errors.Id.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })
        }
        if (errors && errors.errors && errors.errors.evalId) {
          errors.errors.evalId.forEach((e: string | undefined) => {
            this.toastr.error(e, "Major Error!", {
              timeOut: 4000
            });
          })
        }
      })
  }

  callType(value : any) {
    console.log(this.e,'change')
    this.agGrid.api.setRowData(this.rowData$!);
  }
  ngOnInit(): void {
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.projectsDtos
    this.agGrid.api = params.api;
  }

  currencyFormatter(params : any , e : number)  {
    console.log(e , 'init')
    let a = 0;
    params.data.evaluations.some((x : any)  => {
      if(x.evaluationId === e){
        a = x.tauxR;
      }
    });
    return a.toString()
  }

}
