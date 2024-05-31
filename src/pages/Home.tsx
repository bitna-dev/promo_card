import AdBanners from '@components/home/AdBanners'
import Top from '@components/shared/Top'
import { useEffect } from 'react'
import CardList from './CardList'

const Home = () => {
  useEffect(() => {
    //getCards().then((res) => console.log(res))
    //getAdBanners().then((res) => console.log(res))
  }, [])
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      />
      <AdBanners />
      <CardList />
    </div>
  )
}

export default Home
