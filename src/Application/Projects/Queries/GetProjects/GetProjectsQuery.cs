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
    private readonly IIdentityService _identityService;
 
    public GetProjectsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService, IIdentityService identityService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = identityService;
    }

    public async Task<ProjectsVm> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        var user = _identityService.GetUserNameAsync(Convert.ToString(2));

        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.TypeProject)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.Statut) 
            .Single(x => x.Id == user.Id) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);

        ICollection<Project> projects = new List<Project>();

        foreach (var st in structures)
        {
            foreach (var p in st.Projects)
            {
                projects.Add(p);
            }
        }

        return new ProjectsVm
        {
            ProjectDtos = projects
        };
    }
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.TypeProject)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.Statut)
            .SingleOrDefault(x => x.Id == k.Id);
        if (t == null)
        {
            return list;
        }
        foreach (Structure child in t.StructureChildren)
        {
            list.Add(child);
            GetChildren<Structure>(child,list);
        }
        return list;
    }

}