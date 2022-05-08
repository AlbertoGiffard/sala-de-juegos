import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/class/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})


export class TetrisComponent implements OnInit {
  topScore: number;
  points: number;
  userExist: any;
  userStats: any;
  found: boolean;

  constructor(public router: Router, public service: AuthService, public auth: Auth) {
    this.topScore = 0;
    this.points = 0;
    this.found = false;
  }

  ngOnInit() {
    this.service.getUsers().subscribe(listDoc => {
      listDoc.forEach(user => {

        if (user.uid == this.auth.currentUser?.uid) {
          this.userStats = user;
          this.topScore = this.userStats.topScorePropio;
          this.found = true;
          return;
        }
      });
    });
  }

  onLineCleared() {
    this.points++;
  }

  /* onGameOver() {
    alert('game over');
  } */

  modalLose = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Game Over',
      text: "Parece que perdiste, quieres volver a jugar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, otra vez!',
      cancelButtonText: 'No, me rindo',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else {
        result.dismiss === Swal.DismissReason.cancel;
        this.router.navigate(['/sala']);
      }
    })
  }

  lose = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    if (this.found) {
      this.userStats.topScorePropio += this.points;
      this.userStats.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;

      this.service.updateUser(this.userStats).then(() => {
        this.modalLose();
      });
    } else {
      const user = new User();
      user.uid = this.auth.currentUser?.uid;
      user.lastSignIn = this.auth.currentUser?.metadata.lastSignInTime;
      user.topScorePropio = this.topScore;

      this.service.guardarUser(user).then(() => this.modalLose());
    }
  }

}
