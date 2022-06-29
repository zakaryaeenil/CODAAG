﻿// <auto-generated />
using System;
using CleanArchitecture.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CleanArchitecture.Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220621152646_FirstM")]
    partial class FirstM
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ActionPStructure", b =>
                {
                    b.Property<int>("ActionPsId")
                        .HasColumnType("int");

                    b.Property<int>("StructuresId")
                        .HasColumnType("int");

                    b.HasKey("ActionPsId", "StructuresId");

                    b.HasIndex("StructuresId");

                    b.ToTable("ActionPStructure");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.ActionP", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<float?>("BudgPrv")
                        .HasColumnType("real");

                    b.Property<float?>("BudgR")
                        .HasColumnType("real");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("EndDatePrv")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("StartDatePrv")
                        .HasColumnType("datetime2");

                    b.Property<int>("StatutId")
                        .HasColumnType("int");

                    b.Property<int?>("TauxR")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.HasIndex("StatutId");

                    b.ToTable("ActionPs");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.ContratObjectif", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CodeCO")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("StatutId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("StatutId");

                    b.ToTable("ContratObjectifs");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Evaluation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("StatutId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("StatutId");

                    b.ToTable("Evaluations");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.EvaluationActionP", b =>
                {
                    b.Property<int>("EvaluationId")
                        .HasColumnType("int");

                    b.Property<int>("ActionPId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TauxR")
                        .HasColumnType("int");

                    b.HasKey("EvaluationId", "ActionPId");

                    b.HasIndex("ActionPId");

                    b.ToTable("EvaluationActionP");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.EvaluationProject", b =>
                {
                    b.Property<int>("EvaluationId")
                        .HasColumnType("int");

                    b.Property<int>("ProjectId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("TauxR")
                        .HasColumnType("int");

                    b.HasKey("EvaluationId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("EvaluationProject");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Gestionnaire", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prenom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("StructureId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StructureId");

                    b.ToTable("Gestionnaires");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CodeProject")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("EndDatePrv")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsInitial")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ModeReel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Priority")
                        .HasColumnType("int");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("StartDatePrv")
                        .HasColumnType("datetime2");

                    b.Property<int>("StatutId")
                        .HasColumnType("int");

                    b.Property<int?>("TauxR")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TypeProjectId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StatutId");

                    b.HasIndex("TypeProjectId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Statut", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Color")
                        .HasColumnType("int");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Statuts");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Structure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CodeStructure")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentStructureId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParentStructureId");

                    b.ToTable("Structures");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.TypeProject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("CodeTP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TypeProjects");
                });

            modelBuilder.Entity("ContratObjectifProject", b =>
                {
                    b.Property<int>("ContratObjectifsId")
                        .HasColumnType("int");

                    b.Property<int>("ProjectsId")
                        .HasColumnType("int");

                    b.HasKey("ContratObjectifsId", "ProjectsId");

                    b.HasIndex("ProjectsId");

                    b.ToTable("ContratObjectifProject");
                });

            modelBuilder.Entity("ContratObjectifStructure", b =>
                {
                    b.Property<int>("ContratObjectifsId")
                        .HasColumnType("int");

                    b.Property<int>("StructuresId")
                        .HasColumnType("int");

                    b.HasKey("ContratObjectifsId", "StructuresId");

                    b.HasIndex("StructuresId");

                    b.ToTable("ContratObjectifStructure");
                });

            modelBuilder.Entity("ProjectStructure", b =>
                {
                    b.Property<int>("ProjectsId")
                        .HasColumnType("int");

                    b.Property<int>("StructuresId")
                        .HasColumnType("int");

                    b.HasKey("ProjectsId", "StructuresId");

                    b.HasIndex("StructuresId");

                    b.ToTable("ProjectStructure");
                });

            modelBuilder.Entity("ActionPStructure", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.ActionP", null)
                        .WithMany()
                        .HasForeignKey("ActionPsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Structure", null)
                        .WithMany()
                        .HasForeignKey("StructuresId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.ActionP", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Project", "Project")
                        .WithMany("Actions")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Statut", "Statut")
                        .WithMany("ActionPs")
                        .HasForeignKey("StatutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("Statut");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.ContratObjectif", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Statut", "Statut")
                        .WithMany("ContratObjectifs")
                        .HasForeignKey("StatutId");

                    b.Navigation("Statut");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Evaluation", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Statut", "Statut")
                        .WithMany("Evaluations")
                        .HasForeignKey("StatutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Statut");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.EvaluationActionP", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.ActionP", "ActionP")
                        .WithMany("Evaluations")
                        .HasForeignKey("ActionPId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Evaluation", "Evaluation")
                        .WithMany("ActionPs")
                        .HasForeignKey("EvaluationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ActionP");

                    b.Navigation("Evaluation");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.EvaluationProject", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Evaluation", "Evaluation")
                        .WithMany("Projects")
                        .HasForeignKey("EvaluationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Project", "Project")
                        .WithMany("Evaluations")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Evaluation");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Gestionnaire", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Structure", "Structure")
                        .WithMany("Gestionnaires")
                        .HasForeignKey("StructureId");

                    b.Navigation("Structure");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Project", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Statut", "Statut")
                        .WithMany("Projects")
                        .HasForeignKey("StatutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.TypeProject", "TypeProject")
                        .WithMany("Projects")
                        .HasForeignKey("TypeProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Statut");

                    b.Navigation("TypeProject");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Structure", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Structure", "ParentStructure")
                        .WithMany("StructureChildren")
                        .HasForeignKey("ParentStructureId");

                    b.Navigation("ParentStructure");
                });

            modelBuilder.Entity("ContratObjectifProject", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.ContratObjectif", null)
                        .WithMany()
                        .HasForeignKey("ContratObjectifsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ContratObjectifStructure", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.ContratObjectif", null)
                        .WithMany()
                        .HasForeignKey("ContratObjectifsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Structure", null)
                        .WithMany()
                        .HasForeignKey("StructuresId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ProjectStructure", b =>
                {
                    b.HasOne("CleanArchitecture.Domain.Entities.Project", null)
                        .WithMany()
                        .HasForeignKey("ProjectsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CleanArchitecture.Domain.Entities.Structure", null)
                        .WithMany()
                        .HasForeignKey("StructuresId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.ActionP", b =>
                {
                    b.Navigation("Evaluations");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Evaluation", b =>
                {
                    b.Navigation("ActionPs");

                    b.Navigation("Projects");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Project", b =>
                {
                    b.Navigation("Actions");

                    b.Navigation("Evaluations");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Statut", b =>
                {
                    b.Navigation("ActionPs");

                    b.Navigation("ContratObjectifs");

                    b.Navigation("Evaluations");

                    b.Navigation("Projects");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.Structure", b =>
                {
                    b.Navigation("Gestionnaires");

                    b.Navigation("StructureChildren");
                });

            modelBuilder.Entity("CleanArchitecture.Domain.Entities.TypeProject", b =>
                {
                    b.Navigation("Projects");
                });
#pragma warning restore 612, 618
        }
    }
}
