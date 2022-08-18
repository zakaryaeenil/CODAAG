import {Component, OnInit, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent} from "ng-apexcharts";
import {ActionPByIdVm, ActionPsClient, ProjectByIdVm, ProjectsClient} from "../../../../web-api-client";
import {ActivatedRoute} from "@angular/router";
export type ChartOptions = {
  series: ApexAxisChartSeries ;
  chart: ApexChart ;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle ;
};
@Component({
  selector: 'app-a-over-view-view',
  templateUrl: './a-over-view-view.component.html',
  styleUrls: ['./a-over-view-view.component.scss']
})
export class AOverViewViewComponent {

  vm : ActionPByIdVm;

  @ViewChild("chart") chart : ChartComponent | any;

  public chartOptions : Partial<ChartOptions>;

  constructor(private listsAction : ActionPsClient, private router : ActivatedRoute)  {
    listsAction.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.chartOptions = {
          series : [
            {
              name: "My-series",
              data: [result.actionPDto?.structures?.length!,
                result.actionPDto?.evaluations?.length!,
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
            categories: ["Structures" ,"Evaluations"]
          }
        };
      },
      error => console.error(error)
    );
  }

}
