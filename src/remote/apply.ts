import { COLLECTIONS } from '@constants/index'
import { ApplyValues } from '@models/apply'
import {
  addDoc,
  collection,
  where,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore'
import { store } from './firebase'

export const applyCard = async (applyValues: ApplyValues) => {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues)
}

export const updateApplyCard = async ({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string
  userId: string
  applyValues: Partial<ApplyValues>
}) => {
  const snapshot = getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  )
  const [applied] = (await snapshot).docs

  updateDoc(applied.ref, applyValues)
}
