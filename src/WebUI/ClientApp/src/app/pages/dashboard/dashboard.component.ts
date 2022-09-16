import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ContratObjectifsClient,
  ContratObjectifsVm,
  DashInfoClient,
  Evaluation,
  EvaluationsClient,
  FirstTrancheVm,
  GetSecondTrancheVm,
  GetStatPerStatutVm,
  GetStatPerTpVm,
  GetStatPerTriVm,
  StructuresClient,
  StructuresVm,
} from "../../web-api-client";
import {Observable} from "rxjs";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart, ChartComponent, ApexAxisChartSeries, ApexDataLabels, ApexPlotOptions, ApexXAxis
} from "ng-apexcharts";

export type ChartOptionsStructures = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptionsStatuts = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptionsTp = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};
export type ChartOptionsTrimestre = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public vm : StructuresVm;
  public _evaluations : Evaluation[];

  public getDataInfo : Observable<any>;
  public getStructures : Observable<any>;
  public getEval : Observable<any>;

  public selectedStruc : any = null;
  public _isActive : boolean = false;
  public a : any;
  public p : any;
  public c : any;
  public today = new Date();
  public final : any;
  public typeProjectName : any;

  //
  public contratsVm : ContratObjectifsVm;
  public vmFirsttTranche : FirstTrancheVm;
  public vmSecondtTranche : GetSecondTrancheVm;

  public vmFirstStatPerTP : GetStatPerTpVm;
  public vmFirstStatPerStatut : GetStatPerStatutVm;
  public vmFirstStatPerTri : GetStatPerTriVm;
  public vmStatStructures : StructuresVm;

  public getContrats : Observable<any>;
  public coId : any = null;
  public getFirsttTranche : Observable<any>;
  public getSecondTranche : Observable<any>;
  public getStatsPerTp : Observable<any>;
  public getStatsPerStatuts : Observable<any>;
  public getStatsPerTri : Observable<any>;
  public getStatsStructures : Observable<any>;
  public statutss : any[]  = []
  //
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsStructures : Partial<ChartOptionsStructures>;

  @ViewChild("chart1") chart1: ChartComponent;
  public chartOptionsStatuts : Partial<ChartOptionsStatuts>;

  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptionsTp : Partial<ChartOptionsTp>;

  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptionsTrimestre : Partial<ChartOptionsTrimestre>;

  constructor(private DashService : DashInfoClient ,private ContratList : ContratObjectifsClient, private StructureList : StructuresClient, EvaluationList : EvaluationsClient) {
    this.chartOptionsStructures = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.chartOptionsStatuts = {
      series: [],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptionsTp = {
      series: [
        {  name : "basic",
          data : []
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
        ]
      }
    };
    this.chartOptionsTrimestre = {
      series: [
        {  name : "basic",
          data : []
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
        ]
      }
    };

    this._evaluations =[]
    this.statutss =[]
    this.getStatsStructures = StructureList.get();
    this.getDataInfo = DashService.get(null);
    this.getFirsttTranche = DashService.getFirstTanche(null)
    this.getContrats = ContratList.get();
    this._isActive = false;
    this.getStructures = StructureList.get();
    this.getEval = EvaluationList.get();
    this.getDataInfo.subscribe(res =>{
      this.a = res._stuctureInfoModel?.actionCount;
      this.p = res._stuctureInfoModel?.projectCount;
      this.c = res._stuctureInfoModel?.contratCount;
     // console.log(this.a)
    })
    this.getStructures.subscribe(res =>{
      this.vm = res
      //console.log(this.vm)
    })
    this.getEval.subscribe(res =>{
      res.evaluationDtos.map((item : any) =>{
        if (item.startDate <= this.today && this.today <= item.endDate  )
          this._evaluations.push(item)
        this._isActive = true;
      })
    })
    this.getContrats.subscribe(res =>{
      this.contratsVm = res
    })
    this.getFirsttTranche.subscribe(res =>{
      this.final = 0
      this.vmFirsttTranche = res
    this.vmFirsttTranche.firstTranches?.map(item =>{
     this.final +=  item.nbrProjects
    })
    })
    this.getStatsStructures.subscribe(res =>{
      this.vmStatStructures = res
      this.vmStatStructures.structureDtos?.map((item : any) =>{
        this.chartOptionsStructures.series?.push(item.projects.length)
        this.chartOptionsStructures.labels?.push(item.title)
      })
    })
  }


  OnChangeStructure(event : any){
    this.statutss = []
    this.getDataInfo = this.DashService.get(this.selectedStruc);
    this.getDataInfo.subscribe(res =>{
      this.a = res._stuctureInfoModel?.actionCount;
      this.p = res._stuctureInfoModel?.projectCount;
      this.c = res._stuctureInfoModel?.contratCount;
       console.log(res)
    })
    //Stats
    this.getStatsPerTp = this.DashService.getStatTps(this.selectedStruc,this.coId)
    this.getStatsPerStatuts = this.DashService.getStatStatuts(this.selectedStruc,this.coId)
    this.getStatsPerTri = this.DashService.getStatTris(this.selectedStruc,this.coId)

    this.getStatsPerTp.subscribe(res =>{
      this.vmFirstStatPerTP = res
      this.getChartTp( this.vmFirstStatPerTP._typeProjects)
    })
    this.getStatsPerStatuts.subscribe(res =>{
      this.vmFirstStatPerStatut = res
      this.getChartStatuts( this.vmFirstStatPerStatut.perStructureModels)
    })
    this.getStatsPerTri.subscribe(res =>{
      this.vmFirstStatPerTri = res
      this.getChartTrimestre( this.vmFirstStatPerTri.perTrimestreModels)
    })
  }
  OnChangeContrat(){
    this.statutss = []
    this.getFirsttTranche = this.DashService.getFirstTanche(this.coId);
     this.getFirsttTranche.subscribe(res =>{
       this.final = 0
       this.vmFirsttTranche = res
       this.vmFirsttTranche.firstTranches?.map(item =>{
         this.final +=  item.nbrProjects
       })
     })
    //Stats
    this.getStatsPerTp = this.DashService.getStatTps(this.selectedStruc,this.coId)
    this.getStatsPerStatuts = this.DashService.getStatStatuts(this.selectedStruc,this.coId)
    this.getStatsPerTri = this.DashService.getStatTris(this.selectedStruc,this.coId)

    this.getStatsPerTp.subscribe(res =>{
      this.vmFirstStatPerTP = res
      this.getChartTp( this.vmFirstStatPerTP._typeProjects)
    })
    this.getStatsPerStatuts.subscribe(res =>{
      this.vmFirstStatPerStatut = res
      this.getChartStatuts( this.vmFirstStatPerStatut.perStructureModels)
    })
    this.getStatsPerTri.subscribe(res =>{
      this.vmFirstStatPerTri = res
      this.getChartTrimestre( this.vmFirstStatPerTri.perTrimestreModels)
    })
  }
  OnChangeTypeProject(tp : any ,name : any){

    this.typeProjectName = name
    this.getSecondTranche = this.DashService.getSecondTanche(tp , this.coId)
    this.getSecondTranche.subscribe(res =>{
      let i = 0
      this.statutss = []
      this.vmSecondtTranche = res
      this.vmSecondtTranche.seconds?.map(item =>{
        if(i == 0){
          item.statutsTaux?.map(x =>{
            this.statutss.push(x.statutName);
          })
          i++;
        }
      })
    })
  }

  getChartStatuts(vmFirstStatPerTP : any){

    this.chartOptionsStatuts.series = [];
    this.chartOptionsStatuts.labels = [];

    vmFirstStatPerTP.map((item : any) =>{
      this.chartOptionsStatuts.series?.push(item.taux)
      this.chartOptionsStatuts.labels?.push(item.statutName)
    })
     console.log( this.chartOptionsStatuts.series ,   'series')
     console.log( this.chartOptionsStatuts.labels ,   'labels')
  }
  getChartTp(vmFirstStatPerTP : any){
    this.chartOptionsTp.series = [{
      name : "basic",
      data : []
    }];
    this.chartOptionsTp.xaxis!.categories =  [] ;

    vmFirstStatPerTP.map((item : any) =>{
      this.chartOptionsTp.series?.map(x => x.data.push(item.taux))
      this.chartOptionsTp.xaxis?.categories.push(item.tpName)
    })
    console.log( this.chartOptionsTp.series ,   'series')
    console.log( this.chartOptionsTp.xaxis?.categories ,   'labels')
  }
  getChartTrimestre(vmFirstStatPerTP : any){
    this.chartOptionsTrimestre.series = [{
      name : "basic",
      data : []
    }];
    this.chartOptionsTrimestre.xaxis!.categories =  [] ;
    vmFirstStatPerTP.map((item : any) =>{
      this.chartOptionsTrimestre.series?.map(x => x.data.push(item.taux))
      this.chartOptionsTrimestre.xaxis?.categories.push(item.trimestreName)
    })
    console.log( this.chartOptionsTrimestre.series ,   'series')
    console.log( this.chartOptionsTrimestre.xaxis?.categories ,   'labels')
  }
  ngOnInit(): void {

  }
}
