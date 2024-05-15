# Manuális átvizsgálás és statikus kódanalízis

Papp Csaba (*csaba012*)

A rám kiszabott feladat a kód átvizsgálása volt először manuálisan, majd az általam beüzemelt SonarCloud segítségével is.

A feladatom során a projekt FrontEnd-jét vizsgáltam át, ami Angular 17-ben készült.

## Manuális átvizsgálás

A manuális átvizsgálás során a VS Code-ba telepített SonarLint plugint használtam, amely segítségével sok egyszerűbb problémát fedeztem fel, valamint távolítottam el a kódból. Ezen problémák nagy része nem használt import-ok, valamint for ciklus használata for-of ciklus helyett volt. Volt példa benn felejtett TODO-ra, valamint többszörös beimportálásra is. 

## Statikus kódanalízis

A SonarClouddal való összekötés után elkezdtem a kiértékelést nézegetni. 

A FrontEndben 4 Maintainability Issue-t valamint 5 Security Hotspot-ot talált eleinte. 

Ezeket társaimmal átnéztük, valamint megvitattuk, hogy mik azok amik tényleges hibák, és mi az, amit nem gondolnánk hibának. 

A Security Hotspot-ok a Docker-es beüzemeléssel kapcsolatosak, amely nem a tárgy kereteiben került bele a projektbe, előzetesen már tesztelve voltak és nem okoznak tényleges problémát, így azokat ```Safe```-nek jelöltük a SonarCloud rendszerében.

A Maintainability Issue-kat pedig a következő képpen kezeltük:

- Frontend/src/app/app.component.scss: ```Unexpected empty source```
    
    - Mivel az egyes komponenseknek külön-külön volt megcsinálva a design így az alap komponenshez tartozó scss fájl üresen maradt, ezért azt töröltem, a rá való hivatkozással együtt a ```app.component.ts```-ből.

- Frontend/src/app/snackbar/snackbar.component.html: ```Use <output> instead of the status role to ensure accessibility across all devices.```

    - Kisebb kutakodás és utána járás után a csapattal egyet értettünk a hibával és lecseréltük a ```<div>``` element-et ```<output>```-ra. Habár nem elsődleges célja a projeknek a mobil eszközökről való elérés, ahol ez problémát jelenthetne, mégis csak jobb a HTML5 adta elementek használata.

- Gombahaz/Gombahaz/Dockerfile: ```Surround this variable with double quotes; otherwise, it can lead to unexpected behavior.```
    
    - a Dockerfile nem a tárgy kereteiben készült, így a hibát ```Accept```-re állítottuk. Előzetes tesztek alapján nem okoznak hibát a rendszer által észrevett módosítások.

## Tanulságok

A házifeladat rávilágíott számomra, hogy az IDE-kbe beépített kód analizátorok, mennyi hibát nem vesznek észre, ezért a későbbiekben megfontolom a nagyobb projektjeimnél a statikus kódanalizis használatát, hogy csökkenthessem az esetlegesen előforduló hibák számát.