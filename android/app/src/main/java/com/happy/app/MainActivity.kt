package com.happy.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.happy.app.ui.theme.HappyTheme
import dagger.hilt.android.AndroidEntryPoint

/**
 * Activité principale de Happy.
 * Configure Edge-to-Edge et héberge la barre de navigation Material 3.
 */
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            HappyTheme {
                HappyMainScreen()
            }
        }
    }
}

sealed class BottomNavScreen(val route: String, val titleRes: Int, val icon: androidx.compose.ui.graphics.vector.ImageVector) {
    data object Home : BottomNavScreen("home", R.string.nav_home, Icons.Default.Home)
    data object Activities : BottomNavScreen("activities", R.string.nav_activities, Icons.Default.List)
    data object Stats : BottomNavScreen("stats", R.string.nav_stats, Icons.Default.DateRange)
    data object Rewards : BottomNavScreen("rewards", R.string.nav_rewards, Icons.Default.EmojiEvents)
    data object Settings : BottomNavScreen("settings", R.string.nav_settings, Icons.Default.Settings)
}

@Composable
fun HappyMainScreen() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val screens = listOf(
        BottomNavScreen.Home,
        BottomNavScreen.Activities,
        BottomNavScreen.Stats,
        BottomNavScreen.Rewards,
        BottomNavScreen.Settings
    )

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            NavigationBar {
                screens.forEach { screen ->
                    val isSelected = currentRoute == screen.route
                    NavigationBarItem(
                        selected = isSelected,
                        onClick = {
                            if (currentRoute != screen.route) {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        },
                        icon = { Icon(screen.icon, contentDescription = stringResource(screen.titleRes)) },
                        label = { Text(stringResource(screen.titleRes)) }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = BottomNavScreen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(BottomNavScreen.Home.route) {
                // Composant de l'écran d'accueil (détaillé à l'étape 5)
            }
            composable(BottomNavScreen.Activities.route) {
                // Composant de l'historique d'activités
            }
            composable(BottomNavScreen.Stats.route) {
                // Composant des statistiques
            }
            composable(BottomNavScreen.Rewards.route) {
                // Composant des trophées et séries
            }
            composable(BottomNavScreen.Settings.route) {
                // Composant des réglages et synchronisation Drive
            }
        }
    }
}
