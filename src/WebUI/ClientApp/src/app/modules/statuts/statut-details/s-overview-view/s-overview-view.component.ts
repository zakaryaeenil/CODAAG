import {Component, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";
import { StatutByIdVm, StatutsClient, StatutStatByIdVm} from "../../../../web-api-client";
import {ActivatedRoute} from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries ;
  chart: ApexChart ;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle ;
};
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
  selector: 'app-s-overview-view',
  templateUrl: './s-overview-view.component.html',
  styleUrls: ['./s-overview-view.component.scss']
})
export class SOverviewViewComponent  {
  vm : StatutByIdVm;
  vmSat : StatutStatByIdVm;

  @ViewChild("chart") chart : ChartComponent | any;
  @ViewChild("chart") BarchartStacked : ChartComponent | any;


  public chartOptions : Partial<ChartOptions>;
  public chartBarStatOptions : Partial<BarStackedChartOptions>;

  constructor(private listsStatut : StatutsClient, private router : ActivatedRoute)  {
    listsStatut.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.chartOptions = {
          series : [
            {
              name: "My-series",
              data: [result.statutDto?.contratObjectifs?.length!,
                result.statutDto?.evaluations?.length!,
                result.statutDto?.projects?.length!,
                result.statutDto?.actionPs?.length!
              ]
            }
          ],
          chart: {
            height: 350,
            type: "bar"
          },
          title: {
            text: "Chart To view Statut branchs "
          },
          xaxis: {
            categories: ["Contrats","Evaluations","Projects" , "Actions"]
          }
        };
      },
      error => console.error(error)
    );
    listsStatut.getStat(router.snapshot.params['id']).subscribe(res =>{
      this.vmSat = res
      this.chartBarStatOptions = {
        series: [
          {
            name: this.vm.statutDto?.title,
            data: [res.statutStat?.contratsCount!,res.statutStat?.evaluationsCount!,res.statutStat?.projectsCount!,res.statutStat?.actionPsCount!]
          },
          {
            name: "Other Statuts",
            data: [res.statutStat?.diffContratsCount!,res.statutStat?.diffEvaluationsCount!,res.statutStat?.diffProjectsCount!,res.statutStat?.diffActionPsCount!]
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
          text: "Chart to View  " +this.vm.statutDto?.title + "  with others Statuts",
        },
        xaxis: {
          categories: ["Contrats","Evaluations","Projects" , "Actions"]
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
