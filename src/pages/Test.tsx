import styled from '@emotion/styled'
import BannerAddButton from '@test/BannerAddButton'
import CardListAddButton from '@test/CardListAddButton'

const Test = () => {
  return (
    <TestContainer>
      <CardListAddButton />
      <BannerAddButton />
    </TestContainer>
  )
}

const TestContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
`

export default Test
