import Button from '@components/shared/Button'
import { COLLECTIONS } from '@constants'
import { adBanners } from '@mock/data'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { toast } from 'react-toastify'

const BannerAddButton = () => {
  const handleGetBanners = async () => {
    try {
      const batch = writeBatch(store)
      adBanners.forEach((banner) => {
        const docRef = doc(collection(store, COLLECTIONS.ADBANNER))
        batch.set(docRef, banner)
      })
      await batch.commit()
      toast.success('데이터가 추가되었습니다.')
    } catch (error) {
      toast.error(`${error}`)
      console.log(error)
    }
  }
  return <Button onClick={handleGetBanners}>배너추가하기</Button>
}

export default BannerAddButton
