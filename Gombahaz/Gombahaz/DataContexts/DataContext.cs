using Gombahaz.Models;
using Microsoft.EntityFrameworkCore;


namespace Gombahaz.DataContexts
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<ResourceItem> Resources { get; set; }
        public DbSet<DataSetItem> DataSets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var res1 = new ResourceItem
            {
                Id = 1,
                Name = "Csiperke1 termesztőház",
                Address = "1111 Budapest József Attila utca 151.",
                Size = "150x30x10m",
                Description = "Csiperkegomba termesztésre használják.",
                Comment = "Minden műszer megfelelően működik.",
            };
            modelBuilder.Entity<ResourceItem>().HasMany(ri => ri.DataSets).WithOne(ds => ds.Resource).HasForeignKey("ResourceId").IsRequired();
           /* modelBuilder.Entity<ResourceItem>().HasData( 
             res1,
             new ResourceItem
             {
                 Id = 2,
                 Name = "GombaFalu gazdaság",
                 Address = "2222 Debrecen Kossuth utca 20.",
                 Size = "120x25x8m",
                 Description = "Különböző gombafajták termesztésére alkalmas.",
                 Comment = "Ideális környezet a gombák fejlődéséhez.",
             },
            new ResourceItem
            {
                Id = 3,
                Name = "Zöld Kapu GombaFarm",
                Address = "3333 Szeged Ady Endre út 5.",
                Size = "100x20x6m",
                Description = "Kizárólag biogombák termesztésére specializálódott.",
                Comment = "A legfrissebb technológiákat alkalmazzák a termesztés során.",
            },
            new ResourceItem
            {
                Id = 4,
                Name = "GombaPalota Kertészete",
                Address = "4444 Pécs Széchenyi tér 10.",
                Size = "80x15x5m",
                Description = "Kis- és nagykereskedelmi gombaellátást biztosít.",
                Comment = "A legmagasabb minőséget garantálják.",
            },
            new ResourceItem
            {
                Id = 5,
                Name = "Gombavilág Gazdasági Komplexum",
                Address = "5555 Győr Árpád út 3.",
                Size = "130x25x7m",
                Description = "Többféle gombafajta termesztésére szakosodott.",
                Comment = "Modern és hatékony termesztési módszereket alkalmaznak.",
            },
            new ResourceItem
            {
                Id = 6,
                Name = "GombaBirodalom Termelőház",
                Address = "6666 Szombathely Bajcsy-Zsilinszky út 15.",
                Size = "110x20x6m",
                Description = "Főként shiitake és laskagomba termesztésére fókuszálnak.",
                Comment = "Környezetbarát termelési folyamatokat alkalmaznak.",
            },
            new ResourceItem
            {
                Id = 7,
                Name = "Gombasziget Gombatelep",
                Address = "7777 Nyíregyháza Szent István út 30.",
                Size = "140x30x8m",
                Description = "A legújabb gomba termesztési technológiákat használják.",
                Comment = "Nemzetközi minősítésű termékekkel rendelkeznek.",
            },
            new ResourceItem
            {
                Id = 8,
                Name = "Boróka GombaFarm",
                Address = "8888 Miskolc Bartók Béla út 5.",
                Size = "100x18x6m",
                Description = "Kizárólag organikus gombák termesztésével foglalkoznak.",
                Comment = "A legtisztább környezetben termelik gombáikat.",
                DataSets = []
            },
            new ResourceItem
            {
                Id = 9,
                Name = "GombaGazda Üvegháza",
                Address = "9999 Kecskemét Arany János út 2.",
                Size = "90x16x5m",
                Description = "Magas minőségű csiperkegombák termesztésére specializálódtak.",
                Comment = "Az üvegház kiváló növekedési környezetet biztosít.",
                DataSets = []
            },
            new ResourceItem
            {
                Id = 10,
                Name = "Zöldfülű Gombatermesztő Kert",
                Address = "1010 Székesfehérvár Petőfi Sándor út 7.",
                Size = "120x22x7m",
                Description = "Különleges ízű és formájú gombák termesztésére specializálódtak.",
                Comment = "A helyi piacokon nagy népszerűségnek örvendenek.",
                DataSets = []
            });

            modelBuilder.Entity<DataSetItem>().HasData(new DataSetItem { 
                Id=1,
                Temperature=15.0, 
                SoilMoisture=30.0, 
                COLevel = 0.25, 
                Humidity=95.0, 
                SoilTemperature = 15.0, 
                DataObserved = DateTime.ParseExact("2024-04-27 10:22:11", "yyyy-MM-dd HH:mm:ss", null).ToUniversalTime(),
                ResourceId = 1,
            });*/
            
        }

    }
}
