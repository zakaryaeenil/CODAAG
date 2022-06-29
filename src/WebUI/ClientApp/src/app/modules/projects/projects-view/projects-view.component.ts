import { Component, OnInit } from '@angular/core';
import {ProjectsClient, ProjectsVm} from "../../../web-api-client";
import {MenuComponent} from "../../../_metronic/kt/components";

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent implements OnInit {

  vm : ProjectsVm;
  c : any = 0;

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private listsProjects : ProjectsClient) {
    listsProjects.get().subscribe(
      result => {
        console.log(result);
        this.vm = result;
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {


  }


  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }


}
