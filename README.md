# Little Lemon Food Ordering App

Capstone project for the Meta React Native course. The app lets a customer enter their
details once, browse the Little Lemon menu, search and filter dishes, and manage their
profile.

`wireframe.jpg` in the project root is the low-fidelity wireframe of the three screens.

## Screens

- **Onboarding** (shown on first launch): name and email fields; the **Next** button stays
  disabled until both are filled in. Submitting saves the details and opens Home.
- **Home**: header with logo and profile avatar, hero section with the restaurant
  description and a search bar, an "Order for delivery" breakdown with selectable
  categories (Starters, Mains, Desserts, Drinks), and a scrolling food menu list with
  name, description, price and picture.
- **Profile** (opened from the header avatar): prefilled with the onboarding data.
  First name, last name, email, phone number and email notification toggles can be
  edited, discarded or saved. **Log out** clears all profile data and returns to
  onboarding. The back arrow returns to Home.

Profile data is stored with AsyncStorage, so saved changes survive an app restart.

## Run locally

Requirements: Node.js 18 or newer and npm. Expo Go on a phone or an Android/iOS
simulator is optional; the app also runs in a browser.

```bash
npm install
npx expo start
```

Then press `w` for web, `a` for Android or `i` for iOS in the Expo terminal, or run:

```bash
npm run web
```

No API keys or backend are required. The menu data is bundled in
`data/menuItems.js` and all images are local, so the app works offline.

## Project structure

```
App.js                     providers, navigation container, status bar
navigators/RootNavigator.js stack: Onboarding, Home, Profile
context/ProfileContext.js   profile state and AsyncStorage persistence
screens/                    OnboardingScreen, HomeScreen, ProfileScreen
components/                 AppHeader, HeroSection, SearchBar, FormField
data/menuItems.js           categories and menu items
constants/theme.js          colors and heading font
assets/images/              logo, hero, avatar and dish photos
wireframe.jpg               wireframe submitted with the project
```

## Stack

Expo SDK 58, React Native, React Navigation (native stack), AsyncStorage,
@expo/vector-icons.
