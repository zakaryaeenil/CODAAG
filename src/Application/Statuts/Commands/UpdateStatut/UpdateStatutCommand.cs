using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Enums;
using MediatR;

namespace CleanArchitecture.Application.Statuts.Commands.UpdateStatut;

public class UpdateStatutCommand : IRequest
{
    public int Id { get; set; }
    public string? Title { get; init; }
    public string? Comment { get; init; }

    public ColorStatut Color { get; init; } = ColorStatut.none; 
}
public class UpdateStatutCommandHandler : IRequestHandler<UpdateStatutCommand>
{
    private readonly IApplicationDbContext _context;
                                     
    public UpdateStatutCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
                                     
    public async Task<Unit> Handle(UpdateStatutCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Statuts
            .FindAsync(new object[] { request.Id }, cancellationToken);
    
        if (entity == null)
        {
            throw new NotFoundException(nameof(Statut), request.Id);
        }
                                     
        entity.Title = request.Title;
        entity.Note = request.Comment;
        entity.Color = request.Color ;
        
        await _context.SaveChangesAsync(cancellationToken);
                                     
        return Unit.Value;
    }
}