import {api} from "../../../api/http.ts";

export const getListCity = async (name: string) => {
    const response = await api.get(`geo/1.0/direct?q=${name}&limit=5&appid=2cfb5f4561a3850e93966d88a2420458`)

    return response.data
}
