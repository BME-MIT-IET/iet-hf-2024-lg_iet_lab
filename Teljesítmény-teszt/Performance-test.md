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


![](postman-pelda.png)
A postman teljesítmény tesztelő felülete

### Tesztelő környezet

    A project dockerizálva van ezáltan mindenhol kényelmesen futtatható. A tesztek is ezen a dockerizált verzión kerülnek elvégzésre.

    A tesztkörnyezet fel van töltve mock adatokkal, a teszteléshez megfelelő mértékben.

![](docker.png)
A dockerben futó project

### A tesztelő számítógép adatai

    A tesztelő gép adatai az alábbiak:
        8 CPU mag
        8GB RAM
    
    A Postman ilyen hardver mellett egyszerre maximum 100 virtuális usert tud szimulálni, a projekt jellege, okán azonban már ez is bőségesen sok, ahoz képest amit "élesben tapasztalhatunk".

### Teljesítmény mérési metrikák

    A fő metrikák a kiadott kérések száma és az átlagos válaszidő (és ennek növekedése a terheléssel párhuzamosan), valamint a hibával vissza érkező kérések százalékos aránya lesz.

    Ezeket a postman mind grafikonok mind mérési adatok formájában prezentálja számunkra.






