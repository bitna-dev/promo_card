import Badge from '@components/shared/Badge'
import Flex from '@components/shared/Flex'
import ListRow from '@components/shared/ListRow'
import Loader from '@components/shared/Loader'
import { getCards } from '@remote/card'
import { flatten } from 'lodash'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

const CardList = () => {
  const navigate = useNavigate()

  // const { data } = useQuery(['card'], () => getCards())
  const {
    data,
    isFetching,
    hasNextPage = false,
    fetchNextPage,
  } = useInfiniteQuery(
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
  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  console.log(data)
  if (data == null) {
    return null
  }

  return (
    <div>
      <InfiniteScroll
        scrollThreshold={0.95}
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={
          <Flex justify="center">
            <Loader />
          </Flex>
        }
        next={loadMore}
      >
        <ul>
          {cards.map((card, idx) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${idx + 1}위`} subTitle={card.name} />
              }
              right={
                <div>
                  {card.payback != null ? <Badge label={card.payback} /> : null}
                </div>
              }
              withArrow
              onClick={() => navigate(`card/${card.id}`)}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default CardList
