import { Component, OnInit } from '@angular/core';
import {ProjectsClient, ProjectsVm} from "../../../web-api-client";
import {MenuComponent} from "../../../_metronic/kt/components";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent implements OnInit {

  vm : ProjectsVm;
  c : any = 0;
  closeResult : string = ''

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private listsProjects : ProjectsClient,
              private router : Router,
              private modalService: NgbModal,
              private toastr : ToastrService) {
    listsProjects.get().subscribe(
      result => {
        this.vm = result;
        this.sortedData = this.vm.projectDtos?.slice();
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {


  }
  open(content : any, videoId : any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteHero(videoId);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteHero(id : number) {
    this.listsProjects.delete(id).subscribe(result =>{
        this.toastr.success("Evaluation deleted success ","Good Job!", {timeOut: 3000})
        window.location.reload();
      },
      err =>{
        this.toastr.error("Error")
      })
  }


  goToUpdate(id  : any){
    this.router.navigate(['projects/update',id])
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }

  sortedData : any;
  sortData(sort: Sort) {
    const data = this.vm.projectDtos?.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data?.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'startDate': return compare(a.startDate, b.startDate, isAsc);
        case 'endDate': return compare(a.endDate, b.endDate, isAsc);
        case 'statut': return compare(a.statut?.title, b.statut?.title, isAsc);
        case 'note': return compare(a.note, b.note, isAsc);
        case 'taux': return compare(a.tauxR, b.tauxR, isAsc);
        case 'mode': return compare(a.modeReel, b.modeReel, isAsc);
        case 'type': return compare(a.typeProject?.title, b.typeProject?.title, isAsc);
        case 'code': return compare(a.codeProject, b.codeProject, isAsc);
        case 'p': return compare(a.priority, b.priority, isAsc);
        case 'isInit': return compare(a.isInitial, b.isInitial, isAsc);
        default: return 0;
      }
    });
  }

}
function compare(a : any, b : any, isAsc : any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
