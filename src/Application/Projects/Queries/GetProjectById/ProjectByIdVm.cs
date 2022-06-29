using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Projects.Queries.GetProjectById;

public class ProjectByIdVm
{
    public Project ProjectDto { get; set; }
}