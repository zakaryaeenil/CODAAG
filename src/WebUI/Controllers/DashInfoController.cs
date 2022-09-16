using CleanArchitecture.Application.DashInfo.Query.GetFirstTranche;
using CleanArchitecture.Application.DashInfo.Query.GetSecondTranche;
using CleanArchitecture.Application.DashInfo.Query.GetStatPerStatut;
using CleanArchitecture.Application.DashInfo.Query.GetStatPerTp;
using CleanArchitecture.Application.DashInfo.Query.GetStatPerTri;
using CleanArchitecture.Application.DashInfo.Query.GetStructureInfo;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class DashInfoController : ApiControllerBase
{
    
    
    [HttpGet]
    public async  Task<ActionResult<StuctureInfoVm>> Get(int? id)
    {
        return await Mediator.Send(new GetStructureInfoQuery() { ItemId = id });
    }
 
    [HttpGet("tranche/first")]
    public async  Task<ActionResult<FirstTrancheVm>> GetFirstTanche(int? id)
    {
        return await Mediator.Send(new GetFirstTranchQuery() {ItemId = id});
    }
    
    [HttpGet("tranche/second")]
    public async  Task<ActionResult<GetSecondTrancheVm>> GetSecondTanche(int? id , int? conId)
    {
        return await Mediator.Send(new GetSecondTrancheQuery() {TypeProjectId = id , ConId = conId});
    }
    
    
    
    [HttpGet("tranche/tps")]
    public async  Task<ActionResult<GetStatPerTpVm>> GetStatTps(int? id , int? conId)
    {
        return await Mediator.Send(new GetStatPerTpQuery() {StructureId= id , ConId = conId});
    } 
    [HttpGet("tranche/stat")]
    public async  Task<ActionResult<GetStatPerStatutVm>> GetStatStatuts(int? id , int? conId)
    {
        return await Mediator.Send(new GetStatPerStatutQuery() {StructureId= id , ConId = conId});
    }
    [HttpGet("tranche/tri")]
    public async  Task<ActionResult<GetStatPerTriVm>> GetStatTris(int? id , int? conId)
    {
        return await Mediator.Send(new GetStatPerTriQuery()  {StructureId= id , ConId = conId});
    }
}