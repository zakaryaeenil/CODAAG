using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.TypeProjects.Commands.CreateTypeProject;

public class CreateTypeProjectCommand : IRequest<int>
{
 
    public string? Title { get; set; }
    public string? CodeTP { get; set; }
    public string? Comment { get; set; }
    
}

public class CreateTypeProjectCommandHandler : IRequestHandler<CreateTypeProjectCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTypeProjectCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateTypeProjectCommand request, CancellationToken cancellationToken)
    {
        
        
            var entity = new TypeProject()
            {
                Title = request.Title,
                Note = request.Comment,
                CodeTP = request.CodeTP 
            };
        
        
            _context.TypeProjects.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
      
    }
}