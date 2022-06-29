using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanArchitecture.Infrastructure.Persistence.Configurations;





public class EvaluationProjectConfiguration: IEntityTypeConfiguration<EvaluationProject>
{
    public void Configure(EntityTypeBuilder<EvaluationProject> builder)
    {
        builder.HasKey(e => new { e.EvaluationId, e.ProjectId });
        
        builder.HasOne<Evaluation>(e => e.Evaluation)
            .WithMany(p => p.Projects)
            .HasForeignKey(pt => pt.EvaluationId);
       
        builder.HasOne<Project>(e => e.Project)
            .WithMany(p => p.Evaluations)
            .HasForeignKey(pt => pt.ProjectId);
    }
    
}
