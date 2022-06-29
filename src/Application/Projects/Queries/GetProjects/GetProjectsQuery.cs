using AutoMapper;
using AutoMapper.QueryableExtensions;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Queries.GetProjects;

public class GetProjectsQuery: IRequest<ProjectsVm>
{
}

public class GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, ProjectsVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProjectsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProjectsVm> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);

        Structure structure =  _context.Structures
                
            .Include(p => p.ParentStructure)
            .Include(sc => sc.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(s =>s.Statut )
            .Include(p => p.Projects)
            .ThenInclude(s =>s.TypeProject)
            .Single(x => x.Id == user.Id);

        ICollection<Project> projects = new List<Project>();
        
        foreach (var p in structure.Projects)
        {
            projects.Add(p);
        }
        GetChildren<Project>(structure, projects);
        
        
        return new ProjectsVm
        {
            ProjectDtos = projects
        };
    }
    private ICollection<Project> GetChildren<TProject>(Structure k ,ICollection<Project> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(s =>s.Statut)
            .Include(p => p.Projects)
            .ThenInclude(s =>s.TypeProject)
            .SingleOrDefault(x => x.Id == k.Id);
        
        if (t == null)
        {
            return list;
        }
        foreach (Structure child in t.StructureChildren)
        {
            if (child.Projects != null)
            {
                foreach (Project p in child.Projects)
                {
                    list.Add(p);
                }
            }
            GetChildren<Project>(child, list);
        }
        return list;
    }

}