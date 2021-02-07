import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "constants/index";
import FanButton from "../fanButton";
import { FormattedText } from "components/format-text";

const FooterLogin = (props: any) => {
  const { childPhoneNum, navigation, isChild, bljTheme, theme } = props;
  return (
    <View style={styles.noRegister}>
      {isChild && !!childPhoneNum && (
        <FanButton bljTheme={bljTheme} theme={theme} navigation={navigation} />
      )}
      {!isChild && !bljTheme && (
        <FormattedText style={styles.registerText}>
          قبلا ثبت‌نام نکرده‌اید؟
        </FormattedText>
      )}
    </View>
  );
};
export default FooterLogin;

const styles = StyleSheet.create({
  noRegister: {
    alignSelf: "center",
    marginVertical: 10,
  },
  registerText: { alignSelf: "center", fontSize: 16, color: colors.links },
});
