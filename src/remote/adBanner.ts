import { COLLECTIONS } from '@constants/index'
import { AdBanners } from '@models/banner'
import { collection, getDocs } from 'firebase/firestore'
import { store } from './firebase'

export const getAdBanners = async () => {
  const adBannerSnapshot = await getDocs(
    collection(store, COLLECTIONS.ADBANNER),
  )
  return adBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as AdBanners),
  }))
}
