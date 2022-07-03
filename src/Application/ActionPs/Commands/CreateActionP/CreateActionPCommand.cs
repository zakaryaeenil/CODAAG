using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Commands.CreateActionP;

public class CreateActionPCommand: IRequest<int>
{
    public string Title { get; init; }
    public string? Note { get; init; }
    public int? TauxR { get; init; } = 0;
    public float? BudgR { get; init; } = 0;
    public DateTime StartDatePrv { get; init; }
    public DateTime EndDatePrv { get; init; }
    public DateTime StartDate { get; init; }
    public DateTime EndDate { get; init; }
    public float? BudgPrv { get; init; } = 0;

    public int? StatutId { get; init; }

    public int? ProjectId { get; init; }
    
    public ICollection<int> Structures { get; init; }

}

public class CreateActionPCommandHandler : IRequestHandler<CreateActionPCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateActionPCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateActionPCommand request, CancellationToken cancellationToken)
    {
        var s = _context.Statuts
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.StatutId);
        
        var p = _context.Projects
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.ProjectId);

        var entity = new ActionP()
        {
            Title = request.Title,
            Note = request.Note,
            StatutId = s.Id,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            StartDatePrv = request.StartDatePrv,
            EndDatePrv = request.EndDatePrv,
            TauxR = request.TauxR,
            BudgPrv = request.BudgPrv,
            BudgR = request.BudgR,
            ProjectId = p.Id,
        };
        _context.ActionPs.Add(entity);
        if (request.Structures != null)
        {
            foreach (var c in request.Structures)
            {

                var structure = _context.Structures.Include(a =>a.ActionPs).SingleOrDefault(x => x.Id == c);
                if (structure != null)
                {
                    structure.ActionPs.Add(entity);
                  //  entity.Structures.Add(structure);
                }
            }
        }
        
        await _context.SaveChangesAsync(cancellationToken);
        return entity.Id;
    }
}