using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Commands.UpdateActionP;

public class UpdateActionPCommand: IRequest
{
    public int Id { get; init; }

    public string Title { get; init; }
    public string? Note { get; init; }
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

public class UpdateActionPCommandHandler : IRequestHandler<UpdateActionPCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateActionPCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateActionPCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.ActionPs
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ActionP), request.Id);
        }

        var s = _context.Statuts
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.StatutId);
        
        var p = _context.Projects
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.ProjectId);
       
        
        entity.Title = request.Title;
        entity.Note = request.Note;
        entity.StatutId = s.Id;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.StartDatePrv = request.StartDatePrv;
        entity.EndDatePrv = request.EndDatePrv;
        entity.BudgPrv = request.BudgPrv;
        entity.BudgR = request.BudgR;
        entity.ProjectId = p.Id;
        
        foreach (var st in _context.Structures.Include(s => s.ActionPs).Where(s =>s.ActionPs.Contains(entity)).ToList())
        {
            st.ActionPs.Remove(entity);
        } 
        if (request.Structures != null)
        {
            foreach (var c in request.Structures)
            {

                var structure = _context.Structures.Include(a =>a.ActionPs).SingleOrDefault(x => x.Id == c);
                if (structure != null)
                {
                    structure.ActionPs.Add(entity);
                }
            }
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}