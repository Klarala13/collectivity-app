### TO RUN THE APP

ios: npx expo run:ios
android: npx expo run:android

### FRONTEND COMPONENTS
Right now, all components are part of a template. It must be restructured to contain the real application.

PAGES:
-HOME -> welcome message and items listing
-PROFILE -> user info and messages 
-ITEMSLIST (add, edit, delete items) You should be able to filter by category and by location (user´s city/postal code)
-PROFILE (list of item´s shared, user info, user picture)
-REGISTER
-NAVIGATION

### NICE TO HAVES
-ITEM DETAIL 
-TRANSLATIONS
-RECENTLY SEEN WIDGET, RECENTLY BORROWED WIDGET
-GEO LOCALIZATION FOR DISPLAYING ITEMS NEAR YOU 

### BACKEND ROUTES
We will need to able to login, have an admin login, create/delete/update items and allow users to message eachother and admin. 
We should also be able to display the user´s profile 

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