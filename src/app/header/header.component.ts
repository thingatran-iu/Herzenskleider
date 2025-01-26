import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-header',
  standalone: true, // Markiert die Komponente als Standalone
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  

}
