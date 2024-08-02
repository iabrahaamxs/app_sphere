import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export const UserIcon = (props) => (
  <FontAwesome name="user-o" size={20} color="black" {...props} />
);

export const MailIcon = (props) => (
  <Feather name="mail" size={24} color="black" {...props} />
);

export const LockIcon = (props) => (
  <Feather name="lock" size={24} color="black" {...props} />
);

export const Eye_Off = (props) => (
  <Feather name="eye-off" size={24} color="black" />
);

export const Eye = (props) => <Feather name="eye" size={24} color="black" />;
