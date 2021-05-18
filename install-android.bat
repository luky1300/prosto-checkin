call npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
call gradlew assembleDebug

rem adb shell pm uninstall com.prostocheckin
adb install app\build\outputs\apk\debug\app-debug.apk
cd ..