import Flex from '@components/shared/Flex'
import Text from '@components/shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { getAdBanners } from '@remote/adBanner'
import { colors } from '@styles/colorPalette'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper'
import 'swiper/css/autoplay'

const AdBanners = () => {
  const { data } = useQuery(['adBanners'], () => getAdBanners())
  return (
    <Container>
      <Swiper spaceBetween={50} modules={[Autoplay]} autoplay={{ delay: 2500 }}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner?.id}>
              <Link to="/">
                <Flex direction="column" css={BannerContainerStyles}>
                  <Text bold>{banner?.title}</Text>
                  <Text typography="t7">{banner?.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`
const BannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
export default AdBanners
