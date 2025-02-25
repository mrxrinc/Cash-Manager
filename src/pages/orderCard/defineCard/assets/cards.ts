import { I18nManager } from "react-native";

import design_1_front from "images/card-design/design-1-front.png";
import design_1_back from "images/card-design/design-1-back.png";

import design_2_front from "images/card-design/design-2-front.png";
import design_2_back from "images/card-design/design-2-back.png";

import design_3_front from "images/card-design/design-3-front.png";
import design_3_back from "images/card-design/design-3-back.png";

import design_4_front from "images/card-design/design-4-front.png";
import design_4_back from "images/card-design/design-4-back.png";

import design_5_front from "images/card-design/design-5-front.png";
import design_5_back from "images/card-design/design-5-back.png";

const cards = [
  {
    id: "cacheonmanage_1",
    frontName: true,
    front: design_1_front,
    back: design_1_back,
  },
  {
    id: "cacheonmanage_2",
    frontName: true,
    front: design_2_front,
    back: design_2_back,
  },
  {
    id: "cacheonmanage_3",
    frontName: false,
    front: design_3_front,
    back: design_3_back,
  },
  {
    id: "cacheonmanage_4",
    frontName: false,
    front: design_4_front,
    back: design_4_back,
  },
  {
    id: "cacheonmanage_5",
    frontName: true,
    front: design_5_front,
    back: design_5_back,
  },
];

export default I18nManager.isRTL ? cards.reverse() : cards;
