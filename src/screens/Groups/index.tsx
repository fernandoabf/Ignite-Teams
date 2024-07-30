import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";


export function Groups() {
    const [groups, setGroups] = useState<string[]>(['Turma 1', 'Turma 2', 'Turma 3', 'Turma 4', 'Turma 5', 'Turma 6', 'Turma 7', 'Turma 8', 'Turma 9', 'Turma 10', 'Turma 11', 'Turma 12', 'Turma 13', 'Turma 14', 'Turma 15', 'Turma 16', 'Turma 17', 'Turma 18', 'Turma 19', 'Turma 20', 'Turma 21', 'Turma 22', 'Turma 23', 'Turma 24', 'Turma 25', 'Turma 26', 'Turma 27', 'Turma 28', 'Turma 29', 'Turma 30', 'Turma 31', 'Turma 32', 'Turma 33', 'Turma 34', 'Turma 35', 'Turma 36', 'Turma 37', 'Turma 38', 'Turma 39', 'Turma 40', 'Turma 41', 'Turma 42', 'Turma 43', 'Turma 44', 'Turma 45', 'Turma 46', 'Turma 47', 'Turma 48', 'Turma 49', 'Turma 50', 'Turma 51', 'Turma 52', 'Turma 53', 'Turma 54', 'Turma 55', 'Turma 56', 'Turma 57', 'Turma 58', 'Turma 59', 'Turma 60', 'Turma 61', 'Turma 62', 'Turma 63', 'Turma 64', 'Turma 65', 'Turma 66', 'Turma 67', 'Turma 68', 'Turma 69', 'Turma 70', 'Turma 71', 'Turma 72', 'Turma 73', 'Turma 74', 'Turma 75', 'Turma 76', 'Turma 77', 'Turma 78', 'Turma 79', 'Turma 80', 'Turma 81', 'Turma 82', 'Turma 83', 'Tur'])

    const navigation = useNavigation()

    function handleNewGroup() {
        navigation.navigate('newgroup')
    }

    return (
        <Container>
            <Header />
            <Highlight
                title="Turmas"
                subtitle="Jogue com sua turma"
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                contentContainerStyle={groups.length === 0 && { flex: 1 }}
                renderItem={({ item }) =>
                (<GroupCard
                    tittle={item}
                />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Adicione uma turma" />
                )}
                style={{ marginBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
            <Button
                title="Criar Nova turma"
                onPress={handleNewGroup}
            />

        </Container>
    )
}