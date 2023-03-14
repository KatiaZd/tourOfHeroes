import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Définit une liste de messages vide (string[]) et l'initialise dans le constructeur de la classe MessageService 
  // (qui est appelé au moment de la création de l'instance de la classe MessageService). 
  messages: string[] = [];

  // Ajoute un message à la liste des messages
  // (utilisé par le composant HeroService pour afficher un message lorsqu'un héros est sélectionné)
  add(message: string) {
    this.messages.push(message);
  }

  // Vide la liste des messages 
  // (utilisé par le composant MessagesComponent pour effacer les messages affichés)
  clear() {
    this.messages = [];
  }
}