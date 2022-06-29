using CleanArchitecture.Application.Common.Mappings;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Dto;

public class TypeProjectDto : IMapFrom<TypeProject>
{
    public TypeProjectDto()
    {
        Projects = new List<ProjectDto>();
    }
    public int Id { get; set; }
    public string CodeTP { get; set; }
    public string Title { get; set; }

    public ICollection<ProjectDto> Projects { get; set; }
}