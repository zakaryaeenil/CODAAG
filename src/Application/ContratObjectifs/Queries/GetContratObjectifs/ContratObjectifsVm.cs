using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.ContratObjectifs.Queries.GetContratObjectifs;

public class ContratObjectifsVm
{
    public ICollection<ContratObjectif> ContratObjectifDtos { get; set; } = new List<ContratObjectif>();
}