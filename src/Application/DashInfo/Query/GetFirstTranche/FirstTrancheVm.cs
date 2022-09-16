using CleanArchitecture.Application.Dto.Helpers.DashModels;

namespace CleanArchitecture.Application.DashInfo.Query.GetFirstTranche;

public class FirstTrancheVm
{
    public ICollection<FirstTranche> FirstTranches { get; set; } = new List<FirstTranche>();
}