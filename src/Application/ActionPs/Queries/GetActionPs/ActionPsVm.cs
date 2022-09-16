
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.ActionPs.Queries.GetActionPs;

public class ActionPsVm
{
    public ICollection<ActionP> ActionPDtos { get; set; } = new List<ActionP>();
}