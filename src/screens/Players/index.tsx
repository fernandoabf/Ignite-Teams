import { useState } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('');
    const [players, setPlayers] = useState(['Fernando', 'Rorigo']);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    return (
        <Container>
            <Header showBackButton />
            <Highlight title={group} subtitle="adicione a galera e separe os times" />
            <Form>
                <Input placeholder="Nome do participante" autoCorrect={false} />
                <ButtonIcon icon="add" />
            </Form>
            <HeaderList>
                <FlatList
                    data={['Time 1', 'Time 2']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    0
                </NumbersOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => { }}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessoas nesse time"
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
            />

            <Button
                title="Remover Turma"
                type="SECONDARY"
            />
        </Container>
    )
}