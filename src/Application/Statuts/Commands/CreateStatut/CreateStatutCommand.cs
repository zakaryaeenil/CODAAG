using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;

namespace CleanArchitecture.Application.Statuts.Commands.CreateStatut;

public class CreateStatutCommand : IRequest<int>
{
    
    public string? Title { get; init; }
    public string? Comment { get; init; }

    public ColorStatut Color { get; init; } = ColorStatut.none;

}

public class CreateStatutCommandHandler : IRequestHandler<CreateStatutCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateStatutCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateStatutCommand request, CancellationToken cancellationToken)
    { 
      
        var entity = new Statut()
        {
            Title = request.Title,
            Note = request.Comment,
            Color = request.Color
        };
        
        
        _context.Statuts.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}