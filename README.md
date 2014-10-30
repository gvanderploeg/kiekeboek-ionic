## Releasing for Android

* Set versions in config.xml:

        version="0.0.3-alpha"
        android-versionCode="3"

* ionic platform android
* ionic build --release
* jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore [keystore] platforms/android/ant-build/Kiekeboek-release-unsigned.apk Geert\ van\ der\ Ploeg
* zipalign -v 4 platforms/android/ant-build/Kiekeboek-release-unsigned.apk kiekeboek-v[version].apk

