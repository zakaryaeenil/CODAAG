using CleanArchitecture.Application.Dto.Helpers.DashModels;

namespace CleanArchitecture.Application.DashInfo.Query.GetStatPerTp;

public class GetStatPerTpVm
{
    public ICollection<FisrtStatTPModel> _typeProjects { get; set; }= new List<FisrtStatTPModel>(); 
}