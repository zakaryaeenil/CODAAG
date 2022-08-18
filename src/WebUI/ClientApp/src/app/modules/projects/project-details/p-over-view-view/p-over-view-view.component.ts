import {Component, OnInit, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent} from "ng-apexcharts";
import {ProjectByIdVm, ProjectsClient, StructureByIdVm, StructuresClient} from "../../../../web-api-client";
import {ActivatedRoute} from "@angular/router";
export type ChartOptions = {
  series: ApexAxisChartSeries ;
  chart: ApexChart ;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle ;
};
@Component({
  selector: 'app-p-over-view-view',
  templateUrl: './p-over-view-view.component.html',
  styleUrls: ['./p-over-view-view.component.scss']
})
export class POverViewViewComponent {

  vm : ProjectByIdVm;

  @ViewChild("chart") chart : ChartComponent | any;

  public chartOptions : Partial<ChartOptions>;

  constructor(private listsProjects : ProjectsClient, private router : ActivatedRoute)  {
    listsProjects.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.chartOptions = {
          series : [
            {
              name: "My-series",
              data: [result.projectDto?.contratObjectifs?.length!,
                result.projectDto?.structures?.length!,
                result.projectDto?.actions?.length!,
                result.projectDto?.evaluations?.length!,
              ]
            }
          ],
          chart: {
            height: 350,
            type: "bar"
          },
          title: {
            text: "Chart To view Project branchs "
          },
          xaxis: {
            categories: ["Contrats","Structures" , "Actions","Evaluations"]
          }
        };
      },
      error => console.error(error)
    );
  }

}
