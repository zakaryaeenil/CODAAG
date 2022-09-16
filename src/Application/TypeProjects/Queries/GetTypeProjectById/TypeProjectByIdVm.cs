using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.TypeProjects.Queries.GetTypeProjectById;

public class TypeProjectByIdVm
{
    public TypeProject TypeProjectDto { get; set; } = new TypeProject();
}