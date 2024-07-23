import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { SafeAreaView } from "react-native";

export function Groups() {
    return (
        <Container>
            <SafeAreaView style={{ flex: 1 }}>
                <Header showBackButton />
                <Highlight
                    title="Turmas"
                    subtitle="Jogue com sua turma"
                />
                <GroupCard tittle="Turma 1" />
            </SafeAreaView>
        </Container>
    )
}