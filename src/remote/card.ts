import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

//pageParam 마지막요소
//카드 전체 가져오기
export const getCards = async (pageParam?: QuerySnapshot<Card>) => {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  // 스냅샷의 마지막 요소
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  //그리고 스냅샷
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
  return { lastVisible, items }
}

//한개의 카드 가져오기
export const getCard = async (id: string) => {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))
  return {
    id,
    ...(snapshot.data() as Card),
  }
}
