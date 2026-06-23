"use client";

import { useState, useMemo, useEffect } from "react";
import { Detail, Device } from "../_data/types";
import { buildDynamicRows } from "../_data/spec-builders";
import { ProfileId } from "@/components/mouse";
import { useCompareQuery } from "./use-compare-query";

export function useCompare() {
  const { data: dbDevices = [], isLoading, isError } = useCompareQuery();

  const [detail, setDetail] = useState<Detail>("mid");
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pickerA, setPickerA] = useState(false);
  const [pickerB, setPickerB] = useState(false);

  const [a, setA] = useState<Device | null>(null);
  const [b, setB] = useState<Device | null>(null);

  // Initialize a and b once products are loaded
  useEffect(() => {
    if (dbDevices.length > 0) {
      if (!a) {
        setA(dbDevices[0]);
      }
      if (!b && dbDevices.length > 1) {
        setB(dbDevices[1]);
      }
    }
  }, [dbDevices, a, b]);

  const sections = useMemo(() => {
    if (!a || !b) return [];
    return buildDynamicRows(a, b);
  }, [a, b]);

  return {
    isLoading,
    isError,
    detail,
    setDetail,
    profile,
    setProfile,
    profileOpen,
    setProfileOpen,
    pickerA,
    setPickerA,
    pickerB,
    setPickerB,
    devices: dbDevices,
    a,
    b,
    setA,
    setB,
    sections,
  };
}
