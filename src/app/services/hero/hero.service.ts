import { Injectable } from '@angular/core';
import { Hero } from '../../hero';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../services/message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';            // Gestion des erreurs


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // L'API Web Heroes attend un en-tête spécial dans les demandes de sauvegarde HTTP. Cet en-tête se trouve dans la constante httpOptions définie dans HeroService.
  private heroesUrl = 'api/heroes';  // URL vers l'API web

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

 
  // Service HttpClient.get() retourne un Observable<Hero[]> qui émet une seule valeur, le tableau de héros mockés.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) 
      .pipe(
        tap(_ => this.log('fetched heroes')), // tap() observe les valeurs émises par l'Observable, Il ne les modifie pas. 
        catchError(this.handleError<Hero[]>('getHeroes', []))   // La méthode handleError() signale l'erreur, puis renvoie un résultat afin que l'application continue de fonctionner.
      );
  }

  // Gestion des erreurs - renvoie 'undefined' si l'ID n'existe pas
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)   // Retourne un Observable<Hero[]> qui émet une seule valeur, un tableau de héros correspondant à l'ID passé en paramètre.
      .pipe(
        map(heroes => heroes[0]), // Renvoie un tableau d'éléments {0|1} correspondant à l'ID passé en paramètre.
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';   // Si l'ID existe, 'fetched', sinon 'did not find'
          this.log(`${outcome} hero id=${id}`);             // Log le résultat
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))    // Gestion des erreurs
      );
  }

  // Erreur si l'ID n'existe pas
  getHero(id: number): Observable<Hero> { 
    const url = `${this.heroesUrl}/${id}`;    // URL de l'API web
    return this.http.get<Hero>(url).pipe(     
      tap(_ => this.log(`fetched hero id=${id}`)),   
      catchError(this.handleError<Hero>(`getHero id=${id}`))  
    );
  }

  // Recherche par nom de héros
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // Si le terme de recherche n'existe pas, on renvoie un tableau vide.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  
  // Méthode d'enregistrement 

  // Ajout d'un nouveau héros avec HttpClient.post() (au serveur)
  // Différent de la méthode updateHero() qui met à jour un héros existant.
  // addHero appelle HttpClient.post() au lieu de put() & Il s'attend à ce que le serveur crée un identifiant pour le nouveau héros, qu'il renvoie dans Observable<Hero> à l'appelant
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)), 
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Supprime le héro du serveur
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),  
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // Met à jour le héros sur le serveur
  // L'URL est la même que pour la méthode getHero() (api/heroes/:id). L'URL est inchangée. L'API Web des héros sait quel héros mettre à jour en consultant l'identifiant du héros.
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


 /**
   * Gérer l'opération Http qui a échoué. L'application continue de fonctionner.
   * @param operation - Nom de l'opération qui a échoué
   * @param result - Valeur facultative à renvoyer en tant que résultat observable. Cela permet à l'application de continuer à fonctionner.
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Envoyer l'erreur au serveur de log
      console.error(error); // console.log() pour le serveur de log

      // Bonne pratique : transformer l'erreur pour qu'elle soit plus compréhensible pour l'utilisateur
      this.log(`${operation} failed: ${error.message}`);

      // Laisse l'application continuer de fonctionner en renvoyant un résultat vide.
      return of(result as T); // T est le type de résultat attendu, c'est-à-dire T = Hero[]. 
    };
  }

  // Enregistrer un message HeroService avec MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}