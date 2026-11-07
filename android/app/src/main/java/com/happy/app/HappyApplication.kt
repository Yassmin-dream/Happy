package com.happy.app

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.hilt.work.HiltWorkerFactory
import androidx.work.Configuration
import dagger.hilt.android.HiltAndroidApp
import javax.inject.Inject

/**
 * Point d'entrée de l'application Happy.
 * Configure Hilt pour l'injection de dépendances et initialise les canaux de notifications.
 */
@HiltAndroidApp
class HappyApplication : Application(), Configuration.Provider {

    @Inject
    lateinit var workerFactory: HiltWorkerFactory

    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder()
            .setWorkerFactory(workerFactory)
            .build()

    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = getSystemService(NotificationManager::class.java)

            // Canal pour les rappels bienveillants quotidiens
            val remindersChannel = NotificationChannel(
                CHANNEL_REMINDERS_ID,
                getString(R.string.notif_channel_reminders_name),
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = getString(R.string.notif_channel_reminders_desc)
                enableVibration(true)
            }

            // Canal silencieux pour la synchronisation Google Drive
            val syncChannel = NotificationChannel(
                CHANNEL_SYNC_ID,
                getString(R.string.notif_channel_sync_name),
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = getString(R.string.notif_channel_sync_desc)
            }

            notificationManager.createNotificationChannels(listOf(remindersChannel, syncChannel))
        }
    }

    companion object {
        const val CHANNEL_REMINDERS_ID = "happy_reminders_channel"
        const val CHANNEL_SYNC_ID = "happy_sync_channel"
    }
}
