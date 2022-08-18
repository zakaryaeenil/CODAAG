import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill, ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle, ApexTooltip,
  ApexXAxis, ChartComponent
} from "ng-apexcharts";
import {
  Evaluation,
  EvaluationByIdVm, EvaluationsClient,
  GetEvaluationStatByIdVm,
  StatutByIdVm,
  StatutsClient,
  StatutStatByIdVm
} from "../../../../web-api-client";
import {ActivatedRoute} from "@angular/router";
export type BarStackedChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: 'app-e-over-view-view',
  templateUrl: './e-over-view-view.component.html',
  styleUrls: ['./e-over-view-view.component.scss']
})
export class EOverViewViewComponent implements OnInit {
  vm : EvaluationByIdVm;
  vmSat : GetEvaluationStatByIdVm;
  @ViewChild("chart") BarchartStacked : ChartComponent | any;
  public chartBarStatOptions : Partial<BarStackedChartOptions>;

  constructor(private listseval : EvaluationsClient, private router : ActivatedRoute) {
    listseval.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        listseval.getStat(router.snapshot.params['id']).subscribe(res =>{
          this.vmSat = res
          this.chartBarStatOptions = {
            series: [
              {
                name: this.vm.evaluationDto?.title,
                data: [res.evaluationStat?.projectsCount!,res.evaluationStat?.actionPsCount!]
              },
              {
                name: "Other Evaluations",
                data: [res.evaluationStat?.diffProjectsCount!,res.evaluationStat?.diffActionPsCount!]
              }
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: true,
              stackType: "100%"
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            stroke: {
              width: 1,
              colors: ["#fff"]
            },
            title: {
              text: "Chart to View  " +this.vm.evaluationDto?.title + "  with others evaluations",
            },
            xaxis: {
              categories: ["Projects" , "Actions"]
            },
            tooltip: {
              y: {
                formatter: function(val) {
                  return val + "";
                }
              }
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetX: 40
            }
          };
        })

      },
      error => console.error(error)
    );

  }

  ngOnInit(): void {
  }

}
