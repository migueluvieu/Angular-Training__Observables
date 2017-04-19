# Observables
Proyecto para las pruebas con la librería rxjs. Una primera aproximación, se irá completando con operadores de ReactiveX.js 

## Debug
Levantar servidor y activar consola chrome para ver resultados

## Recursos aclaratorios:
https://codekstudio.com/post-blog/conceptos-observables-rxjs-y-angular-2-javascript-reactivo-y-funcional/57d1e2840897131b5ec54b90
https://namitamalik.github.io/Map-vs-FlatMap/
rx en java, interesante 
http://sglora.com/android-tutorial-sobre-rxjava-i-lo-basico/

## Ventajas con Promises
Los observables se pueden cancelar, a diferencia de las promises
Las promises solo pueden devolver una respuesta (a menos que combines varias promises con $q.all)

## Características
Un recurso Observable puede ser observador por n observers. Los observes se suscriben a sus cambios:
Observable.subscribe(observer1);
Observable.subscribe(observer2);
Observable.subscribe(observer3);

El recurso Observable no se ejecuta si no tiene ningún observer suscrito.
Se pueden observar todo tipo de recursos. El más común el htt.get, mítico de las apis. Devuelve un recurso Observable.

Los recursos Observables emiten el contenido al observer suscrito mediante método onNext.
Ejemplo de un observer:

var observador = Rx.Observer.create(
    function onNext(x) { console.log('Next: ' + x); }, 
    function onError(err) { console.log('Error: ' + err); }, 
    function onCompleted() { console.log('Completed'); } 
); 

observable.suscribe(observador);

## Operadores
http://reactivex.io/documentation/operators

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
