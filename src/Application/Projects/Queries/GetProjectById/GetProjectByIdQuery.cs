using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Queries.GetProjectById;

public class GetProjectByIdQuery: IRequest<ProjectByIdVm>
{
    public int ListId { get; set; }
}

public class GetProjectByIdQueryHandler : IRequestHandler<GetProjectByIdQuery, ProjectByIdVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProjectByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ProjectByIdVm> Handle(GetProjectByIdQuery request, CancellationToken cancellationToken)
    { 
        Gestionnaire user = _context.Gestionnaires.Single(x => x.Id == 2);

        Project project = _context.Projects
            .Include(p => p.Structures)
            .ThenInclude(g =>g.Gestionnaires)
            .SingleOrDefault(x => x.Id == request.ListId) ?? throw new InvalidOperationException();
     
        foreach (var p in project.Structures)
        {
            foreach (var g in p.Gestionnaires)
            {
                if (g.Id == 2)
                {
                    return new ProjectByIdVm
                    {
                        ProjectDto    = project
                    };
                }
            }
        }
        
        return new ProjectByIdVm {};
    }
    
   
}