import {StyleSheet} from 'react-native'
import {correctFontSizeForScreen} from '../../../utils/scale';

export default StyleSheet.create({
    actionsWrapper: {
        flex: 0.281,
        flexDirection: "row"
    },
    action: {
        flex: 0.202,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    actionTouchable: {
        backgroundColor: "#f3f6f8",
        justifyContent: 'center',
        borderRadius: 128,
        alignItems: 'center'
    },
    actionDarkTouchable: {
        backgroundColor: "#59696f"
    },
    actionGreenTouchable: {
        backgroundColor: "#4cd964"
    },
    actionText: {
        fontSize: correctFontSizeForScreen(9),
        color: "#000",
        fontWeight: '200',
        textAlign: "center",
        paddingTop: 5
    },
    actionDarkText: {
        color:"#FFF"
    }
});

