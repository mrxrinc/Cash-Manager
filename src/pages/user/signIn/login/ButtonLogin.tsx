import React from "react";
import { StyleSheet } from "react-native";
import Button from "components/button";
import { width } from "constants/index";

const ButtonLogin = (props: any) => {
  const {
    username,
    password,
    onPress,
    loading,
    isFace,
    isFinger,
    theme,
  } = props;

  return (
    <Button
      isFaceId={username || password ? false : isFace}
      isFinger={username || password ? false : isFinger}
      title={
        username || password
          ? "ورود"
          : isFace
          ? `ورود با تشخیص چهره`
          : isFinger
          ? "ورود با اثر انگشت"
          : "ورود"
      }
      color={theme.addChild.mainButton}
      onPress={onPress}
      disabled={loading}
      loading={loading}
      style={styles.button}
    />
  );
};
export default ButtonLogin;

const styles = StyleSheet.create({
  button: { width: width * 0.89, height: 44 },
});
