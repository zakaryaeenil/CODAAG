using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Structures.Commands.CreateStructure;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Commands.CreateContratObjectif;

public class CreateContratObjectifCommand : IRequest<int>
{
    
    public string? Title { get; init; }
    public string? comment { get; init; }
    public DateTime StartD { get; init; }
    public DateTime EndD { get; init; }
    public bool IsActive { get; init; } = true;
    
    public int? Statut { get; init; }
   
}

public class CreateContratObjectifCommandHandler : IRequestHandler<CreateContratObjectifCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateContratObjectifCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateContratObjectifCommand request, CancellationToken cancellationToken)
    {
        Statut s = _context.Statuts
            .AsNoTracking()
            .SingleOrDefault(x => x.Id == request.Statut) ?? throw new InvalidOperationException();
       
        var entity = new ContratObjectif()
            {
                Title = request.Title,
                Note = request.comment,
                //CodeCO = request.Title + request,
                StartDate = request.StartD,
                EndDate = request.EndD,
                IsActive = request.IsActive,
                StatutId = s.Id
            };
            entity.CodeCO = entity.Title + "-" + entity.StartDate.Year;
            _context.ContratObjectifs.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
    }
}