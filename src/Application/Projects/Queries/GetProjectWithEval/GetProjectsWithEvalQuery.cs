using AutoMapper;
using CleanArchitecture.Application.ActionPs.Queries.GetActionPswithEval;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Projects.Queries.GetProjectWithEval;

public class GetProjectsWithEvalQuery: IRequest<ProjectsWithEvalVm>
{
}

public class GetProjectsWithEvalQueryHandler : IRequestHandler<GetProjectsWithEvalQuery, ProjectsWithEvalVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetProjectsWithEvalQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ProjectsWithEvalVm> Handle(GetProjectsWithEvalQuery request, CancellationToken cancellationToken)
    {
        var evaluations = _context.Evaluations.ToList();
        bool containsItem = evaluations.Any(item => item.StartDate <= DateTime.Now && item.EndDate >= DateTime.Now);
        if(containsItem)
        {
            Gestionnaire user = _context.Gestionnaires
                .Single(x => x.Id == 2);

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

            ICollection<Project> projectsCollection = new List<Project>();

            foreach (var st in structures)
            {
                foreach (var p in st.Projects)
                {
                    projectsCollection.Add(p);
                }
            }
        
            return new()
            {
                ProjectsDtos = projectsCollection,
                Is = true,
                EvaluationDtos = evaluations
            }; 
        }


        return new ProjectsWithEvalVm();

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