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
  ContratObjectif,
  ContratObjectifByIdVm, ContratObjectifsClient,
  ContratObjectifStatByIdVm,
  StatutByIdVm,
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
  selector: 'app-co-over-view',
  templateUrl: './co-over-view.component.html',
  styleUrls: ['./co-over-view.component.scss']
})
export class CoOverViewComponent  {
  vm : ContratObjectifByIdVm;
  vmSat : ContratObjectifStatByIdVm;

  @ViewChild("chart") BarchartStacked : ChartComponent | any;

  public chartBarStatOptions : Partial<BarStackedChartOptions>;

  constructor(private listsco : ContratObjectifsClient , private router : ActivatedRoute) {
    listsco.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        listsco.getStat(router.snapshot.params['id']).subscribe(res =>{
          this.vmSat = res
          this.chartBarStatOptions = {
            series: [
              {
                name: this.vm.contratObjectifDto?.title,
                data: [res.contratObjectifDto?.projectsCount!,res.contratObjectifDto?.structuresCount!]
              },
              {
                name: "Other Contrats",
                data: [res.contratObjectifDto?.diffProjectsCount!,res.contratObjectifDto?.diffStructuresCount!]
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
              text: "Chart to View  "+  this.vm.contratObjectifDto?.title  +"  with others Contrats",
            },
            xaxis: {
              categories: ["Projects" , "Structures"]
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


}
