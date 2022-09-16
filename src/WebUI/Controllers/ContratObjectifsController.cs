using CleanArchitecture.Application.ContratObjectifs.Commands.CreateBulkContratObjectif;
using CleanArchitecture.Application.ContratObjectifs.Commands.CreateContratObjectif;
using CleanArchitecture.Application.ContratObjectifs.Commands.DeleteContratObjectif;
using CleanArchitecture.Application.ContratObjectifs.Commands.UpdateContratObjectif;
using CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifById;
using CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifs;
using CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifStatById;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class ContratObjectifsController: ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ContratObjectifsVm>> Get()
    {
        return await Mediator.Send(new GetContratObjectifsQuery());
    }
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<ContratObjectifByIdVm>> Get(int id)
    {
        return await Mediator.Send(new GetContratObjectifByIdQuery() { ListId = id });
    } 
   
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateContratObjectifCommand command)
    {
        return await Mediator.Send(command);
    }
    
    [HttpPost("bulk/create/excel"),DisableRequestSizeLimit]
    public async Task<ActionResult<string>> CreateBulk([FromForm] CreateBulkContratObjectifCommand command)
    {
        return await Mediator.Send(command);
    }

   [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateContratObjectifCommand command)
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
        await Mediator.Send(new DeleteContratObjectifCommand { Id = id });

        return NoContent();
    }
    
    [HttpGet("stat/{id}")]
    public async  Task<ActionResult<ContratObjectifStatByIdVm>> GetStat(int id)
    {
        return await Mediator.Send(new GetContratObjectifStatByIdQuery() { ListId = id });
    }
    
}