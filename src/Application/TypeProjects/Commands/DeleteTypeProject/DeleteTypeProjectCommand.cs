using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TypeProjects.Commands.UpdateTypeProject;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.TypeProjects.Commands.DeleteTypeProject;

public class DeleteTypeProjectCommand : IRequest
{
    public int Id { get; set; }
}

public class DeleteTypeProjectCommandHandler : IRequestHandler<DeleteTypeProjectCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteTypeProjectCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteTypeProjectCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.TypeProjects
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(TypeProject), request.Id);
        }

        _context.TypeProjects.Remove(entity);

        // entity.DomainEvents.Add(new TodoItemDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}