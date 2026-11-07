package com.happy.app.domain.model

import java.time.LocalDateTime

/**
 * Modèle métier d'une activité positive dans Happy.
 *
 * @property id Identifiant unique (UUID)
 * @property title Titre de l'activité (ex: "Marcher au grand air")
 * @property category Catégorie (sport, lecture, bien-être...)
 * @property durationMin Durée en minutes (5 à 480 min)
 * @property dateTime Date et heure de réalisation
 * @property note Note ou ressenti facultatif
 * @property moodBefore Évaluation de l'humeur avant (1 à 5)
 * @property moodAfter Évaluation de l'humeur après (1 à 5)
 */
data class Activity(
    val id: String,
    val title: String,
    val category: ActivityCategory,
    val durationMin: Int,
    val dateTime: LocalDateTime,
    val note: String? = null,
    val moodBefore: Int? = null,
    val moodAfter: Int? = null
) {
    /**
     * Calcule le gain de sérénité (différentiel d'humeur).
     */
    val moodImprovement: Int
        get() = if (moodBefore != null && moodAfter != null) moodAfter - moodBefore else 0
}
