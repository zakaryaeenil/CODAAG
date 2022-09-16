using CleanArchitecture.Application.Dto.Helpers.DashModels;

namespace CleanArchitecture.Application.DashInfo.Query.GetSecondTranche;

public class GetSecondTrancheVm
{
    public ICollection<SecondTranche> Seconds = new List<SecondTranche>();
}