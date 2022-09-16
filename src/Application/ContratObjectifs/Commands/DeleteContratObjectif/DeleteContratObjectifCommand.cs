using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ContratObjectifs.Commands.DeleteContratObjectif;

public class DeleteContratObjectifCommand : IRequest
{
    public int Id { get; set; }
}

public class DeleteContratObjectifCommandHandler : IRequestHandler<DeleteContratObjectifCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteContratObjectifCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteContratObjectifCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.ContratObjectifs
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ContratObjectif), request.Id);
        }

        _context.ContratObjectifs.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}