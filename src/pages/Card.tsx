import Alert from '@components/shared/Alert'
import FixedBottomButton from '@components/shared/FixedBottomButton'
import Flex from '@components/shared/Flex'
import ListRow from '@components/shared/ListRow'
import Text from '@components/shared/Text'
import Top from '@components/shared/Top'
import { useAlertContext } from '@contexts/AlertContext'
import { css } from '@emotion/react'
import useUser from '@hooks/auth/useUser'
import { getCard } from '@remote/card'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const CardPage = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const user = useUser()
  const { open } = useAlertContext()
  const moveToApply = useCallback(() => {
    if (!user) {
      open({
        title: '알림',
        desc: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          console.log(pathname)
          navigate('/login', { state: pathname })
        },
      })
    }

    return navigate(`/apply/:${id}`)
  }, [navigate, user, id, open, pathname])

  //card와 id를 같이 묶어서 캐시 키를 만듦
  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })
  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHTMLTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((item, idx) => {
          return (
            <motion.li
              key={idx}
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              // whileInView={{
              //   opacity: 1,
              //   translateX: 0,
              // }}
              transition={{
                duration: 1.0,
                ease: [0.1, 0.2, 0.1, 0.2],
                delay: idx * 0.05,
              }}
              animate={{ opacity: 1, translateX: 0 }}
            >
              <ListRow
                as="div"
                key={item}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${idx + 1}`} subTitle={item} />
                }
              />
            </motion.li>
          )
        })}
      </ul>
      {promotion && (
        <Flex direction="column" css={TermsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t8">{removeHTMLTags(promotion.terms)}</Text>
        </Flex>
      )}
      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </div>
  )
}

export default CardPage
const TermsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`
const removeHTMLTags = (text: string) => {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }
  return output
}

const IconCheck = () => {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fillOpacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  )
}
