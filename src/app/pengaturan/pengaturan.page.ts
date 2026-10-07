import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {
  isDarkMode = false;

  constructor() { }

  ngOnInit() {
    this.isDarkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode(event: any) {
     const isDark = event.detail.checked;
     document.documentElement.classList.toggle('ion-palette-dark', isDark);
    document.body.classList.toggle('dark', isDark);
  }
}
