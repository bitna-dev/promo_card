import Button from '@components/shared/Button'
import ListRow from '@components/shared/ListRow'
import { getCards } from '@remote/card'
import { flatten } from 'lodash'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const CardList = () => {
  const navigate = useNavigate()
  // const { data } = useQuery(['card'], () => getCards())
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['card'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      // 함수지원
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )
  const cards = flatten(data?.pages.map(({ items }) => items))

  console.log(data)
  if (data == null) {
    return null
  }

  return (
    <div>
      <ul>
        <Button
          onClick={() => {
            fetchNextPage()
          }}
        >
          데이터 불러오기
        </Button>
        {cards.map((card, idx) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${idx + 1}위`} subTitle={card.name} />
            }
            right={
              <div>
                {card.payback != null ? <div>{card.payback}</div> : null}
              </div>
            }
            withArrow
            onClick={() => navigate(`cards/${card.id}`)}
          />
        ))}
      </ul>
    </div>
  )
}

export default CardList
