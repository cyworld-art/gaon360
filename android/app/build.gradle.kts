plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.gaonvyra.gaon360"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.gaonvyra.gaon360"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
        // The site the app opens. Change here if the domain changes.
        buildConfigField("String", "SITE_URL", "\"https://gaon360.vercel.app/\"")
        buildConfigField("String", "SITE_HOST", "\"gaon360.vercel.app\"")
    }

    signingConfigs {
        // Fixed debug key kept in the repo so every CI build can update the previous install.
        // For Play Store release, create your own upload key and do NOT commit it.
        getByName("debug") {
            storeFile = file("gaon360-debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        debug {
            signingConfig = signingConfigs.getByName("debug")
        }
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    buildFeatures { buildConfig = true }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.activity:activity-ktx:1.9.3")
    implementation("androidx.core:core-splashscreen:1.0.1")
    implementation("androidx.swiperefreshlayout:swiperefreshlayout:1.1.0")
    implementation("androidx.webkit:webkit:1.12.1")
}
