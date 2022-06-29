using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.Gestionnaires.Queries.GetGestionnaires;

public class GestionnairesVm
{
    private ICollection<Gestionnaire> GestionnaireDtos = new List<Gestionnaire>();
}