import React, { FC, useState } from "react";
import { removeCommas, formatNumber } from "utils";
// Hooks
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
// Actions
import SavingActions from "store/Saving/saving.actions";
// UI Frameworks
import { Formik } from "formik";
import { View } from "react-native";
import moment from "moment-jalaali";
import { ScrollView } from "react-native-gesture-handler";
// Common Components
import Input from "components/input";
import Layout from "components/layout";
import Header from "components/header";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import MaterialTextField from "components/materialTextfield";
import DatePicker from "components/datePicker";
// Constants
import { colors } from "constants/index";
// Types
import { RootState } from "../../../../../customType";
import { AddTarget, SelectedTargetData } from "types/saving";
import { SavingState } from "store/Saving/saving.reducer";
import { StateNetwork } from "store/index.reducer";
// Styles
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

export interface Errors {
  title?: string;
  targetAmount?: string;
  weeklySavings?: string;
  targetDate?: string;
}

interface Props {
  navigation: any;
  theme: any;
}

const AddNewTarget: FC<Props> = (props) => {
  const { theme } = props;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<string>("");
  const [weeklyAmount, setWeeklyAmount] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [firstSubmitted, setFirstSubmitted] = React.useState(false);
  const [changedBy, setChangedBy] = React.useState<string>();

  // Store
  const selectedTargetData = useSelector<StateNetwork, SelectedTargetData>(
    (state) => state.saving.selectedTargetData
  );
  const savingStore = useSelector<StateNetwork, SavingState>(
    (state) => state.saving
  );
  const isChild = useSelector<RootState, boolean>(
    (state) => state.user.ischild
  );

  React.useEffect(() => {
    const $targetAmount = Number(targetAmount);
    const $weeklyAmount = Number(weeklyAmount);
    if ($targetAmount >= 1 && $weeklyAmount >= 1 && changedBy !== "field") {
      const week = ($targetAmount / $weeklyAmount) * 7;
      let targetDate = moment().add(week, "days").format("jYYYY/jMM/jDD");

      if (targetDate === "Invalid date") {
        setTargetDate("غیر قابل محاسبه");
      } else {
        setTargetDate(targetDate);
      }

      if (moment(targetDate).isValid()) {
        setChangedBy("system");
      }
    }
  }, [targetAmount, weeklyAmount]);
  React.useEffect(() => {
    formik.resetForm();
  }, []);

  React.useEffect(() => {
    if (!moment(targetDate).isValid()) return;

    const $targetAmount = Number(targetAmount);
    // این شرط زمانی اجراء میشود که مبلغ هدف پر شده است و همچنین کاربر تاریخ هدف را نیز انتخاب است
    // حال میبایست ما مبلغ پس اندازه هفتگی را محاسبه کنیم
    if ($targetAmount && changedBy === "targetDate") {
      const currentDate = moment();
      const $targetDate = moment(targetDate, "jYYYY/jMM/jDD");
      let diff = $targetDate.diff(currentDate, "days");
      diff = diff < 0 ? diff * -1 : diff;
      // محاسبه تعداد هفته ها باتوجه به نسبت تغییر تاریخ فعلی با تاریخ رسیدن به هدف
      const weeks = Math.round(diff / 7);
      const calculateWeeklySavingAmount = Math.round(
        $targetAmount > weeks ? $targetAmount / weeks : weeks / $targetAmount
      );
      if (
        calculateWeeklySavingAmount &&
        !isNaN(calculateWeeklySavingAmount) &&
        calculateWeeklySavingAmount !== Infinity
      ) {
        setChangedBy("field");
        setWeeklyAmount(`${calculateWeeklySavingAmount}`);
        formik.setFieldValue("weeklySavings", calculateWeeklySavingAmount);
      }
    }
  }, [targetDate]);

  const formik = useFormik({
    initialValues: {
      title: "",
      targetAmount: "",
      weeklySavings: "",
      targetDate: "",
    },
    validateOnChange: firstSubmitted,
    validateOnBlur: false,
    validate: (values: AddTarget) => {
      const errors: Errors = {};
      setFirstSubmitted(true);
      if (!values.title) {
        errors.title = "لطفا عنوان هدف را وارد نمایید";
      }
      if (!values.targetAmount) {
        errors.targetAmount = "لطفا مبلغ هدف را وارد نمایید";
      }

      if (!values.weeklySavings) {
        errors.weeklySavings = "لطفا مبلغ پس انداز هفتگی را وارد نمایید";
      }

      if (values.targetAmount) {
        if (
          Number(removeCommas(values.targetAmount)) <
          Number(removeCommas(values.weeklySavings))
        ) {
          errors.targetAmount =
            "مبلغ هدف نمی تواند کمتر از مبلغ پس انداز هفتگی باشد";
        } else if (
          Number(removeCommas(selectedTargetData.cacheonthego)) <
          Number(removeCommas(values.weeklySavings))
        ) {
          errors.weeklySavings =
            "مبلغ پس انداز هفتگی نمی‌تواند بیشتر از مبلغ پول توجیبی باشد.";
        }
      }

      if (values.weeklySavings) {
        if (Number(values.weeklySavings) > Number(values.targetAmount)) {
          errors.weeklySavings =
            "مبلغ پس انداز نمی تواند بیشتر از مبلغ هدف باشد";
        } else if (
          Number(selectedTargetData.cacheonthego) <
          Number(removeCommas(values.weeklySavings))
        ) {
          errors.weeklySavings =
            "مبلغ پس انداز هفتگی نمی‌تواند بیشتر از مبلغ پول توجیبی باشد.";
        }
      }
      if (targetDate === "غیر قابل محاسبه") {
        errors.targetDate = "لطفا تاریخ صحیح را وارد نمایید";
      }

      return errors;
    },
    onSubmit: (values: AddTarget) => {
      const data = {
        childId: selectedTargetData.childId,
        title: values.title,
        targetAmount: removeCommas(values.targetAmount),
        targetDate: targetDate,
        weeklySavings: removeCommas(values.weeklySavings),
      };
      dispatch(SavingActions.addTarget(data as AddTarget, { sagas: true }));
      formik.resetForm();
      navigation.navigate("savingTab");
    },
  });

  function handleChangeTargetDate(value: string) {
    if (moment(value).isValid()) {
      setChangedBy("targetDate");
      setTargetDate(value);
      formik.setFieldValue("targetDate", value);
    }
  }

  function handleWeeklyAmountChange(value: string) {
    const amount = value.includes(",")
      ? Number(removeCommas(value))
      : Number(value);
    if (amount <= Number(targetAmount)) {
      setChangedBy("weeklyAmount");
      addCommasToField("weeklySavings", value);
      setWeeklyAmount(`${removeCommas(value)}`);
    }
  }

  function handleTargetAmountChange(value: string) {
    addCommasToField("targetAmount", value);
    setTargetAmount(`${removeCommas(value)}`);
    setChangedBy("system");
  }

  function addCommasToField(field: keyof typeof formik.values, value: string) {
    if (Number(removeCommas(value))) {
      if (value.length > 3) {
        formik.setFieldValue(field, formatNumber(`${removeCommas(value)}`));
      } else {
        formik.setFieldValue(field, value);
      }
    } else {
      formik.setFieldValue(field, "");
    }
  }

  return (
    <Layout>
      <Header
        staticTitle={"addNewTarget"}
        handleBack={() => props.navigation.goBack()}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.container]}
      >
        <FormattedText style={styles.targetDesc}>
          تعریف هدف پس انداز برای{" "}
          {isChild ? "شما" : selectedTargetData.childName}
        </FormattedText>
        <Formik
          initialValues={formik.initialValues}
          onSubmit={(values: any) => formik.handleSubmit(values)}
        >
          <>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.titleInputWrapper}>
                <MaterialTextField
                  label="عنوان هدف"
                  keyboardType="default"
                  value={formik.values.title}
                  onChangeText={(value: string) =>
                    formik.setFieldValue("title", value)
                  }
                  error={formik.errors.title}
                  maxLength={32}
                />
              </View>
              <View style={styles.inputWrapper}>
                <FormattedText style={[styles.halfWidth, styles.gray]}>
                  مبلغ هدف
                </FormattedText>
                <View style={[styles.halfWidth]}>
                  <Input
                    value={formik.values.targetAmount}
                    onChangeText={(value: string) =>
                      handleTargetAmountChange(value)
                    }
                    keyboardType={"number-pad"}
                    maxLength={11}
                    boxMode
                    customStyle={styles.input}
                    containerCustomStyle={styles.inputContainer}
                    inputCustomStyle={styles.inputInner}
                  />
                </View>
                <FormattedText style={[styles.unit]}>ریال</FormattedText>
              </View>

              {formik.errors.targetAmount && (
                <FormattedText style={styles.error}>
                  {formik.errors.targetAmount}
                </FormattedText>
              )}
              <View style={styles.inputWrapper}>
                <FormattedText style={[styles.halfWidth, styles.gray]}>
                  مبلغ پس انداز هفتگی
                </FormattedText>
                <View style={[styles.halfWidth]}>
                  <Input
                    editable={!!formik.values.targetAmount}
                    value={formatNumber(String(formik.values.weeklySavings))}
                    onChangeText={(value: string) =>
                      handleWeeklyAmountChange(value)
                    }
                    keyboardType={"number-pad"}
                    boxMode
                    maxLength={11}
                    customStyle={styles.input}
                    containerCustomStyle={styles.inputContainer}
                    inputCustomStyle={styles.inputInner}
                  />
                </View>
                <FormattedText style={[styles.unit]}>ریال</FormattedText>
              </View>
              {formik.errors.weeklySavings && (
                <FormattedText style={styles.error}>
                  {formik.errors.weeklySavings}
                </FormattedText>
              )}

              <View style={styles.dateWrapper}>
                <FormattedText style={[styles.halfWidth, styles.gray]}>
                  تاریخ رسیدن به هدف
                </FormattedText>
                <View style={styles.targetDateBox}>
                  <DatePicker
                    noIcon
                    light
                    defaultValue={targetDate}
                    active={formik.values.targetAmount}
                    handleChosenDate={(val: string) => {
                      handleChangeTargetDate(val);
                      setShowDateModal(false);
                    }}
                  />
                </View>
                <FormattedText style={styles.unit} />
              </View>
            </ScrollView>

            <View style={{ marginTop: 20 }}>
              <Button
                onPress={formik.handleSubmit}
                disabled={!formik.isValid || savingStore.loading}
                title="تعریف هدف جدید"
                color={theme.ButtonGreenColor}
                loading={savingStore.loading}
              />
            </View>
          </>
        </Formik>
      </ScrollView>
    </Layout>
  );
};

export default withTheme(AddNewTarget);
