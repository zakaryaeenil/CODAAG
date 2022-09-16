import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ActionP,
  ActionPsClient,
  ActionPsVm,
  ActionPsWithEvalVm, CreateActionPEvaluationCommand, Evaluation, EvaluationActionP,
  EvaluationsClient,
  EvaluationsVm
} from "../../../web-api-client";
import {ColDef, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ActionButtonRenderComponent} from "../ActionRenders/action-button-render.component";
import {isValid} from "ngx-bootstrap/chronos/create/valid";
import {NumericEditorComponent} from "../ActionRenders/numeric-editor.component";

@Component({
  selector: 'app-eval-action',
  templateUrl: './eval-action.component.html',
  styleUrls: ['./eval-action.component.scss']
})
export class EvalActionComponent implements OnInit {
  anio: Date = new Date();
  vm : ActionPsWithEvalVm;
  e : number = 0;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    {headerName: 'ID',  field: 'id', filter: 'agNumberColumnFilter'},
    {headerName: 'Title',  field: 'title'},
    {headerName: 'Note',  field: 'note'},
    {headerName: 'TauxR %', editable: true,field: 'tauxR',

      cellEditorPopup: true,
    }
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



  constructor(private listsActionPs : ActionPsClient , private toastr : ToastrService) {
    listsActionPs.getActionEval().subscribe(
      result => {
        this.vm = result;
       // this.rowData$ = this.vm.actionPDtos
      },
      error => console.error(error)
    );

  }

  onRowValueChanged(event : any) {
    console.log(this.e , 'data')
    console.log(event.data , 'data')
    this.listsActionPs.createEvaluation(event.data.id,this.e,<CreateActionPEvaluationCommand>{
      tauxR : event.data.tauxR ,
      evalId : this.e,
      id : event.data.id
    }).subscribe(
      res => {
        console.log(res , 'res')
        if (res){
          this.toastr.success("Action was Evaluated  successfully !!", "Good Job!", {
            timeOut: 3000
          })
        }
       else if (!res){
          this.toastr.error("Number must be superior to" , "Please Repeat!", {
            timeOut: 3000
          })
        }
        this.listsActionPs.getActionEval().subscribe(result => {
          this.vm = result;
          this.rowData$ = this.vm.actionPDtos
          this.agGrid.api.setRowData(this.rowData$!);
        },);
      }
      , error => {
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
        this.listsActionPs.getActionEval().subscribe(result => {
          this.vm = result;
          this.rowData$ = this.vm.actionPDtos
          this.agGrid.api.setRowData(this.rowData$!);
        },);
      })
  }

  ngOnInit(): void {
  }
  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vm.actionPDtos
    this.agGrid.api = params.api;
  }


}
