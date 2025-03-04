import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
const db = admin.firestore();

/**
 * ✅ 1. Функция для назначения администратора
 */
export const setAdminRole = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Требуется аутентификация.'
		);
	}

	// Проверяем, является ли вызывающий пользователь админом
	const userRef = db.collection('users').doc(context.auth.uid);
	const userDoc = await userRef.get();

	if (!userDoc.exists || !userDoc.data()?.isAdmin) {
		throw new functions.https.HttpsError(
			'permission-denied',
			'Только администратор может назначать админов.'
		);
	}

	const { uid } = data;
	if (!uid) {
		throw new functions.https.HttpsError('invalid-argument', 'UID обязателен.');
	}

	try {
		// Устанавливаем кастомные клеймы (admin: true)
		await admin.auth().setCustomUserClaims(uid, { admin: true });

		// Обновляем Firestore
		await db
			.collection('users')
			.doc(uid)
			.set({ isAdmin: true }, { merge: true });

		return { message: `✅ Пользователь ${uid} теперь администратор` };
	} catch (error) {
		console.error('❌ Ошибка при назначении роли:', error);
		throw new functions.https.HttpsError(
			'internal',
			'Ошибка назначения роли администратора.'
		);
	}
});

/**
 * ✅ 2. Функция для проверки роли пользователя
 */
export const checkAdminRole = functions.https.onCall(async (_, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			'unauthenticated',
			'Требуется аутентификация.'
		);
	}

	const userRef = db.collection('users').doc(context.auth.uid);
	const userDoc = await userRef.get();

	return { isAdmin: userDoc.exists ? userDoc.data()?.isAdmin : false };
});
