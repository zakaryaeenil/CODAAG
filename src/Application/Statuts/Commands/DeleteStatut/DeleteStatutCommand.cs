using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Projects.Commands.DeleteProject;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Statuts.Commands.DeleteStatut;

public class DeleteStatutCommand : IRequest
{
    public int Id { get; set; }
}

public class DeleteStatutCommandHandler : IRequestHandler<DeleteStatutCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteStatutCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteStatutCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Statuts
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Statut), request.Id);
        }

        _context.Statuts.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}