//a resourceId egy environment változó
//a validTestSeriaNum enviroment változó, célja, hogy a párhuzamosan dolgozó virtuális userek ellenére is 
//tudjunk valamilyen egyedi azonosítót hozzá rendelni
//a script rész pre-request mezőjébe kell írni

let res =pm.environment.get("resourceId");
res++;
pm.environment.set("resourceId",res);

let datasetoverallId=pm.environment.get("ValidTestSeriaNum");
pm.environment.set("ValidTestSeriaNum",++datasetoverallId);

if(res>20){
    res=1;
    pm.environment.set("resourceId",res);
}