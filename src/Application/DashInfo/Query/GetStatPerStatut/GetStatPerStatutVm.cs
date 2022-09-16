using CleanArchitecture.Application.Dto.Helpers.DashModels;

namespace CleanArchitecture.Application.DashInfo.Query.GetStatPerStatut;

public class GetStatPerStatutVm
{
    public ICollection<PerStatutModel> PerStructureModels { get; set; }= new List<PerStatutModel>();  
}