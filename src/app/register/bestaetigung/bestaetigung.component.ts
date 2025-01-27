import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bestaetigung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bestaetigung.component.html',
  styleUrl: './bestaetigung.component.css'
})
export class BestaetigungComponent {
  spenden: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.spenden = navigation?.extras?.state?.['donation'];
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
