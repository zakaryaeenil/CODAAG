using AutoMapper;
using CleanArchitecture.Application.ActionPs.Queries.GetActionPById;
using CleanArchitecture.Application.ActionPs.Queries.GetActionPs;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.ActionPs.Queries.GetActionPswithEval;

public class GetActionPsWhitEvalQuery: IRequest<ActionPsWithEvalVm>
{
}

public class GetActionPsWhitEvalQueryHandler : IRequestHandler<GetActionPsWhitEvalQuery, ActionPsWithEvalVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetActionPsWhitEvalQueryHandler(IApplicationDbContext context, IMapper mapper, ICsvFileBuilder fileBuilder)
    {
        _context = context;
        _mapper = mapper;
        //_fileBuilder = fileBuilder;
    }

    public async Task<ActionPsWithEvalVm> Handle(GetActionPsWhitEvalQuery request, CancellationToken cancellationToken)
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
                .Include(p => p.ActionPs)
                .ThenInclude(s =>s.Statut)
                .Include(pp => pp.ActionPs)
                .ThenInclude(p => p.Project)
                .Include(pp => pp.ActionPs)
                .ThenInclude(st => st.Structures)
                .Include(pp => pp.ActionPs)
                .ThenInclude(st => st.Evaluations)
                .ThenInclude(s => s.Evaluation)
                .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
            ICollection<Structure> listAll = new List<Structure>();
            listAll.Add(structure);
        
            ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);

            ICollection<ActionP> actionPs = new List<ActionP>();

            foreach (var st in structures)
            {
                foreach (var p in st.ActionPs)
                {
                    actionPs.Add(p);
                }
            }
        
            return new()
            {
                ActionPDtos = actionPs,
                Is = true,
                EvaluationDtos = evaluations
            }; 
        }


        return new ActionPsWithEvalVm();

    }
    private ICollection<Structure> GetChildren<TStructure>(Structure k ,ICollection<Structure> list)
    {
        
        Structure? t = _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(pp => pp.ActionPs)
            .ThenInclude(s =>s.Statut)
            .Include(pp => pp.ActionPs)
            .ThenInclude(p => p.Project)
            .Include(pp => pp.ActionPs)
            .ThenInclude(st => st.Structures)
            .Include(pp => pp.ActionPs)
            .ThenInclude(st => st.Evaluations)
            .ThenInclude(s => s.Evaluation)
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