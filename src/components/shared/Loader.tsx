import { colors } from '@styles/colorPalette'
import { SyncLoader } from 'react-spinners'
interface LoaderProps {
  size?: number
}

const Loader = ({ size = 11 }: LoaderProps) => {
  return <SyncLoader color={colors.borderGray} size={size} />
}

export default Loader
