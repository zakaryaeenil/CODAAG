

using AutoMapper;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.Dto.Helpers.DashModels;
using CleanArchitecture.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.DashInfo.Query.GetFirstTranche;

public class GetFirstTranchQuery : IRequest<FirstTrancheVm>
{
    public int? ItemId { get; set; }
}

public class GetFirstTranchQueryHandler : IRequestHandler<GetFirstTranchQuery, FirstTrancheVm>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
   

    public GetFirstTranchQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
       
    }

    public Task<FirstTrancheVm>  Handle(GetFirstTranchQuery request, CancellationToken cancellationToken)
    {
          
           
        Gestionnaire user = _context.Gestionnaires
            .Single(x => x.Id == 2);
        ICollection<TypeProject> typeProjects = _context.TypeProjects.ToList();
        
            Structure structure =  _context.Structures
            .Include(p =>p.ParentStructure)
            .Include(s => s.StructureChildren)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.TypeProject)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.Statut)
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.ContratObjectifs)
            .Single(x => x.Id == user.StructureId) ?? throw new InvalidOperationException();
         
        ICollection<Structure> listAll = new List<Structure>();
        listAll.Add(structure);
        
        ICollection<Structure> structures = GetChildren<Structure>(structure, listAll);

        ICollection<Project> projects = new List<Project>();
        
        if (request.ItemId != null)
        {
            ContratObjectif? objectif =  _context.ContratObjectifs
                .FirstOrDefault(x => x.Id == request.ItemId ); 
            if (objectif == null)
            {
                foreach (var st in structures)
                {
                    foreach (var p in st.Projects)
                    {
                  
                        projects.Add(p);
                    }
                }  
            }
            else if (objectif != null)
            {
                foreach (var st in structures)
                {
                    foreach (var p in st.Projects)
                    {
                        foreach (var pco in p.ContratObjectifs)
                        {
                            if (pco.Id == objectif.Id)
                            {
                                projects.Add(p);
                                break;
                            }
                        }
                    }
                } 
            }
        }
        else
        {
            foreach (var st in structures)
            {
                foreach (var p in st.Projects)
                {
                  
                    projects.Add(p);
                }
            } 
        }
       

        ICollection<FirstTranche> firstTrancheList = new List<FirstTranche>();
        
        foreach (var typeP in typeProjects)
        {
            var i = 0;
            
            FirstTranche model = new FirstTranche();
            model.Id = typeP.Id;
            model.TypeP = typeP.Title;
            foreach (var p in projects)
            {
                if ( p.TypeProjectId == typeP.Id)
                {
                    model.nbrProjects += 1;
                    i += (int)p.TauxR;
                }
                
            }
            
            if (model.nbrProjects != 0 && i != 0)
            {
                model.TauxR =i / model.nbrProjects;
            }
           
            firstTrancheList.Add(model);
        }
        return Task.FromResult(new FirstTrancheVm
        {
            FirstTranches = firstTrancheList
        }); 
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
            .Include(p => p.Projects)
            .ThenInclude(pp => pp.ContratObjectifs)
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