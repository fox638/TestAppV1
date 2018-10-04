import {apiUri, client_id} from '../config'
import {Map, OrderedMap} from 'immutable'
import { default as withQuery } from 'with-query'

export async function getPhoto({page = 1, per_page = 10, order_by = 'latest', ...rest}) {
    const response = await fetch(withQuery(`${apiUri}/photos`, {
        page,
        per_page,
        order_by,
        client_id,
        ...rest
    }), {
        method:'GET'
    })
    return await response.json()
}

export function DataToEntities(data, RecordModel = Map ) {
    return data.reduce((acc, {id, description, urls:{small, regular}, user:{name}})=> {
        return acc.set(id, RecordModel({
            id,
            title:description,
            smallImageLink:small,
            fullImageLink:regular,
            userName:name
        }))
    }, new OrderedMap({}))
}