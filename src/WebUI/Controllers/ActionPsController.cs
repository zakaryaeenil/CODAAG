using CleanArchitecture.Application.ActionPs.Commands.CreateActionEvaluation;
using CleanArchitecture.Application.ActionPs.Commands.CreateActionP;
using CleanArchitecture.Application.ActionPs.Commands.CreateBulkActionP;
using CleanArchitecture.Application.ActionPs.Commands.DeleteActionP;
using CleanArchitecture.Application.ActionPs.Commands.UpdateActionP;
using CleanArchitecture.Application.ActionPs.Queries.GetActionPById;
using CleanArchitecture.Application.ActionPs.Queries.GetActionPs;
using CleanArchitecture.Application.ActionPs.Queries.GetActionPswithEval;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class ActionPsController : ApiControllerBase
{
    
    [HttpGet]
    public async Task<ActionResult<ActionPsVm>> Get()
    {
        return await Mediator.Send(new GetActionPsQuery());
    }
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<ActionPByIdVm>> Get(int id)
    {
        return await Mediator.Send(new GetActionPByIdQuery() { ListId = id });
    }
 
    [HttpGet("eval")]
    public async  Task<ActionResult<ActionPsWithEvalVm>> GetActionEval()
    {
        return await Mediator.Send(new GetActionPsWhitEvalQuery() { });
    } 
    
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateActionPCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPost("bulk/create/excel"),DisableRequestSizeLimit]
    public async Task<ActionResult<string>> CreateBulk([FromForm] CreateBulkActionPCommand command)
    {
        return await Mediator.Send(command);
    } 
    [HttpPost("evaluation")]
    public async Task<ActionResult<bool>> CreateEvaluation(int id ,int evalId, CreateActionPEvaluationCommand command)
    {
        if (id != command.Id || evalId != command.evalId)
        {
            return BadRequest();
        }

        return await Mediator.Send(command);
        
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateActionPCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await Mediator.Send(command);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteActionPCommand { Id = id });

        return NoContent();
    }
}