using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanArchitecture.Infrastructure.Persistence.Configurations;

public class EvaluationActionPConfiguration: IEntityTypeConfiguration<EvaluationActionP>
{
    public void Configure(EntityTypeBuilder<EvaluationActionP> builder)
    {
        builder.HasKey(e => new { e.EvaluationId, e.ActionPId});
        builder.HasOne<Evaluation>(e => e.Evaluation)
            .WithMany(p => p.ActionPs)
            .HasForeignKey(pt => pt.EvaluationId);
       
            builder.HasOne<ActionP>(e => e.ActionP)
            .WithMany(p => p.Evaluations)
            .HasForeignKey(pt => pt.ActionPId);
    }
}

