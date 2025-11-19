import HeaderComp from "../components/mainformComponents/header"
import WalletConnector from "../components/mainformComponents/walletconnector"
function CreateToken() {
  return (
    <div className="w-screen h-screen ">
      <HeaderComp />
      < WalletConnector />
    </div>
  )
}

export default CreateToken
