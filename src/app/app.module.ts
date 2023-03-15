import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { FormsModule } from '@angular/forms';       // <-- NgModel
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; 

import { HttpClientModule } from '@angular/common/http'; // <-- HttpClient, communiquer avec le serveur distant via Http
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // <-- InMemoryWebApiModule, simuler un serveur distant
import { InMemoryDataService } from './services/inMemoryData/in-memory-data.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(               // Le module HttpClientInMemoryWebApiModule intercepte les requêtes HTTP et retourne des réponses simulées du serveur. A supprimer lorsque un serveur réel est prêt pour recevoir les requêtes.
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
