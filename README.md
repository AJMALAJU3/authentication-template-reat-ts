# Modern Authentication Template

A production-ready authentication template built with React, TypeScript, Redux, and Tailwind CSS. Features a beautiful, responsive design with a focus on user experience and performance.

## Features

- 🔐 Complete authentication flow (Login, Register, Forgot Password)
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Performance optimized with code splitting and lazy loading
- 🔄 State management with Redux Toolkit
- 🎯 Form validation with Zod
- 🔒 Protected routes with auth guards
- 🌐 Social login support (Google, GitHub)
- 💾 Persistent authentication state
- ⚙️ TypeScript for type safety
- 🎁 Beautiful components with smooth transitions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication-related components
│   └── ui/            # Common UI components
├── features/          # Redux slices and related logic
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   └── dashboard/     # Protected pages
├── services/          # API services
├── store/             # Redux store configuration
└── types/             # TypeScript type definitions
```

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://github.com/colinhacks/zod)
- [Lucide Icons](https://lucide.dev/)

## Key Features

### Authentication Flow
- Secure login and registration
- Password reset functionality
- Social login options
- Remember me functionality
- Protected route guards

### Performance
- Code splitting with React.lazy()
- Route-based chunking
- Optimized bundle size
- Lazy-loaded components

### User Experience
- Form validation with error messages
- Loading states and animations
- Responsive design for all devices
- Smooth transitions
- Clear error handling

### State Management
- Centralized Redux store
- Persistent authentication state
- Type-safe actions and reducers
- Efficient state updates

## License

MIT
