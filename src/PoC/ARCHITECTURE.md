# 20minCoach - Arquitectura Frontend

## 📋 Descripción del Proyecto

20minCoach es una plataforma de coaching profesional que conecta usuarios con expertos en diferentes áreas mediante videollamadas de 20 minutos. La arquitectura está diseñada por capas para garantizar escalabilidad, mantenibilidad y modularidad.

## 🏗️ Arquitectura por Capas

### 📁 Estructura de Carpetas

```
src/
├── 📂 models/              # Definición de modelos de datos
│   ├── User.ts
│   ├── Coach.ts
│   ├── Session.ts
│   └── Package.ts
│
├── 🔐 security/            # Autenticación y autorización
│   └── (Preparado para integración con Okta)
│
├── ⚡ middleware/          # Funcionalidades transversales
│   ├── authMiddleware.ts   # Manejo de autenticación
│   └── errorMiddleware.ts  # Gestión centralizada de errores
│
├── 🔧 services/           # Lógica de negocio
│   ├── AuthService.ts     # Autenticación
│   ├── CoachService.ts    # Gestión de coaches
│   ├── SessionService.ts  # Manejo de sesiones
│   └── WebSocketService.ts # Comunicación en tiempo real
│
├── 🔄 background/         # Procesos en segundo plano
│   └── (Reconexión automática, cacheo offline)
│
├── ✅ validators/         # Validación de datos
│   ├── userValidator.ts
│   └── coachValidator.ts
│
├── 📤 dtos/              # Data Transfer Objects
│   ├── UserDTO.ts
│   ├── CoachDTO.ts
│   └── SessionDTO.ts
│
├── 🗺️ routing/           # Sistema de navegación
│   └── App.tsx (configuración de rutas)
│
├── 🎨 components/        # Componentes reutilizables
│   ├── layout/           # Layouts principales
│   ├── coach/            # Componentes específicos de coaches
│   ├── session/          # Componentes de sesiones
│   └── ui/               # Componentes base (shadcn)
│
├── 📱 pages/             # Páginas principales
│   ├── Landing.tsx       # Página de inicio
│   ├── Dashboard.tsx     # Dashboard de usuario
│   └── CoachSearch.tsx   # Búsqueda de coaches
│
├── 🛠️ utils/            # Funciones de utilidad
│   ├── timeUtils.ts      # Manejo de fechas y tiempo
│   ├── formatUtils.ts    # Formateo de datos
│   └── constants.ts      # Constantes globales
│
└── 🧪 __tests__/         # Pruebas unitarias
    └── (Jest + React Testing Library)
```

## 🎯 Características Principales

### ✨ Diseño System
- **Tokens semánticos** definidos en `index.css`
- **Colores HSL** para consistencia
- **Gradientes profesionales** para UI atractiva
- **Animaciones suaves** con cubic-bezier
- **Responsive design** con Tailwind CSS

### 🔗 Servicios Principales

#### AuthService
- Manejo de JWT tokens
- Refresh automático de tokens
- Almacenamiento seguro en localStorage
- Preparado para integración con Okta

#### CoachService
- Búsqueda y filtrado de coaches
- Gestión de perfiles
- Estados de disponibilidad en tiempo real

#### SessionService
- Creación y gestión de sesiones
- Unión a videollamadas
- Sistema de calificaciones

#### WebSocketService
- Comunicación en tiempo real
- Reconexión automática
- Gestión de eventos de estado

### 📊 Modelos de Datos

#### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  preferences: UserPreferences;
}
```

#### Coach
```typescript
interface Coach {
  id: string;
  userId: string;
  bio: string;
  specialties: Specialty[];
  rating: number;
  availability: Availability;
  status: CoachStatus;
}
```

#### Session
```typescript
interface Session {
  id: string;
  clientId: string;
  coachId: string;
  scheduledAt: Date;
  duration: number;
  status: SessionStatus;
  connectionData: SessionConnection;
}
```

## 🚀 Tecnologías Utilizadas

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Validation**: Zod
- **Date/Time**: date-fns
- **Icons**: Lucide React

## 🔐 Seguridad

### Preparación para Okta
La arquitectura está preparada para integrar Okta como proveedor de identidad:

1. **AuthService** puede ser extendido para usar Okta SDK
2. **Middleware de autenticación** soporta tokens OAuth
3. **Roles y permisos** preparados para integración

### Características de Seguridad
- Validación de entrada con Zod
- Manejo seguro de tokens
- Protección de rutas
- Gestión centralizada de errores

## 📱 Funcionalidades Implementadas

### ✅ Versión Actual
- ✅ Landing page profesional
- ✅ Dashboard de usuario
- ✅ Búsqueda de coaches con filtros
- ✅ Sistema de navegación completo
- ✅ Componentes reutilizables
- ✅ Diseño responsive
- ✅ Arquitectura por capas
- ✅ Validación de formularios
- ✅ Gestión de errores

### 🔄 Próximas Funcionalidades
- 📹 Integración WebRTC para videollamadas
- 🔔 Sistema de notificaciones en tiempo real
- 💳 Integración de pagos
- 📊 Dashboard de coach
- 🎯 Sistema de disponibilidad
- 🌐 Soporte multi-idioma

## 🧪 Testing

### Estructura de Pruebas
```
__tests__/
├── components/        # Pruebas de componentes
├── services/          # Pruebas de servicios
├── utils/            # Pruebas de utilidades
└── integration/      # Pruebas de integración
```

### Herramientas
- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes
- **MSW**: Mock Service Worker para APIs
- **Cypress**: Testing end-to-end

## 📦 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar pruebas
npm test

# Build para producción
npm run build
```

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary**: Azul profesional (#1e40af)
- **Secondary**: Verde confianza (#059669)
- **Success**: Verde coaching (#16a34a)
- **Warning**: Naranja profesional (#ea580c)

### Gradientes
- **Hero**: Linear gradient azul-verde
- **Card**: Gradiente sutil para cards
- **Button**: Gradiente para botones principales

### Componentes
- Cards con sombras suaves
- Botones con estados hover
- Badges para especialidades
- Avatares para usuarios
- Indicadores de estado

## 🔮 Roadmap de Integración

### Fase 1: Autenticación (Okta)
- Configuración Okta SDK
- Flujos de login/logout
- Gestión de sesiones

### Fase 2: Video Llamadas (WebRTC)
- Integración WebRTC
- Sala de espera
- Controles de audio/video

### Fase 3: Tiempo Real (WebSockets)
- Estado de coaches
- Notificaciones push
- Chat en tiempo real

### Fase 4: Pagos (Stripe)
- Procesamiento de pagos
- Gestión de paquetes
- Facturación

## 📞 Contacto y Soporte

Para dudas sobre la arquitectura o implementación, consulta la documentación técnica o contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2025  
**Estado**: En desarrollo activo 🚧