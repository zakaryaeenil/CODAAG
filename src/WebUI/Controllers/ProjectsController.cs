using CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifById;
using CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifs;
using CleanArchitecture.Application.Projects.Commands.CreateBulkProject;
using CleanArchitecture.Application.Projects.Commands.CreateProject;
using CleanArchitecture.Application.Projects.Commands.CreateProjectEvaluation;
using CleanArchitecture.Application.Projects.Commands.DeleteProject;
using CleanArchitecture.Application.Projects.Commands.UpdateProject;
using CleanArchitecture.Application.Projects.Queries.GetProjectById;
using CleanArchitecture.Application.Projects.Queries.GetProjects;
using CleanArchitecture.Application.Projects.Queries.GetProjectWithEval;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.WebUI.Controllers;

public class ProjectsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ProjectsVm>> Get()
    {
        return await Mediator.Send(new GetProjectsQuery());
    }
    
    [HttpGet("{id}")]
    public async  Task<ActionResult<ProjectByIdVm>> Get(int id)
    {
        return await Mediator.Send(new GetProjectByIdQuery() { ListId = id });
    } 
    [HttpGet("eval")]
    public async  Task<ActionResult<ProjectsWithEvalVm>> GetActionEval()
    {
        return await Mediator.Send(new GetProjectsWithEvalQuery() { });
    } 
    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateProjectCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPost("bulk/create/excel"),DisableRequestSizeLimit]
    public async Task<ActionResult<string>> CreateBulk([FromForm] CreateBulkProjectCommand command)
    {
        return await Mediator.Send(command);
    }
    [HttpPost("evaluation")]
    public async Task<ActionResult<bool>> CreateEvaluation(int id ,int evalId, CreateProjectEvaluationCommand command)
    {
        if (id != command.Id || evalId != command.evalId)
        {
            return BadRequest();
        }

        return await Mediator.Send(command);
        
    }
 
    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateProjectCommand command)
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
        await Mediator.Send(new DeleteProjectCommand { Id = id });

        return NoContent();
    }
}