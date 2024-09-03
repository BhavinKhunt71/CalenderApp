import React from "react";
import Index from "./index";
import { StatusBar } from "expo-status-bar";
export default function TabLayout() {
  return (
    <>
      <StatusBar backgroundColor={"#fff"} />
      <Index />
    </>
  );
}
