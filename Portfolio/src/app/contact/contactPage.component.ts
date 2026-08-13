import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

type AlertType = 'success' | 'danger';

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

@Component({
selector: 'contactPage-component',
templateUrl: './contactPage.component.html',
styleUrls: ['./contactPage.component.css']
})
export class ContactpageComponent implements OnDestroy {
  contactForm: FormGroup;

  isLoading = false;
  showAlert = false;
  alertType: AlertType = 'success';
  alertMessage = '';

  private readonly destroy$ = new Subject<void>();
  private alertTimeout?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly fb: FormBuilder,
    /* private readonly http: HttpClient */
  ) {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(150)
        ]
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2000)
        ]
      ]
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isLoading) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const request: ContactRequest = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    /* this.http
      .post('/api/contact', request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;

          this.contactForm.reset();

          this.showAlertMessage(
            'success',
            'Your message has been sent successfully!'
          );
        },
        error: (error) => {
          console.error('Contact form error:', error);

          this.isLoading = false;

          this.showAlertMessage(
            'danger',
            'Something went wrong. Please try again later.'
          );
        }
      }); */
  }

  private showAlertMessage(
    type: AlertType,
    message: string
  ): void {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.alertTimeout = setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }
}