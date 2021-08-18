export interface PartyGroupSchema {
    id: string
    name: string
    external: boolean
    bank?: string
    branch?: string
    accounts: PartyGroupAccountSchema[]
}

export interface PartyGroupAccountSchema {
    id: string
    name: string
    external: boolean
    bank?: string
    branch?: string
    createdAt?: string | null
    updatedAt?: string | null
    last_active?: string
    customer_id: string
    party_group_id: string
    entity_type: string
    account_number: string
    logical_entity_id?: string | null
}