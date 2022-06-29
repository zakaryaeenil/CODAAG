using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.Evaluations.Commands.DeleteEvaluation;

public class DeleteEvaluationCommand : IRequest
{
    public int Id { get; set; }
}

public class DeleteEvaluationCommandHandler : IRequestHandler<DeleteEvaluationCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteEvaluationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteEvaluationCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Evaluations
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Evaluation), request.Id);
        }

        _context.Evaluations.Remove(entity);

        // entity.DomainEvents.Add(new TodoItemDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}