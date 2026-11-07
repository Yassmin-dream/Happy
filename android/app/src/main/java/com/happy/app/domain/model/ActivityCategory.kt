package com.happy.app.domain.model

import androidx.annotation.StringRes
import com.happy.app.R

/**
 * Catégories d'activités positives disponibles dans Happy.
 */
enum class ActivityCategory(
    @StringRes val titleRes: Int,
    val hexColor: String
) {
    SPORT(R.string.cat_sport, "#10B981"),
    LECTURE(R.string.cat_reading, "#14B8A6"),
    APPRENTISSAGE(R.string.cat_learning, "#06B6D4"),
    CREATIVITE(R.string.cat_creativity, "#F59E0B"),
    SOCIAL(R.string.cat_social, "#F43F5E"),
    BIEN_ETRE(R.string.cat_wellbeing, "#8B5CF6"),
    PROJET_PERSO(R.string.cat_project, "#0EA5E9");

    companion object {
        fun fromString(value: String): ActivityCategory {
            return entries.find { it.name.equals(value, ignoreCase = true) } ?: BIEN_ETRE
        }
    }
}
