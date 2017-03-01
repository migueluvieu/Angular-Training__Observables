
import { Component, OnInit } from '@angular/core';
import { Http, Response }          from '@angular/http';
//importamos observable de rxjs-> el módulo añadido en system.js y los operadores que vayamos a utilizar
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/max';
import 'rxjs/add/observable/timer';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Observables';

  constructor (private http:Http){

  }

  ngOnInit(){
      /* En general-> el observer que se suscribe normalmente lo creamos anónimo, en este caso solo pintará por pantalla, pero 
     se podría crear programáticamente y pasárselo 
    
    let observador = Rx.Observer.create(
      function onNext(x) { console.log('Next: ' + x); }, 
      function onError(err) { console.log('Error: ' + err); }, 
      function onCompleted() { console.log('Completed'); } 
      ); 
    */

    //todos los operadores de observables
    //http://reactivex.io/documentation/operators

     this.ejemplo1(); 
     this.ejemplo2();
     this.ejemplo3();
     this.ejemplo4();
     this.ejemplo5();
     this.ejemplo6();
     this.ejemplo7();
     this.ejemplo8();
     this.ejemplo9();

  }

 

  ejemplo1 (){
    console.log("***** Ejemplo1 ******");

    let cadena = "hola";
    //Añadimos el $ para saber que el recurso es un obsevable por conveniencia 
    //El operador 'of' observable envía toda la cadena al observer,le llegaría "hola", es la cadena completa observable. 
    //Internamente lo que hace el onSubscribe de observable es un observer.onNext(cadena)   
    let cadena$ = Observable.of(cadena);
    
    cadena$.subscribe((data)=>{
      console.log(data);
    }); 

    //podemos tb el subscribe más sencillo, hace lo mismo 
     cadena$.subscribe(console.log);



    //Por ejmplo si ponemos el operador from haría observable cada letra de la cadena
    //el from se utiliza para arrays. En este ejemplo al observer le llegaría la h, luego la o, luego la l y luego la a, por separado
    Observable.from(cadena).subscribe(console.log);   
   
  } 

  ejemplo2 (){
   console.log("***** Ejemplo2 ******");
    
   let array = [1,2,3,4,5];
    
    //con el of se 'envía' todo el array, el objeto array es el observable
   let array1$ = Observable.of(array); 
    array1$.subscribe(data=>{
      console.log("todo el array", data);
    }); 

  //con el from se 'envía' item a item, cada item es observable, en este caso cada item es un Observable <integer>.
  //al observer le llega cada item Observable <integer>
   console.log("item a item");
   Observable.from(array).subscribe(console.log);
   
   //operador map -> recibe un recurso observable y devuelve otro recurso observable transformado, es un pipe del stream
    //en este caso el map recibe cada item del array por separado (cada uno es un es Observable<Integer>) y devuelve otro Observable<Integer> pero sumándole 2 
    //al observer le llega cada item Observable <integer>
    console.log("devuelve array con los items sumados + 2");
    Observable.from(array).map(item=> item+2)
    .subscribe(console.log);
     
    //En este caso con map transformamos 
    //en este caso el map 'recibe' los item del array que es Observable<Integer> y devuelve otro Observable<{valorAntes, valorDespués}> 
    //al observer le llega cada item  Observable<{valorAntes, valorDespués}> 
    console.log("devuelve array con los items sumados + 2");
    Observable.from(array).map(item=>{
        return {valorAntes:item, valorDespues:item+2}
     })
    .subscribe(console.log);

    //
    console.log("Concatenamos otro map, deja el array como estaba al principio");
    //Se concatena otro map que vuelva a dejar el array como al principio, asignando a cada item el valor inicial.
    //el segundo map recibe cada item  Observable<{valorAntes, valorDespués}> y lo transforma en Observable<{valorAntes, valorDespués}>
     Observable.from(array).map(item=>{
         return {valorAntes:item, valorDespues:item+2}
       })
     .map ((item)=>{
        return  item.valorAntes; 
      })
    .subscribe(console.log);

     console.log("Aplicamos filter, devolvemos los elementos >3");
    //Se concatena otro map que vuelva a dejar el array como al principio, asignando a cada item el valor inicial.
    //el segundo map recibe cada item  Observable<{valorAntes, valorDespués}> y lo transforma en Observable<{valorAntes, valorDespués}>
     Observable.from(array)
     .filter (item=> item>3)
     .subscribe(console.log);

  } 

  ejemplo3 (){
    console.log("***** Ejemplo3 ******");

    //creamos un observable. También podemos crealos así
    //aquí lo que hace internamente la función lambda es invocar al método onSusbcribe del observable que estamos 
    //creando que a su vez invoca a un método call el cual recibe el observer, para emitir el array a través del método next, 
    // es decir, no se está creando un observer aquí, se crea un observable, se define qué se observa y se le pasa (emite) a
    // cualquier observer que se suscriba.
    // ES decir, se comunica con el observer a través del método observer.next (y error y completed)
    //mirar la doc de java para aclarar http://sglora.com/android-tutorial-sobre-rxjava-i-lo-basico/

    console.log("***** Como crear observable y emitir al observer ******");
    let array1$:Observable <number> = new Observable(observer => {
                let array = [10,20,30];
                //se puede emitir al observer todo el array (como el operador of)
                observer.next(array);
                //o podemos emitir al observer cada item del array (como el operador from)
                array.map(item=>{
                  observer.next(item);
                }); 
               
                }
            );
   
   let array2$:Observable<number> = new Observable(observer => {
                let array = [1,2,3]; 
                observer.next(array);
                }
            );

    array1$.subscribe(console.log);
   
  } 

  ejemplo4 (){
    console.log("***** Ejemplo4 ******");
    console.log("***** Funciones que devuelven observables ******");
    let array = [1,2,3,4];    
    this.funcion1$(array).subscribe(console.log); 
    this.funcion2$(array).subscribe(console.log);   
  } 
   
   ejemplo5 (){
    console.log("***** Ejemplo5 ******");
    console.log("***** funciones observables encadenadas, mergeMap******");
    let array = [1,2,3,4];  
    //las observables se encadenan con flatMap (antes se llamaba mergeMap). 
    //El resultado de se pasa a la siguiente y así
    // son funciones chorras que no serían observables pero se ve.
    //aquí multiplicamos por 2 los items del array, luego seleccionamos los >2 en otra observable
    //y finalmente volvemos a multiplicar*2 y calculamos el máximo del array  
    this.funcion1$(array)
    .flatMap(res=>this.funcion2$(res))
    .flatMap(res=>this.getMaximo$(res.map(i=>i*2)))  
    .subscribe(console.log); 
  } 


 ejemplo6 () {
  console.log("***** Ejemplo6 ******");
  console.log("***** invocación rest a fake de post, devuelve observable******"); 
 
  //devuelve todos
  this.getPost$().subscribe(console.log);
  //devuelve detalle de uno
  this.getPostDetail$(1).subscribe(console.log);

 }  

