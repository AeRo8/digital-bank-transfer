### Tech Stack

- React Native
- Expo
- TypeScript
- @shopify/flash-list (Optimized list rendering)
- @gorhom/bottom-sheet
- expo-local-authentication (Biometric authentication)
- Formik (Form handling)
- Yup (Form validation)
- NativeWind (Styling)

### Notice

1. The app is primarily developed on Windows, so it is optimized for **Android**. Any assistance in testing on iOS would be highly appreciated.
2. While web support is available, the user interface may not render optimally.
3. In case biometric authentication is unsupported, use the following hardcoded password:

```js
// The password is neither hashed nor encrypted. This should not be done in production.
PASSWORD = "1234456";
```
4. The search functionality for the contact list is currently not operational.
5. The `TransferForm` component is somewhat overloaded and should be refactored into smaller, modular components or hooks.

### Setup

1. After `git clone`, `npm i` to install the dependencies.
2. Run `npx expo start` to start the app.
3. Press "a" from your keyboard to open Android emulator or install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) in your mobile and scan the QR code in the terminal/bash.

### Design Decisions and Challenges
The decision to use `NativeWind` stems from the ease of transition from `Tailwindcss`. Additionally, the `React Context API` is employed for global state management. `Expo` was chosen for its simplicity in development and setup. The UI/UX design draws inspiration from the GxBank mobile app, which offers an intuitive interface.

Challenges encountered during development include mastering the `bottom-sheet` and `nativewind` libraries, making components more flexible, exploring `expo-router` for file-based navigation, integrating biometric authentication smoothly, writing clean and maintainable code, and improving the overall user experience.

### Video
https://github.com/user-attachments/assets/5a636715-b533-47b8-8db6-d24d40407f87
