# UI tesztek készítése

Vörös László (LGietLaci37)

Én az UI tesztek készítése feladatot vállaltam el. A tesztek készítéséhez a Frontend mappában dolgoztam. A Frontend Angularban készült, ezért komponens teszteket készítettem.

### A projektről

A webapplikáció gombatermesztő házak és az azokban elhelyezett műszerek által mért értékek menedzseléséhez, kiértékeléséhez, és megtekintéséhez biztosít grafikus felületet a felhasználók számára. Minden ház 5 darab szenzort tartalmaz, melyek különböző értékeket mérnek. A gombaházak a rendszerben resource-ként, míg a házakhoz tartozó egyes időpontokban történt, szenzoradatok dataset-ként szerepelnek.  


# Tesztek előkészítése

A tesztek készítése során a component.spec.ts kiterjesztésű fájlokban dolgoztam. Korábban ezekben volták már tesztek, amik automatikuson jöttek létre.
Ezeket kezdetben lefutattam, de az összes hibás volt, ezért ezeket kitöröltem.


# Tesztelés környezete

A teszteléshez elég volt a Frontend mappában konzolban az ng test parancsot kiadni. Ez automatikusan megnyított egy google chrome böngészőt, ahol a Karma test runner lefutatta a teszteket, Jasmine segítségével.
Ezek minden mentésnél automatikuson újra lefutottak és kiírta a sikerreséget vagy sikertelenséget.

# Felkészülés a tesztekhez

A tesztek megírásához a hivatalos angular oldal tesztelését tanulmányoztam, illetve youtube-n néztem videókat a tesztelésekről.


# Tesztek megírása

A tesztek megírása során a komponenseket teszteltem külön-külön.
Először azt teszteltem, hogy sikeresen létre tudok hozni egy adott komponenst. Ez számos esetben nehezebb volt, mivel az több komponens függött egy másiktól.
Ezután megnéztem a .component.ts függvényeit és ezekhez írtam teszteket.
Itt függvényhívásokat ellenőriztem, illetve a változók helyességet.
Továbbá .scss és a html elemeket is teszteltem bizonyos helyeken.


## Összefoglalás, tanulságok

A házi feladat során először megismertem docker működését. Ezután részletesebben megísmertem az Angular komponens teszteket. Kezdetben az egyszerűbbeket, később pedig azt, hogy a különböző esetkben mit hogyan kell tesztelni.
Továbbá megismertem a különböző lehetőségeket az angular tesztelés során, de egy adott projektben nem mindent lehet használni anélkül, hogy azt átalakítanánk.
