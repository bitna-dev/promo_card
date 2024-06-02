import Button from '@components/shared/Button'
import { COLLECTIONS } from '@constants/index'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { card_list } from '@mock/data'
import { toast } from 'react-toastify'

const CardListAddButton = () => {
  const handleGetCards = async () => {
    try {
      const batch = writeBatch(store)
      card_list.forEach((card) => {
        // loop가 돌면서 CARD라는 컬렉션에 card값을 하나씩 넣기
        const docRef = doc(collection(store, COLLECTIONS.CARD))
        batch.set(docRef, card)
      })
      await batch.commit()
      toast.success('데이터가 추가되었습니다.')
    } catch (error) {
      toast.error(`${error}`)
      console.log(error)
    }
  }

  return <Button onClick={handleGetCards}>카드리스트추가하기</Button>
}

export default CardListAddButton
