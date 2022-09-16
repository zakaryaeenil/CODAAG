using CleanArchitecture.Application.Structures.Commands.CreateBulkStructure;
using CleanArchitecture.Application.Structures.Commands.CreateStructure;
using CleanArchitecture.Application.Structures.Commands.DeleteStructure;
using CleanArchitecture.Application.Structures.Commands.UpdateStructure;
using CleanArchitecture.Application.Structures.Queries.GetStructureById;
using CleanArchitecture.Application.Structures.Queries.GetStructures;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class StructuresController: ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<StructuresVm>> Get()
    {
        return await Mediator.Send(new GetStructuresQuery());
    }
    
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<StructureByIdVm>> Get(int id)
    {
       return await Mediator.Send(new GetStructureByIdQuery { ListId = id });
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateStructureCommand command)
    {
        return await Mediator.Send(command);
    } 
    [HttpPost("bulk/create/excel"),DisableRequestSizeLimit]
    public async Task<ActionResult<string>> CreateBulk([FromForm] CreateBulkStructureCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateStructureCommand command)
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
        await Mediator.Send(new DeleteStructureCommand { Id = id });

        return NoContent();
    }
}