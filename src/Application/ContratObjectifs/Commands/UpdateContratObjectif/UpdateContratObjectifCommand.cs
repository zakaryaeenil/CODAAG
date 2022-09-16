using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.ContratObjectifs.Commands.UpdateContratObjectif;

public class UpdateContratObjectifCommand: IRequest
{
    public int Id { get; set; } 
    public string? Title { get; init; }
    public string? comment { get; init; }
    public DateTime StartD { get; init; }
    public DateTime EndD { get; init; }
    public bool IsActive { get; init; } = true;
    
   
}
public class UpdateContratObjectifCommandHandler : IRequestHandler<UpdateContratObjectifCommand>
{
    private readonly IApplicationDbContext _context;
                                     
    public UpdateContratObjectifCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
                                     
    public async Task<Unit> Handle(UpdateContratObjectifCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.ContratObjectifs
            .FindAsync(new object[] { request.Id }, cancellationToken);
        Statut statut = _context.Statuts
            .Single(x => x.Id == 5);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ContratObjectif), request.Id);
        }
        if (request.IsActive == true)
        {
            foreach (var a in _context.ContratObjectifs.ToList())
            {
                a.IsActive = false;
            }
        }                      
        entity.Title = request.Title;
        entity.StartDate = request.StartD;
        entity.EndDate = request.EndD;
        entity.Note = request.comment;
        entity.Statut = statut;
        entity.IsActive = request.IsActive;
        entity.CodeCO = entity.Title + "-" + entity.StartDate.Year;

        await _context.SaveChangesAsync(cancellationToken);
                                     
        return Unit.Value;
    }
}