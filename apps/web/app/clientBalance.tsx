import { useBalance } from "@repo/store/useBalance";


export default function Balance() {
  const balance = useBalance();

  return(
    <div>
      User Current Balance Amount {balance}
    </div>
  )

}