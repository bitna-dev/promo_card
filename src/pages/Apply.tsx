import Apply from '@components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import Flex from '@components/shared/Flex'
import Loader from '@components/shared/Loader'
import useUser from '@hooks/auth/useUser'
import { APPLY_STATUS } from '@models/apply'
import { updateApplyCard } from '@remote/apply'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ApplyPage = () => {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const [readyToPoll, setReadyToPoll] = useState(false)
  usePollApplyStatus({
    onSuccess: async () => {
      console.log('성공')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      console.log('실패')
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })
  const { mutate, isLoading: applyingCard } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드추가')

      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (readyToPoll || applyingCard) {
    return (
      <Flex align="center" justify="center">
        <Loader full />
      </Flex>
    )
  }

  return (
    <>
      <Apply onSubmit={mutate} />
    </>
  )
}

export default ApplyPage
