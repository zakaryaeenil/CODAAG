import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StatutByIdVm, StatutsClient, StructureByIdVm, StructuresClient} from "../../../../web-api-client";
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent} from "ng-apexcharts";
import {ActivatedRoute} from "@angular/router";

export type ChartOptions = {
  series: ApexAxisChartSeries ;
  chart: ApexChart ;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle ;
};
@Component({
  selector: 'app-o-structure',
  templateUrl: './o-structure.component.html',
  styleUrls: ['./o-structure.component.scss']
})
export class OStructureComponent {
  vm : StructureByIdVm;

  @ViewChild("chart") chart : ChartComponent | any;

  public chartOptions : Partial<ChartOptions>;

  constructor(private listsStructures : StructuresClient, private router : ActivatedRoute)  {
    listsStructures.get2(router.snapshot.params['id']).subscribe(
      result => {
        this.vm = result;
        this.chartOptions = {
          series : [
            {
              name: "My-series",
              data: [result.structureDto?.contratObjectifs?.length!,
                result.structureDto?.gestionnaires?.length!,
                result.structureDto?.structureChildren?.length!,
                result.structureDto?.projects?.length!,
                result.structureDto?.actionPs?.length!
              ]
            }
          ],
          chart: {
            height: 350,
            type: "bar"
          },
          title: {
            text: "Chart To view Structure branchs "
          },
          xaxis: {
            categories: ["Contrats","Gestionnaire","Structure Children","Projects" , "Actions"]
          }
        };
      },
      error => console.error(error)
    );
  }
}
