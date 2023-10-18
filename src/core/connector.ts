import { use } from '@/factories/use.js'
import { MetaIDConnectWallet } from '../wallets/wallet.ts'
import { TxComposer, mvc } from 'meta-contract'
import { getMetaid } from '@/api.ts'

export class Connector {
  private _isConnected: boolean
  private wallet: MetaIDConnectWallet
  public metaid: string | undefined

  private constructor(wallet: MetaIDConnectWallet) {
    this._isConnected = true

    this.wallet = wallet
  }

  get address() {
    return this.wallet.address
  }

  get xpub() {
    return this.wallet.xpub
  }

  public static async create(wallet: MetaIDConnectWallet) {
    const connector = new Connector(wallet)

    // ask api for metaid
    connector.metaid =
      (await getMetaid({
        address: wallet.address,
      })) || undefined

    return connector
  }

  // metaid
  hasMetaid() {
    return !!this.metaid
  }

  use(entitySymbol: string) {
    return use(entitySymbol, { connector: this })
  }

  isConnected() {
    return this._isConnected
  }

  disconnect() {
    this._isConnected = false
  }

  /**
   * wallet delegation
   * signInput / send / broadcast
   */
  signInput({ txComposer, inputIndex }: { txComposer: TxComposer; inputIndex: number }) {
    return this.wallet.signInput({ txComposer, inputIndex })
  }

  send(toAddress: string, amount: number) {
    return this.wallet.send(toAddress, amount)
  }

  broadcast(txComposer: TxComposer) {
    return this.wallet.broadcast(txComposer)
  }
}
