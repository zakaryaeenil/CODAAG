using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Structure> Structures { get; }
    DbSet<ContratObjectif> ContratObjectifs { get; }
    DbSet<Project> Projects { get; }
    DbSet<TypeProject> TypeProjects { get; }
    DbSet<Statut> Statuts { get; }
    DbSet<ActionP> ActionPs { get; }
    DbSet<Evaluation> Evaluations { get; }
    DbSet<ModelImport> ModelImports { get; } 
    DbSet<Gestionnaire> Gestionnaires { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
