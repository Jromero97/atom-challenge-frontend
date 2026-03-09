# Atom Technical Challenge - Frontend

This repository contains the frontend implementation for the Atom Technical Challenge. It is built using **Angular v17**, **Angular Material**, and **TypeScript**, utilizing modern paradigms like Signals for reactive state management.

## 🚀 Features

- **Firebase Passwordless Authentication:** Secure, email-link based authentication flow leveraging Firebase Auth `v12`.
- **Task Management Dashboard:** Fully functional CRUD operations for tasks, communicating with a RESTful backend API.
- **Modern Angular State Management:** Utilizes Angular `v17` Signals (`computed`, `signal`, `toSignal`) combined with RxJS for reactive and efficient state synchronization.
- **UI/UX Components:** Built with **Angular Material** and **SCSS** to provide a clean, responsive, and accessible user interface.
- **Code Quality & Testing:** Pre-configured with **ESLint** for static code analysis, and **Karma/Jasmine** for unit testing.

## 🛠 Tech Stack

- **Framework:** [Angular v17.3](https://angular.dev)
- **UI Library:** [Angular Material v17.3](https://material.angular.io/)
- **Authentication:** [Firebase Auth v12.10](https://firebase.google.com/docs/auth)
- **Reactivity:** RxJS & Angular Signals
- **Testing:** Karma & Jasmine
- **Linting:** ESLint & Angular ESLint plugins

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:
* **Node.js:** version `^18.13.0` or higher `(>= 20.0.0 recommended)`.
* **npm:** Node Package Manager (comes with Node.js).
* **Angular CLI:** `npm install -g @angular/cli@17.3.6`

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jromero97/atom-challenge-frontend.git
   cd atom-challenge-frontend
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create or verify the `src/environments/environment.ts` (and `environment.development.ts`) files containing your backend API and Firebase configurations.
   
   *Example:*
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api', // Replace with actual API URL
     redirectUrl: 'http://localhost:4200/login',
     // Add your Firebase config here if not already present
   };
   ```

## 💻 Making It Run

### Development Server
Run `npm run start` or `ng serve` to launch a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build for Production
Run `npm run build` or `ng build`. The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests
Run `npm run test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Linting
Run `npm run lint` or `ng lint` to find and fix problems in your Angular code.

## 🗂 Project Structure

```text
src/
├── app/
│   ├── core/              # Singleton services, models, guards, and shared core components
│   │   ├── components/    # Reusable structural components (navbars, dialogs)
│   │   ├── guards/        # Route protection logic
│   │   ├── models/        # TypeScript interfaces and types
│   │   └── services/      # Business logic (e.g., AuthService, TaskService)
│   ├── modules/           # Feature modules
│   │   ├── auth/          # Passwordless login and auth components
│   │   ├── dashboard/     # Task list, task creation, and dashboard views
│   │   └── example-page/  # Placeholder for extra views
│   ├── app.component.*    # Root component
│   └── app.routes.ts      # Application routing
├── environments/          # Environment-specific configuration variables
└── main.ts                # Application entry point
```
