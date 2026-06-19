import { useState, useMemo } from "react";
import { Category, Detail, ProfileId, Device, PhoneSpecs, LaptopSpecs } from "../_data/types";
import { PHONES } from "../_data/phones";
import { LAPTOPS } from "../_data/laptops";
import { buildPhoneRows, buildLaptopRows } from "../_data/spec-builders";

export function useCompare() {
  const [category, setCategory] = useState<Category>("phone");
  const [detail, setDetail] = useState<Detail>("mid");
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pickerA, setPickerA] = useState(false);
  const [pickerB, setPickerB] = useState(false);

  const [aPhone, setAPhone] = useState(PHONES[0]);
  const [bPhone, setBPhone] = useState(PHONES[1]);
  const [aLaptop, setALaptop] = useState(LAPTOPS[0]);
  const [bLaptop, setBLaptop] = useState(LAPTOPS[1]);

  const devices = category === "phone" ? PHONES : LAPTOPS;
  const a: Device = category === "phone" ? aPhone : aLaptop;
  const b: Device = category === "phone" ? bPhone : bLaptop;

  const setA = (d: Device) => {
    if (category === "phone") {
      setAPhone(d as Device<PhoneSpecs>);
    } else {
      setALaptop(d as Device<LaptopSpecs>);
    }
  };

  const setB = (d: Device) => {
    if (category === "phone") {
      setBPhone(d as Device<PhoneSpecs>);
    } else {
      setBLaptop(d as Device<LaptopSpecs>);
    }
  };

  const sections = useMemo(() => {
    return category === "phone"
      ? buildPhoneRows(a as Device<PhoneSpecs>, b as Device<PhoneSpecs>)
      : buildLaptopRows(a as Device<LaptopSpecs>, b as Device<LaptopSpecs>);
  }, [a, b, category]);

  return {
    category,
    setCategory,
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
    devices,
    a,
    b,
    setA,
    setB,
    sections,
  };
}
