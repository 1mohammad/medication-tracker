# Medicator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## 📋 Demo

Check out the live demo: [Medicator App](https://medication-tracker-tau.vercel.app/)

## 📋 Overview

Medicator is a modern web application designed to help users manage and track their medications efficiently. Built with Angular, this application provides a user-friendly interface for adding, storing, and monitoring medication schedules.

## ✨ Features

- **Medication Management**: Add and track multiple medications
- **Browser Storage**: Local storage implementation for persistent data
- **Validation System**: Robust validation for medication inputs
- **Responsive Design**: Clean and modern UI that works across devices
- **Dependency Injection**: Efficient use of Angular's DI system

## 🛠️ Technical Stack

- **Frontend Framework**: Angular
- **Testing**: Jasmine/Karma
- **Storage**: Browser Local Storage
- **Styling**: TailwindCSS
- **Architecture**: Component-based with Service Layer

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── add-medication-modal/
│   │   │   ├── add-medication-modal.component.ts
│   │   │   └── add-medication-modal.component.html
│   │   └── medication-list/
│   │       ├── medication-list.component.scss
│   │       └── medication-list.component.html
│   └── services/
│       ├── medication.service.ts
│       ├── medication.service.spec.ts
│       ├── storage.service.ts
│       ├── storage.service.spec.ts
│       ├── validator.service.ts
│       └── validator.service.spec.ts
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/1mohammad/medication-tracker.git
   ```

2. **Install dependencies**
   ```bash
   cd medication-tracker
   npm install
   ```

3. **Run the development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🧪 Testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). The project includes comprehensive tests for:
- Storage Service
- Validator Service
- Components functionality

## 💻 Development

### Key Components

1. **Add Medication Modal**
   - Handles new medication entry
   - Implements form validation
   - Communicates with medication service

2. **Medication List**
   - Displays stored medications
   - Responsive layout
   - Real-time search functionality
   - Filterable by medication name

### Services

1. **Storage Service**
   - Manages browser local storage
   - Handles data persistence

2. **Medication Service**
   - Core business logic
   - CRUD operations for medications
   - Data validation coordination

3. **Validator Service**
   - Input validation
   - Data integrity checks
   - Error handling

## 🔧 Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
- Use `ng build --prod` for a production build
- Outputs are optimized for performance

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
