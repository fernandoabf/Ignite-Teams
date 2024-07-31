import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";


export function Groups() {
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<string[]>([])

    const navigation = useNavigation()

    function handleNewGroup() {
        navigation.navigate('newgroup')
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group })
    }

    async function fetchGroups() {
        setIsLoading(true)
        try {
            const groupData = await groupsGetAll()
            setGroups(groupData)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchGroups()
    }, []))

    return (
        <Container>
            <Header />
            <Highlight
                title="Turmas"
                subtitle="Jogue com sua turma"
            />

            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={groups}
                        keyExtractor={item => item}
                        contentContainerStyle={groups.length === 0 && { flex: 1 }}
                        renderItem={({ item }) =>
                        (<GroupCard
                            tittle={item}
                            onPress={() => handleOpenGroup(item)}
                        />
                        )}
                        ListEmptyComponent={() => (
                            <ListEmpty message="Adicione uma turma" />
                        )}
                        style={{ marginBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
            }
            <Button
                title="Criar Nova turma"
                onPress={handleNewGroup}
            />

        </Container>
    )
}