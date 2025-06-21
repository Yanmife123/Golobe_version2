import { UseFormRegisterReturn } from "react-hook-form";

export interface SwiperType {
  id: number;
  src: string;
}

export interface InputType {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  classNameInput?: string;
  classNameLabel?: string;
  register?: UseFormRegisterReturn;
}
