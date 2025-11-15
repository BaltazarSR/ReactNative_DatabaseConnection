# DB Access - Student Management Mobile App

A React Native mobile application built with Expo that demonstrates database integration using Supabase for managing student information. This project was developed as part of a course to learn about secure database access, data validation, and mobile application architecture.

## 📱 Project Overview

This is a student management application that allows users to:
- Add new student records with validation
- View a list of all students stored in the database
- Real-time connection status monitoring
- Pull-to-refresh functionality
- Automatic retry mechanism for database operations

## 🏗️ Architecture

The project follows a **Model-View-Controller (MVC)** architecture pattern:

```
src/
├── models/          # Data models and type definitions
├── views/           # UI components and screens
├── controllers/     # Business logic and state management
├── services/        # External service integrations (Supabase)
├── navigation/      # App navigation structure
└── utils/          # Utility functions (logger)
```

### Key Components

- **Models**: Define TypeScript interfaces for type safety (`StudentModel`, `RootParamsListModel`)
- **Views**: Implement the UI with two main screens:
  - `InputInfoScreen` - Form for adding student data
  - `InfoListScreen` - List view of all students with real-time status
- **Controllers**: Handle business logic and API calls:
  - `InputInfoController` - Manages form state and data submission
  - `InfoListController` - Manages student list fetching and refresh logic
- **Services**: Supabase client configuration with secure authentication

## 🔧 Technologies Used

- **React Native** (0.81.5) - Mobile app framework
- **Expo** (~54.0.23) - Development platform
- **TypeScript** (~5.9.2) - Type-safe JavaScript
- **Supabase** (^2.81.1) - Backend-as-a-Service (BaaS) for database
- **React Navigation** - Bottom tab navigation

## 📚 What I Learned

### 1. **Database Integration & Security**
- Implementing secure database connections using Supabase
- Using environment variables to protect sensitive credentials
- Understanding BaaS (Backend-as-a-Service) architecture
- Managing authentication tokens and session persistence

### 2. **Data Validation**
- Client-side input validation before database operations
- Regex patterns for format validation (e.g., School ID format: A01234567)
- Type checking and range validation (semester 1-20)
- Providing user-friendly error messages

### 3. **Error Handling & Resilience**
- Implementing retry mechanisms for failed database operations
- Exponential backoff strategy for retries
- Graceful error handling with user feedback via alerts
- Connection status monitoring

### 4. **Mobile Development Best Practices**
- MVC architecture pattern for clean code organization
- TypeScript for type safety and better developer experience
- Custom hooks for reusable controller logic
- Separation of concerns between UI and business logic

### 5. **State Management**
- Using React hooks (`useState`, `useEffect`) for state management
- Managing loading states and error states
- Real-time data synchronization with pull-to-refresh

### 6. **UI/UX Design**
- Responsive mobile UI design
- Loading indicators for better user experience
- Empty states and error states
- Visual feedback for user actions (alerts, connection indicators)

### 7. **React Navigation**
- Bottom tab navigation implementation
- Custom icons for navigation tabs
- Type-safe navigation with TypeScript

### 8. **Logging & Debugging**
- Custom logger utility for debugging
- Tracking user actions and errors
- Better development workflow with structured logging

## 📊 Database Schema

The app uses a `students` table with the following structure:

```typescript
interface Student {
  id: number;
  name: string;
  school_id: string;  // Format: A12345678
  semester: number;    // Range: 1-20
  created_at: string;
}
```

## 🔐 Security Considerations

- Environment variables for sensitive data
- AsyncStorage for secure token storage
- Client-side validation to prevent invalid data
- Supabase Row Level Security (RLS) ready
- No hardcoded credentials in the codebase

## 🎯 Learning Outcomes

This project helped me understand:
- How to build production-ready mobile applications
- The importance of proper architecture and code organization
- Security best practices in mobile app development
- Working with cloud databases and BaaS platforms
- TypeScript for safer and more maintainable code
- User experience considerations in mobile apps
