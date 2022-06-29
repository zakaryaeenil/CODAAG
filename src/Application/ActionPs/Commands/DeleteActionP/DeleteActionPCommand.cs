using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Commands.DeleteActionP;

public class DeleteActionPCommand: IRequest
{
    public int Id { get; set; }
}

public class DeleteActionPCommandHandler : IRequestHandler<DeleteActionPCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteActionPCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteActionPCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.ActionPs
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ActionP), request.Id);
        }

        _context.ActionPs.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}