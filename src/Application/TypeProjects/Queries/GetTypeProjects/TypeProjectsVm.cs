using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.TypeProjects.Queries.GetTypeProjects;

public class TypeProjectsVm
{
    public ICollection<TypeProject> TypeProjectDtos { get; set; } = new List<TypeProject>();
}