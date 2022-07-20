using CleanArchitecture.Application.Dto.Helpers.TypeProjectModel;

namespace CleanArchitecture.Application.TypeProjects.Queries.GetTpStatOverViewById;

public class TypeProjectsStatVm
{
    public TypeProjectStat TypeProjectDto { get; set; } = new TypeProjectStat();
}