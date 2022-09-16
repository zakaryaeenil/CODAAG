using CleanArchitecture.Application.Dto.Helpers.DashModels;

namespace CleanArchitecture.Application.DashInfo.Query.GetStatPerTri;

public class GetStatPerTriVm
{
    public ICollection<PerTrimestreModel> PerTrimestreModels { get; set; }= new List<PerTrimestreModel>(); 
 
}