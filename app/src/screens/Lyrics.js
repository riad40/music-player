import lyricsApi from "../helpers/lyricsApi";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";

const Lyrics = ({ route }) => {

    const [lyrics, setLyrics] = useState();
    const [loading, setLoading] = useState(true);

    const { songInfo } = route.params;

    useEffect(() => {
        const getLyrics = async () => {
            const lyrics = await lyricsApi(songInfo.artist, songInfo.song);
            setLyrics(lyrics);
            setLoading(false);
        };
        getLyrics();
    }, [songInfo]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.heading}>{songInfo.artist } - { songInfo.song }</Text>
                <Text style={styles.text}>{ lyrics }</Text>
            </ScrollView>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#343a40",
        padding: 20
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center"
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "lightblue",
        textAlign: "center",
    }
});

export default Lyrics;
