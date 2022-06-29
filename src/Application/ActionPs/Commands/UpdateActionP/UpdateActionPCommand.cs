using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.ActionPs.Commands.UpdateActionP;

public class UpdateActionPCommand: IRequest
{
    public int Id { get; set; }

    public string? Title { get; set; }
}

public class UpdateActionPCommandHandler : IRequestHandler<UpdateActionPCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateActionPCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateActionPCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.ActionPs
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(ActionP), request.Id);
        }

        entity.Title = request.Title;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}