import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { isLoading } from "expo-font";
import { Loading } from "@components/Loading";

type RouteParams = {
    group: string;
}

export function Players() {
    const [isLoading, setIsLoading] = useState(true)
    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time 1');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {

        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova Pessoa', 'Digite o nome do participante');
        }
        const newPlayer = {
            name: newPlayerName,
            team
        }
        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            } else {
                console.log(error)
                Alert.alert('Nova Pessoa', 'Não foi possível adicionar a nova pessoa');
            }
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            Alert.alert('Remover Pessoa', 'Não foi possível remover o participante')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group)
            navigation.navigate('groups')

        } catch (error) {
            Alert.alert('Remover', 'Não foi possível remover o Grupo')
        }
    }

    async function handleGroupRemove() {
        Alert.alert('Remover',
            'Deseja realmente remover a turma?',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        groupRemove()
                    }
                }
            ]
        )
    }
    async function fetchPlayersByTeam() {
        setIsLoading(true);
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os participantes')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight title={group} subtitle="adicione a galera e separe os times" />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome do participante"
                    value={newPlayerName}
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
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
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={() => { handleRemovePlayer(item.name) }}
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
            }

            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={() => handleGroupRemove()}
            />
        </Container>
    )
}