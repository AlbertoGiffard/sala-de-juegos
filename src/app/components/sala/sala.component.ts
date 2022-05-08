import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  juegos = [
    {
      'id': 1,
      'name': 'El Ahorcado',
      'description': 'Encuentra la palabra correcta en la menor cantidad de intentos posibles.',
      'image': '../../assets/ahorcado.jpg',
      'link': '/sala/ahorcado'
    },
    {
      'id': 2,
      'name': 'Mayor o menor',
      'description': 'Suma puntos adivinando el número de la carta correcta',
      'image': '../../assets/mayorMenor/mayorMenor.jpg',
      'link': '/sala/mayorMenor'
    },
    {
      'id': 3,
      'name': 'Preguntados',
      'description': '¿Te consideras que sabes de todo un poco? pruebalo acá.',
      'image': '../../assets/preguntados/preguntados.jpg',
      'link': '/sala/preguntado'
    },
    {
      'id': 4,
      'name': 'Tetris',
      'description': 'El clásico juego que conoces ahora en tu sala de juegos.',
      'image': '../../assets/tetris/tetris.jpg',
      'link': '/sala/tetris'
    },
  ]
}
