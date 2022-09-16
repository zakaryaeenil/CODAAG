using CleanArchitecture.Application.Evaluations.Commands.CreateBulkEvaluation;
using CleanArchitecture.Application.Evaluations.Commands.CreateEvaluation;
using CleanArchitecture.Application.Evaluations.Commands.DeleteEvaluation;
using CleanArchitecture.Application.Evaluations.Commands.UpdateEvaluation;
using CleanArchitecture.Application.Evaluations.Queries.GetEvaluationById;
using CleanArchitecture.Application.Evaluations.Queries.GetEvaluations;
using CleanArchitecture.Application.Evaluations.Queries.GetEvaluationsStat;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class EvaluationsController: ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<EvaluationsVm>> Get()
    {
        return await Mediator.Send(new GetEvaluationsQuery());
    }
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<EvaluationByIdVm>> Get(int id)
    {
        return await Mediator.Send(new GetEvaluationByIdQuery() { ListId = id });
    } 
    
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateEvaluationCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPost("bulk/create/excel"),DisableRequestSizeLimit]
    public async Task<ActionResult<string>> CreateBulk([FromForm] CreateBulkEvaluationCommand command)
    {
        return await Mediator.Send(command);
    }

    
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateEvaluationCommand command)
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
        await Mediator.Send(new DeleteEvaluationCommand { Id = id });

        return NoContent();
    }
    

    [HttpGet("stat/{id}")]
    public async  Task<ActionResult<GetEvaluationStatByIdVm>> GetStat(int id)
    {
        return await Mediator.Send(new GetEvaluationStatByIdQuery() { ListId = id });
    }
}