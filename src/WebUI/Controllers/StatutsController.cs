using CleanArchitecture.Application.Statuts.Commands.CreateStatut;
using CleanArchitecture.Application.Statuts.Commands.DeleteStatut;
using CleanArchitecture.Application.Statuts.Commands.UpdateStatut;
using CleanArchitecture.Application.Statuts.Queries.GetStatutById;
using CleanArchitecture.Application.Statuts.Queries.GetStatuts;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class StatutsController: ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<StatutsVm>> Get()
    {
        return await Mediator.Send(new GetStatutsQuery());
    }
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<StatutByIdVm>> Get(int id)
    {
        return await Mediator.Send(new GetStatutByIdQuery() { ListId = id });
    }
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateStatutCommand command)
    {
        
            return await Mediator.Send(command);
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateStatutCommand command)
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
        await Mediator.Send(new DeleteStatutCommand { Id = id });

        return NoContent();
    }
}