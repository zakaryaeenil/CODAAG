using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Evaluations.Commands.DeleteEvaluation;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Structures.Commands.DeleteStructure;

public class DeleteStructureCommand : IRequest
{
    public int Id { get; set; }
}

public class DeleteStructureCommandHandler : IRequestHandler<DeleteStructureCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteStructureCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteStructureCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Structures
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Structure), request.Id);
        }
        _context.Structures.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}