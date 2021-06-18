export interface PromoServiceState {
    text: string,
    setText: (value: string) => {},
    isCopied: boolean,
    setIsCopied: (value: boolean) => {}
}