using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Statuts.Queries.GetStatuts;

public class StatutsVm
{
    public ICollection<Statut> StatutDtos { get; set; } = new List<Statut>();
}