ejemplo7 () {
  console.log("***** Ejemplo7******");
  console.log("***** invocación rest chained, obtiene todos y obtiene detalle del último ******");  
  //chained
  this.getPost$().flatMap( 
     postsResp => 
       this.getPostDetail$(postsResp[postsResp.length-1].id))
    .subscribe(console.log);
 }  

 ejemplo8 () {
  console.log("***** Ejemplo8 ******");
  console.log("***** invocación rest chained, obtiene todos, luego primero y luego último ******");  
  let postReceived = [];
  //chained. se asigna post a vble postReceived y se obtiene el primero y encadenado el último 
  this.getPost$().map( postResp => postReceived = postResp)
  .flatMap( ()=>this.getPostDetail$(postReceived[0].id))
  .flatMap( ()=>this.getPostDetail$(postReceived[postReceived.length-1].id))
  .subscribe(console.log);
 }  

 ejemplo9 () {
  console.log("***** Ejemplo9 ******");
  console.log("***** invocación rest, obtiene todos y luego de cada uno, su detalle, al final se obtiene un array de todos con detalle ******");  
  let postReceived = [];
  //Se obtienen todos y con map vamos recorriendo. por cada item se obtien detalle. Ojo, aquí en realidad no encadeno, no hay flatMap
  //ya que por cada invocación al detalle lo que hago es añadirDetalle a la vble postReceived
  
   this.getPost$().map(
    posts=> 
       posts.map(
         item=>this.getPostDetail$(item.id).subscribe(postReceived.push)
         ) 
    )
  .subscribe(res=>console.log(postReceived));

 }  

  
 

/********** funciones observables ****/

  //función que multiplica * 2 los elementos de un array
  funcion1$ (array : Array<any>) : Observable<any>{
    return new Observable(observer => {
       observer.next (array.map(i=>i*2));                
       }
    );    
  }

  //función que devuelve el array de elementos > 2
  funcion2$ (array : Array<any>) : Observable<any>{
    return new Observable(observer => {
       observer.next (array.filter(i=>i>2));               
       }
    )
    
  }
  
  /**
   * Calcula el máximo de un array pudiendo indicar el max de qué propiedad si es un arra de objetos
   * Devuelve observable
   */
  getMaximo$ (array :Array<any>, property?): Observable<any> {
    console.log ("Calculamos el máx de un array con rxjs")
    return Observable.from (array).max(property);
  }

  getPost$ (): Observable<any> {
    return this.http.get("http://jsonplaceholder.typicode.com/posts")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPostDetail$ (id): Observable<any> {
    return this.http.get("http://jsonplaceholder.typicode.com/posts/".concat(id))
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPostComments$ (id): Observable<any> {
    return this.http.get("http://jsonplaceholder.typicode.com/posts/".concat(id))
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

   private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
