import { Component, OnInit } from '@angular/core';

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
      'image': '../../assets/ahorcado.jpg'
    },
    {
      'id': 2,
      'name': 'Ta Te Ti',
      'description': 'Encuentra la palabra correcta en la menor cantidad de intentos posibles.',
      'image': '../../assets/ahorcado.jpg'
    },
    {
      'id': 3,
      'name': 'Gta',
      'description': 'Encuentra la palabra correcta en la menor cantidad de intentos posibles.',
      'image': '../../assets/ahorcado.jpg'
    },
    {
      'id': 4,
      'name': 'Fifa',
      'description': 'Encuentra la palabra correcta en la menor cantidad de intentos posibles.',
      'image': '../../assets/ahorcado.jpg'
    },
  ]
}
