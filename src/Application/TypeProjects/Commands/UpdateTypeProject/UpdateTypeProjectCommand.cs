using CleanArchitecture.Application.Common.Exceptions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.TypeProjects.Commands.UpdateTypeProject;

public class UpdateTypeProjectCommand: IRequest
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? CodeTP { get; set; }
    public string? Comment { get; set; }
}
                                     
public class UpdateTypeProjectCommandHandler : IRequestHandler<UpdateTypeProjectCommand>
{
    private readonly IApplicationDbContext _context;
                                     
    public UpdateTypeProjectCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
                                     
    public async Task<Unit> Handle(UpdateTypeProjectCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.TypeProjects
            .FindAsync(new object[] { request.Id }, cancellationToken);
                                     
        if (entity == null)
        {
            throw new NotFoundException(nameof(TypeProject), request.Id);
        }
                                     
        entity.Title = request.Title;
        entity.CodeTP = request.CodeTP;
        entity.Note = request.Comment;
        await _context.SaveChangesAsync(cancellationToken);
                                     
        return Unit.Value;
    }
}