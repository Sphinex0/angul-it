import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  // imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);

  // You can navigate programmatically if you need to run logic before starting
  startChallenge() {
    this.router.navigate(['/challenge']);
  }
}
