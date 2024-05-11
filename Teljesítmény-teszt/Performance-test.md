# **Teljesítmény tesztek**

## Általános információk

### A tesztek célja

    Jelen teljesítmény tesztek célja, hogy egy általános átfogó képet kapjunk a IIOT WEBAPPLIKÁCIÓ GOMBATERMESZTŐ HÁZAKHOZ nevű egyetemi projekt Backend API-jának képességeiről.


### A projektről

    A webapplikáció gombatermesztő házak és az azokban elhelyezett műszerek által mért értékek menedzseléséhez, kiértékeléséhez, és megtekintéséhez biztosít grafikus felületet a felhasználók számára.  

### Tesztelő alkalmazás

    A tesztek a Postman API platform V11 verzióján kerülnek elvégzésre. A Postman egy általános API tesztelő eszköz mejnek segítségével, könnyen lehet HTTP API kéréseket létrehozni,tesztelni és dokumentálni. 

    A Postman rendelkezik beépített teljesítmény tesztelő modullal, ahol különbőző API kérések un. Collectionjait futtathatjuk, Performance módban, ahol számos beállítást tudunk megadni.

    A teljesítmény tesztek virtuális felhasználókat szimulálnak amik a teszt ideje alatt az adott collectionban lévő HTTP kéréseket küldik folyamatosan és egymással párhuzamosan.


![](postman-peldah.png)
A postman teljesítmény tesztelő felülete

### Tesztelő környezet

    A project dockerizálva van ezáltan mindenhol kényelmesen futtatható. A tesztek is ezen a dockerizált verzión kerülnek elvégzésre.

    A tesztkörnyezet fel van töltve mock adatokkal, a teszteléshez megfelelő mértékben.

![](dockerh.png)
A dockerben futó project

### A tesztelő számítógép adatai

    A tesztelő gép adatai az alábbiak:
        8 CPU mag
        8GB RAM
    
    A Postman ilyen hardver mellett egyszerre maximum 100 virtuális usert tud szimulálni, a projekt jellege, okán azonban már ez is bőségesen sok, ahoz képest amit "élesben tapasztalhatunk".

### Teljesítmény mérési metrikák

    A fő metrikák a kiadott kérések száma és az átlagos válaszidő (és ennek növekedése a terheléssel párhuzamosan), valamint a hibával vissza érkező kérések százalékos aránya lesz.

    Ezeket a postman mind grafikonok mind mérési adatok formájában prezentálja számunkra.

## API Végpontok Tesztelése

A teszteseteket a korábban említett módon, a Postman segítségével végezzük. A tesztesetek futtatása előtt **200 *Resource*** adatot vettünk fel mesterségesen, hogy a tesztek életszerűbbek legyenek.

Az API *Resource*-okra vonatkozó azon végpontjait fogjuk stressz tesztelni, melyek az **összes adatot lekérik, új *Resource*-t adnak az adatbázishoz**. Ezen túl tesztelni fogjuk az API *DataSet*-re vonatkozó azon végpontját is, mely az adott model osztályokhoz **kapcsolja a hozzájuk tartozó *Resource* osztályt** is.

A teszt adatok minden különálló teszteset futtatása előtt visszaállításra kerülnek.

A tesztek során a felhasználók számának változását különböző függvények írják le. Mi most 3 ilyen függvényt fogunk használni.
- A felhasználók számának fokozatos emelése - **Ramp Up**
- A felhasználók számának hirtelen megugrása, majd csökkenése - **Spike**
- A felhasználók számának hirtelen ugrása, bizonyos időintervallumig a csúcson maradása, majd hirtelen csökkenése - **Peak**

A tesztek **60 másodpercig tartanak**. 

A **Ramp Up** tesztesetek mindig a maximum felhasználók 10%-ról indulnak 10 másodpercig ez marad a terhelés, majd 20 másodperc alatt elérik a maximális felhasználó számot. Ez után 30 másodpercig ennyi felhasználó folytonos kéréseit szolgálja ki a rendszer.

A **Spike** tesztesetek a maximális felhasználószám 30%-áról indulnak, 25 másodpercig így marad. Ez után 5 másodperc alatt felugrik a maximális felhasználó számra, majd 5 másodperc után visszacsökken annak 30%-ára, és így marad 25 másodpercig.

A **Peak** tesztesetek a maximális felhasználó szám 20%-áról indul, majd fokozatosan felemelkedik a maximális felhasználó számra, megtartja a maximális felhasználó számot és utána fokozatosan lecsökken a kiinduló értékre, amit szintén megtart. Ennek a teszteset típusnak minden szakasza 12 másodpercig tart.

Adatok változását az adatbázis rendszer online felületén érjük el, tartjuk számon.

![](adatbazis_feluleth.png)

### 1. Végpont teszt - Minden *Resource* lekérése

A kéréseket az */api/resource/all* végpontra küldjük.

#### Ramp Up

- **maximum 10 felhasználóval**: 
Kezdetben enyhe ingadozás megfigyelhető, ami után azonban gyorsan stabilizálódik a rendszer.

- **maximum 50 felhasználóval**:
Enyhe ingadozás figyelhető meg a felhasználók számának növekedésének elkezdésekor. A rendszer ebben az esetben nem stabilizálódik a másik esetben látott szinten, a maximális felhasználó szám elérése után is akár 60ms-os kilengések megfigyelhetőek.

Alábbi ábrán látható a két eltérő konfiguráció. Szagatott vonallal van jelezve az 50 felhasználós beállítási opció, a folytonossal a 10. A szürke hátterű trapézok jelölik a virtuális felhasználók aktuális számát. Az ábra alatt a 10 felhasználós eset adatai tekinthetőek meg, melyek mellett látható az eltérés az 50 felhasználós esettől.

![](rampupallresh.png)

Talán érdemes kiemelni, hogy az error rate mind a két esetben 0% volt, illetve hogy a maximális késleltetés 50 felhasználó esetén több mint 6x annyi volt mint 10 esetén.

 #### Spike

A tesztesetet **50 maximális felhasználóval** végeztük. A kezdeti stabilizálódás után a késleltetés a felhasználók számának növekedésekor emelkedett.

Érdekes megfigyelni, hogy a korábban tapasztalt stabilizáció valamilyen mértékben itt is megfigyelhető, a késleltetés maximumát már az előtt eléri hogy a felhasználók száma elérte volna az 50-et, hamarabb elkezd csillapodni.

![](spikeallres.png)
 #### Peak

Talán elsőre megtévesztő lehet, hogy a késleltetés grafikon csupán egy helyen ugrik meg és gyorsan lecsökken; azonban fontos megfigyelni a késleltetés dimenzió skálázását. Itt a maximális késleltetés a 7000 ms-ot is túllépi, az átlag is sokkal nagyobb értékeket vesz fel mielőtt visszacsillapodik elfogadható szintekre. 

![](peakallresh.png)

### 2. Végpont teszt - Adott azonosítójú *Resource* lekérése

A kéréseket az */api/resource/{{resourceId}}* végpontra küldjük.

#### Ramp Up

- maximum 10 felhasználóval: 
- maximum 50 felhasználóval:

Alábbi ábrán látható a két konfiguráció közötti különbség.

![](rampupidres.png)

 #### Spike

 -maximum 50 felhasználóval

![](spikeaidres.png)

 #### Peak

- maximum 50 felhasználóval:

![](peakidres.png)




