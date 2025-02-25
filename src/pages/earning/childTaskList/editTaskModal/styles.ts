import { StyleSheet } from "react-native";
import { colors, IOS, iosBoxShadow } from "constants/index";

export default StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 3,
    ...iosBoxShadow,
    padding: 16,
    paddingBottom: 32,
  },
  modalContent: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    color: colors.title,
    fontSize: 16,
    lineHeight: IOS ? 12 : 18,
    marginTop: 10,
  },
  taskName: {
    fontSize: 14,
    fontFamily: colors.text,
    marginLeft: 5,
  },
  description: {
    color: colors.gray500,
    fontSize: 14,
    marginTop: 5,
  },
  repeatingOptionWrapper: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 60,
    marginTop: 24,
  },
  footer: {
    width: "100%",
    height: 44,
    borderTopWidth: 1,
    borderTopColor: colors.gray600,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    marginTop: 32,
  },
  button: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerMiddleBorder: {
    width: 1,
    backgroundColor: colors.gray600,
  },
  buttonTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: colors.gray950,
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
  earningText: {
    fontSize: 12,
    color: colors.gray550,
    marginLeft: 2,
  },
  earningBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  earningTextInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  TextInput: {
    backgroundColor: "#f4f6fa",
    height: 36,
    fontSize: 16,
    color: "black",
    width: 80,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: "IRANSansMobileFaNum",
    paddingBottom: 0,
  },
  unitText: {
    color: colors.title,
    fontSize: 12,
    marginLeft: 6,
  },
  activityText: {
    color: "#515c6f",
    fontSize: 14,
    marginLeft: 5,
  },
  activityButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  factorWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  factorText: {
    fontSize: 12,
    color: colors.title,
    lineHeight: 18,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
