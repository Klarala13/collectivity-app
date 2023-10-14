### TO RUN THE APP
npm run start 

### FRONTEND COMPONENTS
Right now, all components are part of a template. It must be restructured to contain the real application.

PAGES:
-HOME -> welcome message and items listing
-PROFILE -> user info and messages 
-ITEMS (add, edit, delete)
-NAVIGATION

### BACKEND ROUTES
We will need to able to login, have an admin login, create/delete/update items and allow users to message eachother and admin. 

## File Structure
Within the download you'll find the following directories and files:

```
soft-ui-react-native/
├── App.tsx
├── README.md
├── app.json
├── assets
├── babel.config.js
├── package.json
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   └── images
│   ├── components
│   │   ├── Article.tsx
│   │   ├── Block.tsx
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Image.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Product.tsx
│   │   ├── Switch.tsx
│   │   ├── Text.tsx
│   │   └── index.tsx
│   ├── constants
│   │   ├── index.ts
│   │   ├── light.ts
│   │   ├── mocks.ts
│   │   ├── regex.ts
│   │   ├── theme.ts
│   │   ├── translations
│   │   │   ├── en.json
│   │   │   └── index.ts
│   │   └── types
│   │       ├── components.ts
│   │       ├── index.ts
│   │       └── theme.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useData.tsx
│   │   ├── useScreenOptions.tsx
│   │   ├── useTheme.tsx
│   │   └── useTranslation.tsx
│   ├── navigation
│   │   ├── App.tsx
│   │   ├── Menu.tsx
│   │   └── Screens.tsx
│   └── screens
│       ├── Articles.tsx
│       ├── Components.tsx
│       ├── Home.tsx
│       ├── Pro.tsx
│       ├── Profile.tsx
│       ├── Register.tsx
│       └── index.ts
└── tsconfig.json
```