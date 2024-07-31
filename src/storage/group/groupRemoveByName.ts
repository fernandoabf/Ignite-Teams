import AsyncStorage from "@react-native-async-storage/async-storage"
import { groupsGetAll } from "./groupsGetAll"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig"

export async function groupRemoveByName(groupDeleted: string) {
    try {
        const groups = await groupsGetAll()

        const filtered = groups.filter(group => group !== groupDeleted)
        const groupsString = JSON.stringify(filtered)

        await AsyncStorage.setItem(GROUP_COLLECTION, groupsString)
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}:${groupDeleted}`)
    } catch (error) {
        throw error
    }
}