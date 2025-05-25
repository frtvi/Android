import { StyleSheet,Dimensions} from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
        backgroundColor: "#f8f8f8",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        color: "#333",
    },
    logoutButton: {
        position:'absolute',
        bottom:20,
        right:20
    },
})