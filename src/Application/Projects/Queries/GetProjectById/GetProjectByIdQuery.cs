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
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);

        Project project =  _context.Projects
            .Include(p =>p.Structures)
            .Include(p =>p.Actions)
            .Include(p =>p.ContratObjectifs)
            .Include(p =>p.Evaluations)
            .ThenInclude(ea => ea.Evaluation)
            .Include(p =>p.TypeProject)
            .Include(p => p.Statut)
            .Single(x => x.Id == request.ListId) ?? throw new InvalidOperationException();

        Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(e => e.Evaluations)
            .ThenInclude(ea => ea.Evaluation)
            .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);
        

        foreach (var st in structures)
        {
            foreach (var p in st.Projects)
            {
                if (p.Id == project.Id)
                {
                    return new ProjectByIdVm
                    {
                        ProjectDto = project
                    };
                }
            }
        }
        
      
        
        return new ProjectByIdVm {};
    }
    
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p => p.ParentStructure)
            .Include(p => p.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(e => e.Evaluations)
            .ThenInclude(ea => ea.Evaluation)
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