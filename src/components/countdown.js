import React, { useState, useEffect } from "react";
import CountDown from "react-native-countdown-component";

function countdown({ valor }) {
  const [handleState, setHandleState] = useState(false);

  return (
    <CountDown
      size={20}
      until={60 * valor}
      onFinish={() => alert("Finished")}
      digitStyle={{
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#1CC625",
      }}
      digitTxtStyle={{ color: "#1CC625" }}
      timeLabelStyle={{ color: "red", fontWeight: "bold" }}
      separatorStyle={{ color: "#1CC625" }}
      timeToShow={["M", "S"]}
      timeLabels={{ m: null, s: null }}
      showSeparator
      onPress={() => setHandleState(!handleState)}
      running={handleState}
    />
  );
}

export default countdown;
