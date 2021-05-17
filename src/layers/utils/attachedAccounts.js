export const allAttachedAccounts = (state) => {
    let accounts = []
    if (state.instagram_basic.connected) {
        accounts.push({ name: "Instagram Basic", code: "IB" })
        // Constants.ATTACHED_ACCOUNTS.INSTAGRAM_BASIC_CODE
    }
    if (state.instagram_graph.connected) {
        accounts.push({ name: "Instagram Business", code: "IBS" })
        // Constants.ATTACHED_ACCOUNTS.INSTAGRAM_GRAPH_CODE
    }
    return accounts
}