import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

export default function AntPhone({ value, onChange }) {
  return <PhoneInput defaultCountry="pk" value={value} onChange={onChange} />;
}
