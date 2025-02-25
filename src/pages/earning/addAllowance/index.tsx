import React, { useState } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import Button from "components/button";
import Edit from "components/icons/editIcon.svg";
import Close from "components/icons/close.svg";
import Modal from "react-native-modal";
import AlertController from "components/alertController";
import { formatNumber } from "utils";
import { addcacheonthego } from "utils/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../customType";
import { getEarningData } from "redux/actions/Earning";
import UnequalTwinButtons from "components/unequalTwinButtons";
import SavingActions from "store/Saving/saving.actions";
import { withTheme } from "themeCore/themeProvider";
import styles from "./styles";

const Addcacheonthego = (props: any) => {
  const theme = props.theme;
  const { childInfo } = props;
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState("");
  const [cacheonthego, setcacheonthego] = useState("");
  const [paymentDay, setPaymentDay] = useState("0");
  const [deletecacheonthego, setDeletecacheonthego] = useState<boolean>(false);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleAddcacheonthego = ({ remove }: { remove: boolean }) => {
    const data = {
      paymentDay: paymentDay,
      childId: childInfo.id,
      cacheonthegoAmount: remove ? 0 : cacheonthego,
    };

    remove ? setDeleteLoading(true) : setLoading(true);
    addcacheonthego(token, data)
      .then(() => {
        remove ? setDeleteLoading(false) : setLoading(false);
        dispatch(getEarningData(Math.random()));
        toggleModal();
        setDeletecacheonthego(false);
        dispatch(SavingActions.setSavingsDataList([], { sagas: true }));
      })
      .catch(() => {
        remove ? setDeleteLoading(false) : setLoading(false);
        setDeletecacheonthego(false);
      });
  };
  let mainDisableBtn = childInfo.cacheonthegoAmount.toString() === cacheonthego;
  let secondaryDisableBtn = cacheonthego === "";
  return (
    <View style={styles.container}>
      {!childInfo.cacheonthegoAmount ? (
        <View style={styles.nocacheonthegoBox}>
          <FormattedText
            style={[styles.noAllowanseTitle, { color: theme.titleColor }]}
            id="earning.cacheonthego"
          />
          <FormattedText style={styles.noAllowanseDescription}>
            مقداری برای پول توجیبی فرزندتان تعیین نکرده‌اید.
          </FormattedText>
          <View style={styles.addcacheonthegoButton}>
            <Button
              color={colors.paleGrey}
              title="تعریف پول توجیبی"
              onPress={toggleModal}
              style={styles.btn}
              titleStyle={styles.btnText}
            />
          </View>
        </View>
      ) : (
        <View style={styles.yescacheonthegoBox}>
          <FormattedText style={styles.textTitle} id="earning.cacheonthego" />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setActive(childInfo.paymentDay);
              childInfo.cacheonthegoAmount &&
                setcacheonthego(childInfo.cacheonthegoAmount + "");
              toggleModal();
            }}
            style={styles.contentBox}
          >
            <FormattedText style={styles.textTitle} fontFamily="Regular-FaNum">
              {formatNumber(childInfo.cacheonthegoAmount)} ریال
            </FormattedText>
            {!isChild && (
              <Edit style={styles.editIcon} fill={theme.ButtonBlueColor} />
            )}
          </TouchableOpacity>
        </View>
      )}
      <Modal
        useNativeDriver
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        backdropOpacity={0.3}
        backdropTransitionOutTiming={10}
        backdropTransitionInTiming={500}
        style={styles.modal}
      >
        <View style={styles.addcacheonthegoModal}>
          <View style={styles.header}>
            <FormattedText
              style={[
                styles.title,
                {
                  color: theme.titleColor,
                },
              ]}
              fontFamily="Regular-FaNum"
            >
              پول توجیبی {childInfo.nickname}
            </FormattedText>
            <TouchableOpacity style={styles.close} onPress={toggleModal}>
              <Close style={styles.closeIcon} fill={colors.title} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              returnKeyType="done"
              placeholderTextColor="#c9cbcc"
              keyboardType="numeric"
              maxLength={11}
              underlineColorAndroid={"transparent"}
              onChangeText={(text) => {
                setcacheonthego(text.replace(/,/g, ""));
              }}
              value={formatNumber(cacheonthego) ?? ""}
            />
            <FormattedText style={styles.rial}>ریال</FormattedText>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <FormattedText
              style={[styles.description, { color: theme.titleColor }]}
            >
              پول توجیبی به همراه درآمد فرزند شما هر هفته جمعه راس ساعت ۱۲ شب
              واریز خواهد شد.
            </FormattedText>
          </View>
          <UnequalTwinButtons
            style={styles.unequalButtonsWrapper}
            mainText="ذخیره"
            mainColor={theme.ButtonGreenColor}
            mainOnPress={handleAddcacheonthego}
            secondaryText="حذف"
            secondaryColor={theme.ButtonRedColor}
            secondaryOnPress={() => setDeletecacheonthego(true)}
            mainLoading={loading}
            secondaryLoading={deleteLoading}
            mainDisable={mainDisableBtn}
            secondaryDisable={secondaryDisableBtn}
          />
          <AlertController
            showModal={deletecacheonthego}
            setShowModal={() => setDeletecacheonthego(false)}
            title="حذف پول توجیبی"
            description="با انجام این عمل دیگر پول توجیبی بصورت اتوماتیک از حساب شما کسر نمی‌شود.آیا از حذف پول توجیبی اطمینان دارید؟"
            rightTitle="انصراف"
            rightAction={() => setDeletecacheonthego(false)}
            leftTitle="حذف"
            leftColor={colors.red}
            leftAction={() => {
              setcacheonthego("0");
              handleAddcacheonthego({ remove: true });
            }}
            centerText
          />
        </View>
      </Modal>
    </View>
  );
};
export default withTheme(Addcacheonthego);
