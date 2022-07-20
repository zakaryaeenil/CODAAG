import {Component, ViewChild} from '@angular/core';

import {
  TypeProjectByIdVm, TypeProjectsClient, TypeProjectsStatVm
} from "../../../../web-api-client";
import {ActivatedRoute} from "@angular/router";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";

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
  selector: 'app-tp-overview-view',
  templateUrl: './tp-overview-view.component.html',
  styleUrls: ['./tp-overview-view.component.scss']
})
export class TpOverviewViewComponent {
  vmSat : TypeProjectsStatVm;
  vm : TypeProjectByIdVm;


  public chartBarStatOptions : Partial<BarStackedChartOptions>;
  @ViewChild("chart") BarchartStacked : ChartComponent | any;

  constructor(private liststp : TypeProjectsClient, private router : ActivatedRoute) {
    liststp.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
      },
      error => console.error(error)
    );
    liststp.getStat(router.snapshot.params['id']).subscribe(res =>{
      this.vmSat = res
      this.chartBarStatOptions = {
        series: [
          {
            name: this.vm.typeProjectDto?.title,
            data: [res.typeProjectDto?.typePCount!]
          },
          {
            name: "Other Types",
            data: [res.typeProjectDto?.diffETypePCount!]
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
          text: "Chart to View  " +this.vm.typeProjectDto?.title + "  with others Type Projects",
        },
        xaxis: {
          categories: ["Projects"]
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
  }


}
