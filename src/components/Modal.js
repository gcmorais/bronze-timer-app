import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";

export const Modal = () => {
  const modalizeRef = useRef < Modalize > null;

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>...your content</Modalize>
    </>
  );
};
