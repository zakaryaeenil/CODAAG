using CleanArchitecture.Application.TypeProjects.Commands.CreateTypeProject;
using CleanArchitecture.Application.TypeProjects.Commands.DeleteTypeProject;
using CleanArchitecture.Application.TypeProjects.Commands.UpdateTypeProject;
using CleanArchitecture.Application.TypeProjects.Queries.GetTpStatOverViewById;
using CleanArchitecture.Application.TypeProjects.Queries.GetTypeProjectById;
using CleanArchitecture.Application.TypeProjects.Queries.GetTypeProjects;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class TypeProjectsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<TypeProjectsVm>> Get()
    {
        return await Mediator.Send(new GetTypeProjectsQuery());
    }
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<TypeProjectByIdVm>> Get(int id)
    {
        return await Mediator.Send(new GetTypeProjectByIdQuery() { ListId = id });
    } 
    
   [HttpPost]
    public async Task<ActionResult<int>> Create(CreateTypeProjectCommand command)
    {
        
        return await Mediator.Send(command);
    }
    
   [HttpPut("{id}")]
   public async Task<ActionResult> Update(int id, UpdateTypeProjectCommand command)
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
       await Mediator.Send(new DeleteTypeProjectCommand { Id = id });

       return NoContent();
   }
   
   
   [HttpGet("stat/{id}")]
   public async  Task<ActionResult<TypeProjectsStatVm>> GetStat(int id)
   {
       return await Mediator.Send(new GetTypeProjectsStatQuery() { ListId = id });
   }
}