using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Projects.Queries.GetProjects;

public class ProjectsVm
{
    public ICollection<Project> ProjectDtos { get; set; } = new List<Project>();
}