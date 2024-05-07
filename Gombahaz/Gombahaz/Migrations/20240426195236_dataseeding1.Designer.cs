﻿// <auto-generated />
using System;
using Gombahaz.DataContexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Gombahaz.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240426195236_dataseeding1")]
    partial class dataseeding1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Gombahaz.Models.DataSetItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double?>("COLevel")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("DataObserved")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double?>("Humidity")
                        .HasColumnType("double precision");

                    b.Property<int>("ResourceId")
                        .HasColumnType("integer");

                    b.Property<double?>("SoilMoisture")
                        .HasColumnType("double precision");

                    b.Property<double?>("SoilTemperature")
                        .HasColumnType("double precision");

                    b.Property<double?>("Temperature")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("ResourceId");

                    b.ToTable("DataSet");
                });

            modelBuilder.Entity("Gombahaz.Models.ResourceItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Size")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Resource");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "1111 Budapest József Attila utca 151.",
                            Comment = "Minden műszer megfelelően működik.",
                            Description = "Csiperkegomba termesztésre használják.",
                            Name = "Csiperke1 termesztőház",
                            Size = "150x30x10m"
                        });
                });

            modelBuilder.Entity("Gombahaz.Models.DataSetItem", b =>
                {
                    b.HasOne("Gombahaz.Models.ResourceItem", "Resource")
                        .WithMany("DataSets")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Resource");
                });

            modelBuilder.Entity("Gombahaz.Models.ResourceItem", b =>
                {
                    b.Navigation("DataSets");
                });
#pragma warning restore 612, 618
        }
    }
}
